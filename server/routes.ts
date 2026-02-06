import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { projects, testimonials, teamMembers } from "@shared/schema";
import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact Form
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      res.json({ success: true, message: "Message reçu avec succès." });
    } catch (error) {
       if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", field: error.errors[0].path.join('.') });
      } else {
        res.status(500).json({ message: "Erreur serveur interne" });
      }
    }
  });

  // Quote Request
  app.post(api.quotes.submit.path, async (req, res) => {
    try {
      const input = api.quotes.submit.input.parse(req.body);
      await storage.createQuoteRequest(input);
      res.json({ success: true, message: "Demande de devis reçue avec succès." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", field: error.errors[0].path.join('.') });
      } else {
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
  if (existingTeam.length === 0) {
    await db.insert(teamMembers).values([
      {
        name: "Marc Durand",
        role: "Directeur Général",
        bio: "20 ans d'expérience dans les travaux publics. Marc dirige BEGEC TP avec une vision centrée sur la qualité et la sécurité.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
      },
      {
        name: "Sophie Leclerc",
        role: "Responsable Bureau d'Études",
        bio: "Ingénieure de formation, Sophie supervise la conception et la planification de tous nos projets.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
      },
      {
        name: "Thomas Moreau",
        role: "Chef de Chantier Principal",
        bio: "Expert du terrain, Thomas veille au bon déroulement des opérations et au respect des délais.",
        imageUrl: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&q=80"
      },
       {
        name: "Lucas Dubois",
        role: "Conducteur d'Engins",
        bio: "Passionné par la mécanique et la précision, Lucas maîtrise notre flotte d'engins avec expertise.",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
      }
    ]);
  }

  return httpServer;
}
