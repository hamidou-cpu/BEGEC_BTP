var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/api.ts
import express from "express";

// server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  contactMessages: () => contactMessages,
  insertContactSchema: () => insertContactSchema,
  insertPartnerSchema: () => insertPartnerSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertQuoteSchema: () => insertQuoteSchema,
  insertTeamMemberSchema: () => insertTeamMemberSchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  partners: () => partners,
  projects: () => projects,
  quoteRequests: () => quoteRequests,
  siteSettings: () => siteSettings,
  teamMembers: () => teamMembers,
  testimonials: () => testimonials
});
import { pgTable, text, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  projectType: varchar("project_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }),
  estimatedStartDate: varchar("estimated_start_date", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow()
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  location: varchar("location", { length: 100 }),
  completionDate: varchar("completion_date", { length: 50 })
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }),
  company: varchar("company", { length: 100 }),
  content: text("content").notNull(),
  rating: integer("rating").default(5)
});
var teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  bio: text("bio"),
  imageUrl: text("image_url").notNull()
});
var partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  logoUrl: text("logo_url").notNull()
});
var siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull()
});
var insertContactSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
var insertQuoteSchema = createInsertSchema(quoteRequests).omit({ id: true, createdAt: true });
var insertProjectSchema = createInsertSchema(projects).omit({ id: true });
var insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
var insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
var insertPartnerSchema = createInsertSchema(partners).omit({ id: true });

// server/db.ts
var { Pool } = pg;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var useSsl = true;
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSsl ? { rejectUnauthorized: false } : void 0
});
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async createContactMessage(message) {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
  async createQuoteRequest(request) {
    const [newRequest] = await db.insert(quoteRequests).values(request).returning();
    return newRequest;
  }
  async getProjects() {
    return await db.select().from(projects);
  }
  async getTestimonials() {
    return await db.select().from(testimonials);
  }
  async getTeamMembers() {
    return await db.select().from(teamMembers);
  }
  async getPartners() {
    return await db.select().from(partners);
  }
  // Admin - Projects
  async createProject(project) {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }
  async updateProject(id, project) {
    const [updated] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updated;
  }
  async deleteProject(id) {
    await db.delete(projects).where(eq(projects.id, id));
  }
  // Admin - Testimonials
  async deleteTestimonial(id) {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }
  // Admin - Team
  async createTeamMember(member) {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }
  async updateTeamMember(id, member) {
    const [updated] = await db.update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return updated;
  }
  async deleteTeamMember(id) {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }
  // Admin - Partners
  async createPartner(partner) {
    const [newPartner] = await db.insert(partners).values(partner).returning();
    return newPartner;
  }
  async updatePartner(id, partner) {
    const [updated] = await db.update(partners).set(partner).where(eq(partners.id, id)).returning();
    return updated;
  }
  async deletePartner(id) {
    await db.delete(partners).where(eq(partners.id, id));
  }
  // Admin - Settings
  async getSetting(key) {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting ? setting.value : null;
  }
  async setSetting(key, value) {
    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    if (existing.length > 0) {
      await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({ key, value });
    }
  }
};
var storage = new DatabaseStorage();

// shared/routes.ts
import { z } from "zod";
var errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional()
  }),
  internal: z.object({
    message: z.string()
  })
};
var api = {
  contact: {
    submit: {
      method: "POST",
      path: "/api/contact",
      input: insertContactSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: errorSchemas.validation
      }
    }
  },
  quotes: {
    submit: {
      method: "POST",
      path: "/api/quotes",
      input: insertQuoteSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: errorSchemas.validation
      }
    }
  },
  projects: {
    list: {
      method: "GET",
      path: "/api/projects",
      responses: {
        200: z.array(z.custom())
      }
    }
  },
  testimonials: {
    list: {
      method: "GET",
      path: "/api/testimonials",
      responses: {
        200: z.array(z.custom())
      }
    }
  },
  team: {
    list: {
      method: "GET",
      path: "/api/team",
      responses: {
        200: z.array(z.custom())
      }
    }
  },
  partners: {
    list: {
      method: "GET",
      path: "/api/partners",
      responses: {
        200: z.array(z.custom())
      }
    }
  }
};

// server/routes.ts
import { z as z2 } from "zod";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";
var ADMIN_USER = "admin";
var ADMIN_PASS = "BEP123";
var ADMIN_TOKEN = process.env.ADMIN_TOKEN || "begec-admin-secret-token-2024";
var uploadsDir = process.env.VERCEL ? path.join("/tmp", "uploads") : path.join(process.cwd(), "uploads");
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  console.warn("Could not create uploads directory:", e);
}
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext || mime) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  }
});
function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ message: "Non autoris\xE9" });
  }
  next();
}
async function registerRoutes(httpServer2, app2) {
  const { default: express2 } = await import("express");
  app2.use("/uploads", express2.static(uploadsDir));
  app2.get("/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const localFile = path.join(uploadsDir, filename);
    if (fs.existsSync(localFile)) {
      return res.sendFile(localFile);
    }
    if (process.env.SUPABASE_URL) {
      return res.redirect(302, `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${filename}`);
    }
    res.status(404).send("Fichier non trouv\xE9");
  });
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  app2.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouveau message: ${input.subject}`,
          html: `<h3>Nouveau message de contact</h3><p><strong>Nom:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>T\xE9l\xE9phone:</strong> ${input.phone || "N/A"}</p><p><strong>Sujet:</strong> ${input.subject}</p><hr /><p><strong>Message:</strong></p><p>${input.message.replace(/\n/g, "<br>")}</p>`
        });
      }
      res.json({ success: true, message: "Message re\xE7u avec succ\xE8s." });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Donn\xE9es invalides", field: error.errors[0].path.join(".") });
      } else {
        console.error("Email error:", error);
        res.status(500).json({ message: "Erreur serveur interne" });
      }
    }
  });
  app2.post(api.quotes.submit.path, async (req, res) => {
    try {
      const input = api.quotes.submit.input.parse(req.body);
      await storage.createQuoteRequest(input);
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouvelle demande de devis: ${input.projectType}`,
          html: `<h3>Nouvelle demande de devis</h3><p><strong>Nom:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>T\xE9l\xE9phone:</strong> ${input.phone}</p><p><strong>Type de projet:</strong> ${input.projectType}</p><p><strong>Localisation:</strong> ${input.location || "N/A"}</p><hr /><p><strong>Description:</strong></p><p>${input.description.replace(/\n/g, "<br>")}</p>`
        });
      }
      res.json({ success: true, message: "Demande de devis re\xE7ue avec succ\xE8s." });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Donn\xE9es invalides", field: error.errors[0].path.join(".") });
      } else {
        console.error("Email error:", error);
        res.status(500).json({ message: "Erreur serveur interne" });
      }
    }
  });
  app2.get(api.projects.list.path, async (_req, res) => {
    res.json(await storage.getProjects());
  });
  app2.get(api.testimonials.list.path, async (_req, res) => {
    res.json(await storage.getTestimonials());
  });
  app2.get(api.team.list.path, async (_req, res) => {
    res.json(await storage.getTeamMembers());
  });
  app2.get(api.partners.list.path, async (_req, res) => {
    res.json(await storage.getPartners());
  });
  app2.get("/api/settings/:key", async (req, res) => {
    const value = await storage.getSetting(req.params.key);
    res.json({ key: req.params.key, value });
  });
  app2.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      res.json({ token: ADMIN_TOKEN });
    } else {
      res.status(401).json({ message: "Identifiants incorrects" });
    }
  });
  app2.post("/api/admin/upload", requireAdmin, upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier re\xE7u" });
    }
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + path.extname(req.file.originalname);
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      try {
        const uploadUrl = `${process.env.SUPABASE_URL}/storage/v1/object/uploads/${filename}`;
        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
            "Content-Type": req.file.mimetype || "application/octet-stream"
          },
          body: req.file.buffer
        });
        if (uploadRes.ok) {
          const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${filename}`;
          return res.json({ url: publicUrl });
        } else {
          console.error("Supabase upload failed:", uploadRes.status, await uploadRes.text());
        }
      } catch (err) {
        console.error("Supabase upload error:", err);
      }
    }
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadsDir, filename), req.file.buffer);
    } catch (e) {
      console.warn("Could not save to local disk:", e);
    }
    const url = `/uploads/${filename}`;
    res.json({ url });
  });
  app2.put("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      const { value } = req.body;
      await storage.setSetting(req.params.key, value);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.post("/api/admin/projects", requireAdmin, async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const project = await storage.updateProject(Number(req.params.id), req.body);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProject(Number(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.post("/api/admin/team", requireAdmin, async (req, res) => {
    try {
      const member = await storage.createTeamMember(req.body);
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.put("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      const member = await storage.updateTeamMember(Number(req.params.id), req.body);
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.delete("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteTeamMember(Number(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.post("/api/admin/partners", requireAdmin, async (req, res) => {
    try {
      const partner = await storage.createPartner(req.body);
      res.json(partner);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.put("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    try {
      const partner = await storage.updatePartner(Number(req.params.id), req.body);
      res.json(partner);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app2.delete("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePartner(Number(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  try {
    await runSeedData();
  } catch (e) {
    console.error("[seed] error during seeding (non-fatal):", e);
  }
  return httpServer2;
}
async function runSeedData() {
  const existingProjects = await storage.getProjects();
  const hasOldProjectLocations = existingProjects.some((p) => p.location?.includes("France"));
  if (existingProjects.length === 0 || hasOldProjectLocations) {
    for (const p of existingProjects) {
      await storage.deleteProject(p.id);
    }
    await db.insert(projects).values([
      {
        title: "Am\xE9nagement Lotissement Kip\xE9",
        category: "VRD",
        description: "Cr\xE9ation compl\xE8te de la voirie et des r\xE9seaux divers pour un lotissement r\xE9sidentiel de 20 parcelles \xE0 Kip\xE9.",
        imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac6?auto=format&fit=crop&q=80",
        location: "Conakry, Guin\xE9e",
        completionDate: "2024"
      },
      {
        title: "Terrassement Zone Commerciale",
        category: "Terrassement",
        description: "Nivellement et pr\xE9paration de terrain de 8000m\xB2 pour la construction d'une zone commerciale.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
        location: "Kindia, Guin\xE9e",
        completionDate: "2023"
      },
      {
        title: "R\xE9seau Assainissement Communal",
        category: "Assainissement",
        description: "R\xE9novation et extension du r\xE9seau d'eaux us\xE9es sur 3km pour la commune.",
        imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80",
        location: "Lab\xE9, Guin\xE9e",
        completionDate: "2024"
      },
      {
        title: "Am\xE9nagement Route Nationale",
        category: "Voirie",
        description: "R\xE9habilitation et \xE9largissement de 5km de route nationale avec pose de bordures et marquage.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80",
        location: "Mamou, Guin\xE9e",
        completionDate: "2023"
      },
      {
        title: "Construction Dalles et Caniveaux",
        category: "Assainissement",
        description: "Pose de dalles en b\xE9ton et cr\xE9ation de caniveaux pour la gestion des eaux pluviales en milieu urbain.",
        imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
        location: "N'Z\xE9r\xE9kor\xE9, Guin\xE9e",
        completionDate: "2024"
      },
      {
        title: "Am\xE9nagement Parc Industriel",
        category: "Am\xE9nagement Ext\xE9rieur",
        description: "Am\xE9nagement complet d'une zone industrielle : voirie interne, r\xE9seaux, \xE9clairage et espaces verts.",
        imageUrl: "https://images.unsplash.com/photo-1558435186-d31d14341926?auto=format&fit=crop&q=80",
        location: "Conakry, Guin\xE9e",
        completionDate: "2023"
      }
    ]);
  }
  const existingTestimonials = await storage.getTestimonials();
  const hasOldTestimonials = existingTestimonials.some((t) => t.clientName === "Jean Dupont");
  if (existingTestimonials.length === 0 || hasOldTestimonials) {
    for (const t of existingTestimonials) {
      await storage.deleteTestimonial(t.id);
    }
    await db.insert(testimonials).values([
      {
        clientName: "Mamadou Bah",
        role: "Directeur de Projet",
        company: "Soci\xE9t\xE9 Immobili\xE8re de Guin\xE9e",
        content: "BEGEC TP a fait preuve d'un professionnalisme exemplaire sur notre chantier. D\xE9lais respect\xE9s, qualit\xE9 irr\xE9prochable \u2014 je les recommande vivement.",
        rating: 5
      },
      {
        clientName: "Fatoumata Diallo",
        role: "Maire",
        company: "Commune de Ratoma",
        content: "Une \xE9quipe r\xE9active et comp\xE9tente pour nos travaux de voirie. Les d\xE9lais ont \xE9t\xE9 tenus et le r\xE9sultat d\xE9passe nos attentes.",
        rating: 5
      },
      {
        clientName: "Ibrahim Kouyat\xE9",
        role: "Architecte",
        company: "Cabinet d'Architecture de Conakry",
        content: "Collaboration fluide et r\xE9sultats conformes \xE0 nos exigences techniques. BEGEC TP est un partenaire fiable pour des projets de grande envergure.",
        rating: 4
      }
    ]);
  }
  const existingTeam = await storage.getTeamMembers();
  if (existingTeam.length === 0) {
    await db.insert(teamMembers).values([
      {
        name: "Lancinet DABO",
        role: "Administrateur G\xE9n\xE9ral",
        bio: "Visionnaire et leader strat\xE9gique de BEGEC TP.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
      },
      {
        name: "Abdourahmane Bella KEITA",
        role: "Directeur G\xE9n\xE9ral",
        bio: "Expert en gestion op\xE9rationnelle et d\xE9veloppement.",
        imageUrl: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&q=80"
      },
      {
        name: "Moustapha KABA",
        role: "Directeur Admin. Financier",
        bio: "Garant de la stabilit\xE9 financi\xE8re et administrative.",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
      },
      {
        name: "Hassan Aboufiras",
        role: "Coordinateur des projets",
        bio: "Ma\xEEtre d'\u0153uvre de la coordination inter-projets.",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
      },
      {
        name: "Ibrahima P\xE9p\xE9 TRAORE",
        role: "Directeur Technique",
        bio: "Expert technique supervisant l'excellence m\xE9tier.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
      },
      {
        name: "Sidate DIAW",
        role: "Directeur de la logistique",
        bio: "Expert en flux et gestion du mat\xE9riel.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
      },
      {
        name: "Moribinet SYLLA",
        role: "Directeur RH",
        bio: "En charge du capital humain de l'entreprise.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
      },
      {
        name: "Manuel Antonio Ferreira Cabral",
        role: "Dir. D'exploitation de la production",
        bio: "Superviseur de la production sur le terrain.",
        imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80"
      }
    ]);
  }
  const existingPartners = await storage.getPartners();
  const hasPlaceholders = existingPartners.some((p) => p.name.startsWith("Partner "));
  if (existingPartners.length === 0 || hasPlaceholders) {
    for (const p of existingPartners) {
      await storage.deletePartner(p.id);
    }
    await db.insert(partners).values([
      { name: "Caterpillar", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Caterpillar_logo.svg" },
      { name: "Komatsu", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Komatsu_logo.svg" },
      { name: "Holcim", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Holcim-Logo.svg" },
      { name: "JCB", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/JCB_logo.svg" },
      { name: "World Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/The_World_Bank_logo.svg" },
      { name: "TotalEnergies", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/TotalEnergies_logo.svg" }
    ]);
  }
  const existingPhone = await storage.getSetting("phone");
  if (!existingPhone) {
    await storage.setSetting("phone", "(+224) 622 21 34 67");
    await storage.setSetting("email", "contact@begecgroup.com");
    await storage.setSetting("address", "CARREFOUR IPS, KIPE, COMMUNE DE RATOMA");
    await storage.setSetting("hours", "Lun - Ven: 8h00 - 18h00\nSamedi: Sur rendez-vous");
  }
}

// server/api.ts
import { createServer } from "http";
var app = express();
var httpServer = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, _res, next) => {
  const matchedPath = req.headers["x-matched-path"] || req.headers["x-vercel-matched-path"];
  if (matchedPath && (matchedPath.startsWith("/api") || matchedPath.startsWith("/uploads"))) {
    req.url = matchedPath;
  }
  next();
});
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: process.env.DATABASE_URL ? "configured" : "missing",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
var isInitialized = false;
var initPromise = null;
async function setup() {
  if (!isInitialized) {
    if (!initPromise) {
      initPromise = (async () => {
        await registerRoutes(httpServer, app);
        app.use((err, req, res, _next) => {
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
async function handler(req, res) {
  await setup();
  return new Promise((resolve, reject) => {
    res.on("finish", () => resolve());
    res.on("close", () => resolve());
    res.on("error", (err) => reject(err));
    app(req, res);
  });
}
export {
  handler as default
};
