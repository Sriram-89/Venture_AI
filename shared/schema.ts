import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  analysis: jsonb("analysis").$type<{
    marketCompetition: string;
    targetAudience: string;
    successRate: number;
    uniqueDifferentiators: string[];
    governmentSchemes: string[];
    roadmap: {
      thisWeek: string;
      thisMonth: string;
      thisQuarter: string;
    };
  }>(),
});

export const insertIdeaSchema = createInsertSchema(ideas).pick({
  description: true,
});

export type InsertIdea = z.infer<typeof insertIdeaSchema>;
export type Idea = typeof ideas.$inferSelect;
