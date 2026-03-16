-- ============================================================
-- Anoon Blog CMS - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Articles Table ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.articles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL DEFAULT '',
  title_ar        TEXT NOT NULL DEFAULT '',
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT DEFAULT '',
  excerpt_ar      TEXT DEFAULT '',
  content         TEXT DEFAULT '',
  content_ar      TEXT DEFAULT '',
  cover_image     TEXT,
  category        TEXT DEFAULT '',
  category_ar     TEXT DEFAULT '',
  tags            TEXT[] DEFAULT '{}',
  tags_ar         TEXT[] DEFAULT '{}',
  introdaction    TEXT DEFAULT '',
  introdaction_ar TEXT DEFAULT '',
  author          TEXT DEFAULT '',
  author_ar       TEXT DEFAULT '',
  status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views           INTEGER NOT NULL DEFAULT 0,
  likes           INTEGER NOT NULL DEFAULT 0,
  shares          INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at    TIMESTAMPTZ
);

ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS shares INTEGER NOT NULL DEFAULT 0;

-- ─── Comments Table ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id   UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  content      TEXT NOT NULL,
  author_name  TEXT DEFAULT 'Guest',
  author_email TEXT DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_articles_slug      ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status    ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_article   ON public.comments(article_id);

-- ─── Auto-update updated_at trigger ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON public.articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── RPC: Increment Views ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.increment_views(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_views INTEGER;
BEGIN
  UPDATE public.articles
  SET views = views + 1
  WHERE id = article_id
  RETURNING views INTO new_views;
  RETURN new_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── RPC: Update Likes ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_likes(article_id UUID, inc INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_likes INTEGER;
BEGIN
  UPDATE public.articles
  SET likes = GREATEST(0, likes + inc)
  WHERE id = article_id
  RETURNING likes INTO new_likes;
  RETURN new_likes;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── RPC: Increment Shares ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.increment_shares(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_shares INTEGER;
BEGIN
  UPDATE public.articles
  SET shares = shares + 1
  WHERE id = article_id
  RETURNING shares INTO new_shares;
  RETURN new_shares;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policies: Articles
-- Public can read published articles only
CREATE POLICY "Public can read published articles"
  ON public.articles FOR SELECT
  USING (status = 'published');

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can read all articles"
  ON public.articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert articles"
  ON public.articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON public.articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON public.articles FOR DELETE
  TO authenticated
  USING (true);

-- Policies: Comments
-- Public can read comments
CREATE POLICY "Public can read comments"
  ON public.comments FOR SELECT
  USING (true);

-- Anyone can insert comments
CREATE POLICY "Anyone can insert comments"
  ON public.comments FOR INSERT
  WITH CHECK (true);

-- Authenticated can delete comments
CREATE POLICY "Authenticated can delete comments"
  ON public.comments FOR DELETE
  TO authenticated
  USING (true);

-- ─── Training Programs Table ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.training_programs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL DEFAULT '',
  title_ar      TEXT NOT NULL DEFAULT '',
  description   TEXT DEFAULT '',
  description_ar TEXT DEFAULT '',
  image_url     TEXT DEFAULT '',
  button_text   TEXT DEFAULT '',
  button_text_ar TEXT DEFAULT '',
  button_href   TEXT DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Courses Table ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.courses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id    UUID NOT NULL REFERENCES public.training_programs(id) ON DELETE CASCADE,
  title         TEXT NOT NULL DEFAULT '',
  title_ar      TEXT NOT NULL DEFAULT '',
  description   TEXT DEFAULT '',
  description_ar TEXT DEFAULT '',
  image_url     TEXT DEFAULT '',
  duration      TEXT DEFAULT '',
  level         TEXT DEFAULT '' CHECK (level IN ('', 'beginner', 'intermediate', 'advanced')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_courses_program ON public.courses(program_id);

-- ─── Auto-update updated_at triggers ─────────────────────────────────────────
DROP TRIGGER IF EXISTS training_programs_updated_at ON public.training_programs;
CREATE TRIGGER training_programs_updated_at
  BEFORE UPDATE ON public.training_programs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS courses_updated_at ON public.courses;
CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Training Programs: public read, authenticated write
CREATE POLICY "Public can read training programs"
  ON public.training_programs FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert training programs"
  ON public.training_programs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update training programs"
  ON public.training_programs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete training programs"
  ON public.training_programs FOR DELETE
  TO authenticated
  USING (true);

-- Courses: public read, authenticated write
CREATE POLICY "Public can read courses"
  ON public.courses FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert courses"
  ON public.courses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update courses"
  ON public.courses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete courses"
  ON public.courses FOR DELETE
  TO authenticated
  USING (true);

-- ─── Seed example article (optional) ─────────────────────────────────────────
-- INSERT INTO public.articles (title, title_ar, slug, excerpt, excerpt_ar, content, content_ar, category, category_ar, author, author_ar, status, published_at)
-- VALUES (
--   'Welcome to Anoon Blog',
--   'مرحبًا بك في مدونة أنون',
--   'welcome-to-anoon-blog',
--   'This is our first article.',
--   'هذا أول مقال لنا.',
--   '<p>Full content goes here.</p>',
--   '<p>المحتوى الكامل هنا.</p>',
--   'Technology',
--   'تقنية',
--   'Anoon Team',
--   'فريق أنون',
--   'published',
--   NOW()
-- );
