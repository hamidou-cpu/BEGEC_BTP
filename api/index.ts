import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Restore original URL when rewritten by Vercel
app.use((req, _res, next) => {
  const matchedPath = (req.headers["x-matched-path"] || req.headers["x-vercel-matched-path"]) as string | undefined;
  if (matchedPath && (matchedPath.startsWith("/api") || matchedPath.startsWith("/uploads"))) {
    req.url = matchedPath;
  }
  next();
});

// Health check endpoint for verifying deployment status
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: process.env.DATABASE_URL ? "configured" : "missing",
    timestamp: new Date().toISOString(),
  });
});

let isInitialized = false;
let initPromise: Promise<void> | null = null;

async function setup() {
  if (!isInitialized) {
    if (!initPromise) {
      initPromise = (async () => {
        await registerRoutes(httpServer, app);

        app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
          const status = err.status || err.statusCode || 500;
          const message = err.message || "Internal Server Error";
          console.error(`[API Error] ${req.method} ${req.url}:`, err);
          if (res.headersSent) {
            return;
          }
          res.status(status).json({ message });
        });

        isInitialized = true;
      })();
    }
    await initPromise;
  }
}

export default async function handler(req: Request, res: Response) {
  await setup();
  return new Promise<void>((resolve, reject) => {
    res.on("finish", () => resolve());
    res.on("close", () => resolve());
    res.on("error", (err) => reject(err));
    app(req, res);
  });
}
