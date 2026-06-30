import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { projects, testimonials, teamMembers, partners } from "@shared/schema";
import { db } from "./db";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ObjectStorageService } from "./replit_integrations/object_storage";

const ADMIN_USER = "admin";
const ADMIN_PASS = "BEP123";
const ADMIN_TOKEN = "begec-admin-secret-token-2024";

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), "uploads");
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  console.warn("Could not create uploads directory:", e);
}

const objectStorageService = new ObjectStorageService();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = /^image\//.test(file.mimetype) && allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// Admin auth middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-admin-token"];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Serve legacy uploaded files (committed dev assets) statically
  const { default: express } = await import("express");
  app.use("/uploads", express.static(uploadsDir));

  // Serve public objects from persistent object storage
  app.get(/^\/public-objects\/(.+)$/, async (req, res) => {
    try {
      const filePath = (req.params as Record<string, string>)[0];
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ message: "Fichier introuvable" });
      }
      await objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error serving public object:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Contact Form
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouveau message: ${input.subject}`,
          html: `<h3>Nouveau message de contact</h3><p><strong>Nom:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>Téléphone:</strong> ${input.phone || "N/A"}</p><p><strong>Sujet:</strong> ${input.subject}</p><hr /><p><strong>Message:</strong></p><p>${input.message.replace(/\n/g, "<br>")}</p>`,
        });
      }
      res.json({ success: true, message: "Message reçu avec succès." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", field: error.errors[0].path.join('.') });
      } else {
        console.error("Email error:", error);
        res.status(500).json({ message: "Erreur serveur interne" });
      }
    }
  });

  // Quote Request
  app.post(api.quotes.submit.path, async (req, res) => {
    try {
      const input = api.quotes.submit.input.parse(req.body);
      await storage.createQuoteRequest(input);
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouvelle demande de devis: ${input.projectType}`,
          html: `<h3>Nouvelle demande de devis</h3><p><strong>Nom:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>Téléphone:</strong> ${input.phone}</p><p><strong>Type de projet:</strong> ${input.projectType}</p><p><strong>Localisation:</strong> ${input.location || "N/A"}</p><hr /><p><strong>Description:</strong></p><p>${input.description.replace(/\n/g, "<br>")}</p>`,
        });
      }
      res.json({ success: true, message: "Demande de devis reçue avec succès." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", field: error.errors[0].path.join('.') });
      } else {
        console.error("Email error:", error);
        res.status(500).json({ message: "Erreur serveur interne" });
      }
    }
  });

  // Public GET routes
  app.get(api.projects.list.path, async (_req, res) => {
    res.json(await storage.getProjects());
  });

  app.get(api.testimonials.list.path, async (_req, res) => {
    res.json(await storage.getTestimonials());
  });

  app.get(api.team.list.path, async (_req, res) => {
    res.json(await storage.getTeamMembers());
  });

  app.get(api.partners.list.path, async (_req, res) => {
    res.json(await storage.getPartners());
  });

  app.get("/api/settings/:key", async (req, res) => {
    const value = await storage.getSetting(req.params.key);
    res.json({ key: req.params.key, value });
  });

  // ==================== ADMIN ROUTES ====================

  // Admin login
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      res.json({ token: ADMIN_TOKEN });
    } else {
      res.status(401).json({ message: "Identifiants incorrects" });
    }
  });

  // Upload image to persistent object storage
  app.post("/api/admin/upload", requireAdmin, upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier reçu" });
    }
    try {
      const ext = path.extname(req.file.originalname) || "";
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      await objectStorageService.uploadPublicFile(
        fileName,
        req.file.buffer,
        req.file.mimetype || "application/octet-stream"
      );
      res.json({ url: `/public-objects/${fileName}` });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Échec de l'upload" });
    }
  });

  // Admin - Site settings (logo, etc.)
  app.put("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      const { value } = req.body;
      await storage.setSetting(req.params.key, value);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Admin - Projects CRUD
  app.post("/api/admin/projects", requireAdmin, async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const project = await storage.updateProject(Number(req.params.id), req.body);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProject(Number(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Admin - Team CRUD
  app.post("/api/admin/team", requireAdmin, async (req, res) => {
    try {
      const member = await storage.createTeamMember(req.body);
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      const member = await storage.updateTeamMember(Number(req.params.id), req.body);
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteTeamMember(Number(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Admin - Partners CRUD
  app.post("/api/admin/partners", requireAdmin, async (req, res) => {
    try {
      const partner = await storage.createPartner(req.body);
      res.json(partner);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    try {
      const partner = await storage.updatePartner(Number(req.params.id), req.body);
      res.json(partner);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePartner(Number(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ==================== SEED DATA ====================
  try { await runSeedData(); } catch (e) { console.error("[seed] error during seeding (non-fatal):", e); }

  return httpServer;
}

async function runSeedData() {

  const existingProjects = await storage.getProjects();
  const hasOldProjectLocations = existingProjects.some(p => p.location?.includes("France"));
  if (existingProjects.length === 0 || hasOldProjectLocations) {
    for (const p of existingProjects) {
      await storage.deleteProject(p.id);
    }
    await db.insert(projects).values([
      {
        title: "Aménagement Lotissement Kipé",
        category: "VRD",
        description: "Création complète de la voirie et des réseaux divers pour un lotissement résidentiel de 20 parcelles à Kipé.",
        imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac6?auto=format&fit=crop&q=80",
        location: "Conakry, Guinée",
        completionDate: "2024"
      },
      {
        title: "Terrassement Zone Commerciale",
        category: "Terrassement",
        description: "Nivellement et préparation de terrain de 8000m² pour la construction d'une zone commerciale.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
        location: "Kindia, Guinée",
        completionDate: "2023"
      },
      {
        title: "Réseau Assainissement Communal",
        category: "Assainissement",
        description: "Rénovation et extension du réseau d'eaux usées sur 3km pour la commune.",
        imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80",
        location: "Labé, Guinée",
        completionDate: "2024"
      },
      {
        title: "Aménagement Route Nationale",
        category: "Voirie",
        description: "Réhabilitation et élargissement de 5km de route nationale avec pose de bordures et marquage.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80",
        location: "Mamou, Guinée",
        completionDate: "2023"
      },
      {
        title: "Construction Dalles et Caniveaux",
        category: "Assainissement",
        description: "Pose de dalles en béton et création de caniveaux pour la gestion des eaux pluviales en milieu urbain.",
        imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
        location: "N'Zérékoré, Guinée",
        completionDate: "2024"
      },
      {
        title: "Aménagement Parc Industriel",
        category: "Aménagement Extérieur",
        description: "Aménagement complet d'une zone industrielle : voirie interne, réseaux, éclairage et espaces verts.",
        imageUrl: "https://images.unsplash.com/photo-1558435186-d31d14341926?auto=format&fit=crop&q=80",
        location: "Conakry, Guinée",
        completionDate: "2023"
      }
    ]);
  }

  const existingTestimonials = await storage.getTestimonials();
  const hasOldTestimonials = existingTestimonials.some(t => t.clientName === "Jean Dupont");
  if (existingTestimonials.length === 0 || hasOldTestimonials) {
    for (const t of existingTestimonials) {
      await storage.deleteTestimonial(t.id);
    }
    await db.insert(testimonials).values([
      {
        clientName: "Mamadou Bah",
        role: "Directeur de Projet",
        company: "Société Immobilière de Guinée",
        content: "BEGEC TP a fait preuve d'un professionnalisme exemplaire sur notre chantier. Délais respectés, qualité irréprochable — je les recommande vivement.",
        rating: 5
      },
      {
        clientName: "Fatoumata Diallo",
        role: "Maire",
        company: "Commune de Ratoma",
        content: "Une équipe réactive et compétente pour nos travaux de voirie. Les délais ont été tenus et le résultat dépasse nos attentes.",
        rating: 5
      },
      {
        clientName: "Ibrahim Kouyaté",
        role: "Architecte",
        company: "Cabinet d'Architecture de Conakry",
        content: "Collaboration fluide et résultats conformes à nos exigences techniques. BEGEC TP est un partenaire fiable pour des projets de grande envergure.",
        rating: 4
      }
    ]);
  }

  const existingTeam = await storage.getTeamMembers();
  if (existingTeam.length === 0) {
  await db.insert(teamMembers).values([
    {
      name: "Lancinet DABO",
      role: "Administrateur Général",
      bio: "Visionnaire et leader stratégique de BEGEC TP.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
      name: "Abdourahmane Bella KEITA",
      role: "Directeur Général",
      bio: "Expert en gestion opérationnelle et développement.",
      imageUrl: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&q=80"
    },
    {
      name: "Moustapha KABA",
      role: "Directeur Admin. Financier",
      bio: "Garant de la stabilité financière et administrative.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
    },
    {
      name: "Hassan Aboufiras",
      role: "Coordinateur des projets",
      bio: "Maître d'œuvre de la coordination inter-projets.",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
    },
    {
      name: "Ibrahima Pépé TRAORE",
      role: "Directeur Technique",
      bio: "Expert technique supervisant l'excellence métier.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
    },
    {
      name: "Sidate DIAW",
      role: "Directeur de la logistique",
      bio: "Expert en flux et gestion du matériel.",
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
  const hasPlaceholders = existingPartners.some(p => p.name.startsWith("Partner "));
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
      { name: "TotalEnergies", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/TotalEnergies_logo.svg" },
    ]);
  }

  // Seed contact info settings
  const existingPhone = await storage.getSetting("phone");
  if (!existingPhone) {
    await storage.setSetting("phone", "(+224) 622 21 34 67");
    await storage.setSetting("email", "contact@begecgroup.com");
    await storage.setSetting("address", "CARREFOUR IPS, KIPE, COMMUNE DE RATOMA");
    await storage.setSetting("hours", "Lun - Ven: 8h00 - 18h00\nSamedi: Sur rendez-vous");
  }
}
