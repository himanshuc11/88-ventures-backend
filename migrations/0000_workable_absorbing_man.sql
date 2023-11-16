CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text,
	"name" text,
	"created_at" timestamp DEFAULT now()
);
