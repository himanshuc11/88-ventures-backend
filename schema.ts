import {
  serial,
  varchar,
  text,
  pgTable,
  jsonb,
  boolean,
  date,
  time,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const projects = pgTable("project", {
  id: serial("id").primaryKey(),
  image: text("image"),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});
