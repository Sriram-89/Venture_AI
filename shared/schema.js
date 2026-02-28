"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertIdeaSchema = exports.ideas = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
exports.ideas = (0, pg_core_1.pgTable)("ideas", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    description: (0, pg_core_1.text)("description").notNull(),
    analysis: (0, pg_core_1.jsonb)("analysis").$type(),
});
exports.insertIdeaSchema = (0, drizzle_zod_1.createInsertSchema)(exports.ideas).pick({
    description: true,
});
