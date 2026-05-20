import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import {
  projects, testimonials, teamMembers, partners,
  insertProjectSchema, insertTestimonialSchema, insertTeamMemberSchema, insertPartnerSchema,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

const ADMIN_TOKEN = "begec-admin-secret-token-2024";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  next();
}

async function runSeedData() {
  try {
    const GUINEAN_LOCATIONS = ["Conakry", "Kindia", "Labé", "Mamou", "N'Zérékoré", "Boké", "Faranah"];
    const FRENCH_LOCATIONS = ["Lyon", "Grenoble", "Valence", "Chambéry", "France"];

    const existingProjects = await storage.getProjects();
    const hasFrenchProjects = existingProjects.some((p) =>
      FRENCH_LOCATIONS.some((loc) => p.location?.includes(loc))
    );

    if (existingProjects.length === 0 || hasFrenchProjects) {
      await db.delete(projects);
      await db.insert(projects).values([
        {
          title: "Construction Route Nationale RN1",
          category: "Route & Infrastructure",
          description: "Réhabilitation et élargissement de 45 km de route nationale entre Conakry et Coyah, incluant drainage et signalisation routière.",
          imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
          location: "Conakry, Guinée",
          completionDate: "2024",
        },
        {
          title: "Terrassement Complexe Minier de Kindia",
          category: "Terrassement",
          description: "Préparation de plateforme de 120 hectares pour l'installation d'un complexe minier : décapage, remblai et compactage.",
          imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac6?auto=format&fit=crop&q=80",
          location: "Kindia, Guinée",
          completionDate: "2024",
        },
        {
          title: "Aménagement Voirie Urbaine de Labé",
          category: "VRD",
          description: "Création de 8 km de voirie urbaine avec réseaux assainissement, eau potable et éclairage public dans le quartier commercial.",
          imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80",
          location: "Labé, Guinée",
          completionDate: "2023",
        },
        {
          title: "Réseau d'Assainissement de Mamou",
          category: "Assainissement",
          description: "Construction d'un réseau de collecte des eaux usées de 12 km desservant 15 000 habitants de la ville de Mamou.",
          imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80",
          location: "Mamou, Guinée",
          completionDate: "2024",
        },
        {
          title: "Construction Pont Fluvial de N'Zérékoré",
          category: "Génie Civil",
          description: "Construction d'un pont de 180 mètres sur le fleuve Makona, reliant deux communautés rurales isolées.",
          imageUrl: "https://images.unsplash.com/photo-1558435186-d31d14341926?auto=format&fit=crop&q=80",
          location: "N'Zérékoré, Guinée",
          completionDate: "2023",
        },
        {
          title: "Plateforme Logistique Aéroport Conakry",
          category: "Terrassement",
          description: "Aménagement de 35 hectares de plateforme logistique avec voirie interne et équipements portuaires adjacents.",
          imageUrl: "https://images.unsplash.com/photo-1574710758673-4e4c7b66b26d?auto=format&fit=crop&q=80",
          location: "Conakry, Guinée",
          completionDate: "2024",
        },
      ]);
    }

    const existingTestimonials = await storage.getTestimonials();
    const hasFrenchTestimonials = existingTestimonials.some(
      (t) => t.clientName === "Jean Dupont" || t.clientName === "Marie Martin" || t.clientName === "Pierre Durand"
    );

    if (existingTestimonials.length === 0 || hasFrenchTestimonials) {
      await db.delete(testimonials);
      await db.insert(testimonials).values([
        {
          clientName: "Mamadou Bah",
          role: "Directeur Général",
          company: "SOTELGUI",
          content: "BEGEC TP a réalisé nos travaux de voirie avec un professionnalisme remarquable. Les délais ont été parfaitement respectés et la qualité des travaux dépasse nos attentes.",
          rating: 5,
        },
        {
          clientName: "Fatoumata Diallo",
          role: "Directrice des Infrastructures",
          company: "Ministère des Travaux Publics",
          content: "Une entreprise de référence en Guinée. Leur expertise technique sur les grands chantiers d'infrastructure est indéniable. Nous leur faisons confiance depuis plusieurs années.",
          rating: 5,
        },
        {
          clientName: "Ibrahim Kouyaté",
          role: "Président Directeur Général",
          company: "Groupe SOGEPROM",
          content: "Collaboration exceptionnelle sur notre complexe immobilier de Kaloum. BEGEC TP a su gérer les contraintes techniques du terrain avec efficacité et rigueur.",
          rating: 5,
        },
      ]);
    }

    const existingTeam = await storage.getTeamMembers();
    if (existingTeam.length > 0) {
      await db.delete(teamMembers);
    }
    await db.insert(teamMembers).values([
      {
        name: "Lancinet DABO",
        role: "Administrateur Général",
        bio: "Visionnaire et leader stratégique de BEGEC TP, il guide l'entreprise vers l'excellence depuis sa création.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      },
      {
        name: "Abdourahmane Bella KEITA",
        role: "Directeur Général",
        bio: "Expert en gestion opérationnelle et développement des grands projets d'infrastructure en Guinée.",
        imageUrl: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&q=80",
      },
      {
        name: "Moustapha KABA",
        role: "Directeur Administratif & Financier",
        bio: "Garant de la stabilité financière et administrative, il pilote la stratégie économique de l'entreprise.",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
      },
      {
        name: "Hassan Aboufiras",
        role: "Coordinateur des Projets",
        bio: "Maître d'œuvre de la coordination inter-projets, il assure la livraison dans les délais et budgets impartis.",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
      },
      {
        name: "Ibrahima Pépé TRAORE",
        role: "Directeur Technique",
        bio: "Expert technique de haut niveau supervisant l'excellence métier sur l'ensemble des chantiers BEGEC TP.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
      },
      {
        name: "Sidate DIAW",
        role: "Directeur de la Logistique",
        bio: "Spécialiste en gestion de flotte et d'approvisionnement, il optimise les flux logistiques de l'entreprise.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      },
      {
        name: "Moribinet SYLLA",
        role: "Directeur des Ressources Humaines",
        bio: "En charge du capital humain, il développe les talents et garantit le bien-être des équipes BEGEC TP.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      },
      {
        name: "Manuel Antonio Ferreira Cabral",
        role: "Directeur d'Exploitation",
        bio: "Superviseur de la production sur le terrain, il garantit la qualité d'exécution de chaque chantier.",
        imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80",
      },
    ]);

    const existingPartners = await storage.getPartners();
    const hasFakePartners = existingPartners.some(
      (p) => p.name.startsWith("Partner") || p.logoUrl.includes("Amazon") || p.logoUrl.includes("Netflix")
    );

    if (existingPartners.length === 0 || hasFakePartners) {
      await db.delete(partners);
      await db.insert(partners).values([
        {
          name: "Caterpillar",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Caterpillar_logo.svg/2560px-Caterpillar_logo.svg.png",
        },
        {
          name: "Komatsu",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Komatsu_logo.svg/2560px-Komatsu_logo.svg.png",
        },
        {
          name: "Holcim",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Holcim_logo.svg/2560px-Holcim_logo.svg.png",
        },
        {
          name: "JCB",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/JCB_logo.svg/1280px-JCB_logo.svg.png",
        },
        {
          name: "World Bank",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/2560px-The_World_Bank_logo.svg.png",
        },
        {
          name: "TotalEnergies",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/TotalEnergies_logo.svg/2560px-TotalEnergies_logo.svg.png",
        },
      ]);
    }
  } catch (err) {
    console.error("[Seed] Erreur lors du seeding (non-fatal):", err);
  }
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await runSeedData();

  // ─── PUBLIC ROUTES ──────────────────────────────────────────────────────────

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouveau message: ${input.subject}`,
          html: `<h3>Nouveau message de contact</h3><p><strong>Nom:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>Téléphone:</strong> ${input.phone || "N/A"}</p><p><strong>Sujet:</strong> ${input.subject}</p><hr/><p>${input.message.replace(/\n/g, "<br>")}</p>`,
        });
      }
      res.json({ success: true, message: "Message reçu avec succès." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", field: error.errors[0].path.join(".") });
      } else {
        console.error("Contact error:", error);
        res.status(500).json({ message: "Erreur serveur interne" });
      }
    }
  });

  app.post(api.quotes.submit.path, async (req, res) => {
    try {
      const input = api.quotes.submit.input.parse(req.body);
      await storage.createQuoteRequest(input);
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouvelle demande de devis: ${input.projectType}`,
          html: `<h3>Nouvelle demande de devis</h3><p><strong>Nom:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>Téléphone:</strong> ${input.phone}</p><p><strong>Type:</strong> ${input.projectType}</p><p><strong>Localisation:</strong> ${input.location || "N/A"}</p><hr/><p>${input.description.replace(/\n/g, "<br>")}</p>`,
        });
      }
      res.json({ success: true, message: "Demande de devis reçue avec succès." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", field: error.errors[0].path.join(".") });
      } else {
        console.error("Quote error:", error);
        res.status(500).json({ message: "Erreur serveur interne" });
      }
    }
  });

  app.get(api.projects.list.path, async (_req, res) => {
    try {
      res.json(await storage.getProjects());
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get(api.testimonials.list.path, async (_req, res) => {
    try {
      res.json(await storage.getTestimonials());
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get(api.team.list.path, async (_req, res) => {
    try {
      res.json(await storage.getTeamMembers());
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get(api.partners.list.path, async (_req, res) => {
    try {
      res.json(await storage.getPartners());
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ─── ADMIN AUTH ──────────────────────────────────────────────────────────────

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "BEP123") {
      res.json({ token: ADMIN_TOKEN });
    } else {
      res.status(401).json({ message: "Identifiants incorrects" });
    }
  });

  // ─── ADMIN: CONTACTS ─────────────────────────────────────────────────────────

  app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
    try {
      res.json(await storage.getContactMessages());
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteContactMessage(Number(req.params.id));
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ─── ADMIN: DEVIS ────────────────────────────────────────────────────────────

  app.get("/api/admin/quotes", requireAdmin, async (_req, res) => {
    try {
      res.json(await storage.getQuoteRequests());
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/quotes/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteQuoteRequest(Number(req.params.id));
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ─── ADMIN: PROJECTS ─────────────────────────────────────────────────────────

  app.post("/api/admin/projects", requireAdmin, async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      res.json(await storage.createProject(data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.patch("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertProjectSchema.partial().parse(req.body);
      res.json(await storage.updateProject(Number(req.params.id), data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProject(Number(req.params.id));
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ─── ADMIN: TESTIMONIALS ─────────────────────────────────────────────────────

  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const data = insertTestimonialSchema.parse(req.body);
      res.json(await storage.createTestimonial(data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.patch("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertTestimonialSchema.partial().parse(req.body);
      res.json(await storage.updateTestimonial(Number(req.params.id), data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteTestimonial(Number(req.params.id));
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ─── ADMIN: TEAM ─────────────────────────────────────────────────────────────

  app.post("/api/admin/team", requireAdmin, async (req, res) => {
    try {
      const data = insertTeamMemberSchema.parse(req.body);
      res.json(await storage.createTeamMember(data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.patch("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertTeamMemberSchema.partial().parse(req.body);
      res.json(await storage.updateTeamMember(Number(req.params.id), data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.delete("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteTeamMember(Number(req.params.id));
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ─── ADMIN: PARTNERS ─────────────────────────────────────────────────────────

  app.post("/api/admin/partners", requireAdmin, async (req, res) => {
    try {
      const data = insertPartnerSchema.parse(req.body);
      res.json(await storage.createPartner(data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.patch("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertPartnerSchema.partial().parse(req.body);
      res.json(await storage.updatePartner(Number(req.params.id), data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  });

  app.delete("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePartner(Number(req.params.id));
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  return httpServer;
}
