CREATE TABLE "exported" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"remote_key" text NOT NULL,
	"remote_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "exported_remote_key_unique" UNIQUE("remote_key")
);
--> statement-breakpoint
CREATE TABLE "urls" (
	"id" text PRIMARY KEY NOT NULL,
	"orignal_url" text NOT NULL,
	"shortened_url" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "urls_shortened_url_unique" UNIQUE("shortened_url")
);
