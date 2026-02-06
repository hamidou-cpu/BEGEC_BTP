import { db } from "./db";
import {
  contactMessages,
  quoteRequests,
  projects,
  testimonials,
  teamMembers,
  type ContactMessage,
  type InsertContactMessage,
  type QuoteRequest,
  type InsertQuoteRequest,
  type Project,
  type Testimonial,
  type TeamMember,
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getProjects(): Promise<Project[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getTeamMembers(): Promise<TeamMember[]>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }

  async createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest> {
    const [newRequest] = await db
      .insert(quoteRequests)
      .values(request)
      .returning();
    return newRequest;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }
}

export const storage = new DatabaseStorage();
