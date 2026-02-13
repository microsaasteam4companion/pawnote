-- Run this SQL in your Supabase SQL Editor to fix the "column does not exist" errors

DO $$
BEGIN
    -- Add is_pro column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_pro') THEN
        ALTER TABLE public.profiles ADD COLUMN is_pro boolean DEFAULT false;
    END IF;

    -- Add notes_remaining column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'notes_remaining') THEN
        ALTER TABLE public.profiles ADD COLUMN notes_remaining integer DEFAULT 5;
    END IF;

    -- Add streak column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'streak') THEN
        ALTER TABLE public.profiles ADD COLUMN streak integer DEFAULT 0;
    END IF;

    -- Add last_completed_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'last_completed_date') THEN
        ALTER TABLE public.profiles ADD COLUMN last_completed_date date;
    END IF;

    -- Add daily_completion column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'daily_completion') THEN
        ALTER TABLE public.profiles ADD COLUMN daily_completion jsonb DEFAULT '{}'::jsonb;
    END IF;

    -- Add daily_behavior column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'daily_behavior') THEN
        ALTER TABLE public.profiles ADD COLUMN daily_behavior jsonb DEFAULT '{}'::jsonb;
    END IF;
END $$;
