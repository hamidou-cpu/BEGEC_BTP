import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { projects, testimonials, teamMembers, partners } from "@shared/schema";
import { db } from "./db";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Configuration du transporteur d'e-mails
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

      // Envoi de l'e-mail si configuré
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouveau message: ${input.subject}`,
          text: `Nom: ${input.name}\nEmail: ${input.email}\nTéléphone: ${input.phone || "N/A"}\n\nMessage:\n${input.message}`,
          html: `
            <h3>Nouveau message de contact</h3>
            <p><strong>Nom:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Téléphone:</strong> ${input.phone || "N/A"}</p>
            <p><strong>Sujet:</strong> ${input.subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${input.message.replace(/\n/g, "<br>")}</p>
          `,
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

      // Envoi de l'e-mail de devis si configuré
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web BEGEC TP" <${process.env.SMTP_USER}>`,
          to: "contact@begecgroup.com",
          subject: `Nouvelle demande de devis: ${input.projectType}`,
          text: `Nom: ${input.name}\nEmail: ${input.email}\nTéléphone: ${input.phone}\nProjet: ${input.projectType}\nLocalisation: ${input.location || "N/A"}\n\nDescription:\n${input.description}`,
          html: `
            <h3>Nouvelle demande de devis</h3>
            <p><strong>Nom:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Téléphone:</strong> ${input.phone}</p>
            <p><strong>Type de projet:</strong> ${input.projectType}</p>
            <p><strong>Localisation:</strong> ${input.location || "N/A"}</p>
            <hr />
            <p><strong>Description:</strong></p>
            <p>${input.description.replace(/\n/g, "<br>")}</p>
          `,
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

  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projectsList = await storage.getProjects();
    res.json(projectsList);
  });

  // Testimonials
  app.get(api.testimonials.list.path, async (_req, res) => {
    const testimonialsList = await storage.getTestimonials();
    res.json(testimonialsList);
  });

  // Team
  app.get(api.team.list.path, async (_req, res) => {
    const teamList = await storage.getTeamMembers();
    res.json(teamList);
  });

  // Partners
  app.get(api.partners.list.path, async (_req, res) => {
    const partnersList = await storage.getPartners();
    res.json(partnersList);
  });

  // Seed Data (if empty)
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "Aménagement Lotissement Les Chênes",
        category: "VRD",
        description: "Création complète de la voirie et des réseaux divers pour un lotissement de 15 parcelles.",
        imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac6?auto=format&fit=crop&q=80",
        location: "Lyon, France",
        completionDate: "2024"
      },
      {
        title: "Terrassement Centre Commercial",
        category: "Terrassement",
        description: "Nivellement de terrain de 5000m² pour la construction d'une zone commerciale.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
        location: "Grenoble, France",
        completionDate: "2023"
      },
      {
        title: "Réseau Assainissement Communal",
        category: "Assainissement",
        description: "Rénovation et extension du réseau d'eaux usées sur 2km.",
        imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80",
        location: "Valence, France",
        completionDate: "2024"
      },
      {
        title: "Aménagement Parc Urbain",
        category: "Aménagement Extérieur",
        description: "Création de sentiers, pose de bordures et aménagement paysager.",
        imageUrl: "https://images.unsplash.com/photo-1558435186-d31d14341926?auto=format&fit=crop&q=80",
        location: "Chambéry, France",
        completionDate: "2023"
      }
    ]);
  }

  const existingTestimonials = await storage.getTestimonials();
  if (existingTestimonials.length === 0) {
    await db.insert(testimonials).values([
      {
        clientName: "Jean Dupont",
        role: "Directeur de Projet",
        company: "ImmoBuild",
        content: "BEGEC TP a fait preuve d'un professionnalisme exemplaire sur notre chantier. Délais respectés et qualité au rendez-vous.",
        rating: 5
      },
      {
        clientName: "Marie Martin",
        role: "Maire",
        company: "Mairie de Saint-Clair",
        content: "Une équipe réactive et compétente pour nos travaux de voirie. Je recommande vivement.",
        rating: 5
      },
      {
        clientName: "Pierre Durand",
        role: "Architecte",
        company: "ArchiDesign",
        content: "Collaboration fluide et résultats conformes à nos attentes techniques élevées.",
        rating: 4
      }
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

  const existingPartners = await storage.getPartners();
  if (existingPartners.length === 0) {
    await db.insert(partners).values([
      { name: "Partner 1", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
      { name: "Partner 2", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
      { name: "Partner 3", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
      { name: "Partner 4", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Apple_logo_grey.svg" },
      { name: "Partner 5", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
      { name: "Partner 6", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
    ]);
  }

  return httpServer;
}
