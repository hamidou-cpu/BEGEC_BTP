import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let isInitialized = false;
let initPromise: Promise<void> | null = null;

async function setup() {
  if (!isInitialized) {
    if (!initPromise) {
      initPromise = (async () => {
        await registerRoutes(httpServer, app);

        app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
          const status = err.status || err.statusCode || 500;
          const message = err.message || "Internal Server Error";
          console.error("Internal Server Error:", err);
          if (res.headersSent) {
            return next(err);
          }
          return res.status(status).json({ message });
        });

        isInitialized = true;
      })();
    }
    await initPromise;
  }
}

export default async function handler(req: Request, res: Response) {
  await setup();
  return app(req, res);
}
