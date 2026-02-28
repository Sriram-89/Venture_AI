import { db } from "./db";
import { ideas, type InsertIdea, type Idea } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createIdea(idea: InsertIdea, analysis: any): Promise<Idea>;
  getIdea(id: number): Promise<Idea | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createIdea(insertIdea: InsertIdea, analysis: any): Promise<Idea> {
    const [idea] = await db.insert(ideas).values({
      description: insertIdea.description,
      analysis,
    }).returning();
    return idea;
  }

  async getIdea(id: number): Promise<Idea | undefined> {
    const [idea] = await db.select().from(ideas).where(eq(ideas.id, id));
    return idea;
  }
}

export const storage = new DatabaseStorage();
