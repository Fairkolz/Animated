-- =============================================
-- AUVERER Newsletter Subscribers Table
-- Run this AFTER 002_rls_policies.sql
-- =============================================

-- This table is already created in 001_create_tables.sql
-- This file exists as a reference for the subscribers table schema

-- Table: public.subscribers
-- Columns:
--   id uuid (primary key, auto-generated)
--   email text (unique, not null)
--   is_active boolean (default true)
--   created_at timestamptz (default now())
--   unsubscribed_at timestamptz

-- RLS Policies:
--   - Anyone can subscribe (insert)
--   - Users can view own subscription (select)
--   - Users can unsubscribe (update)
--   - Admins can view all subscribers (select)
