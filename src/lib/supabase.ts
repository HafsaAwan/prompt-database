import { createClient } from '@supabase/supabase-js';

// These variables are pulled from your .env.local file.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This creates the one and only Supabase client for whole app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);