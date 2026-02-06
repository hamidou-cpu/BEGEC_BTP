import { pgTable, text, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  projectType: varchar("project_type", { length: 100 }).notNull(), // e.g., Terrassement, VRD
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }),
  estimatedStartDate: varchar("estimated_start_date", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Terrassement, VRD, Assainissement, etc.
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  location: varchar("location", { length: 100 }),
  completionDate: varchar("completion_date", { length: 50 }),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }),
  company: varchar("company", { length: 100 }),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  bio: text("bio"),
  imageUrl: text("image_url").notNull(),
});

export const insertContactSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export const insertQuoteSchema = createInsertSchema(quoteRequests).omit({ id: true, createdAt: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactSchema>;

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteSchema>;

export type Project = typeof projects.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
