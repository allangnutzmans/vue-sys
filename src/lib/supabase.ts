import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co'; // Replace with your project URL
const supabaseAnonKey = 'your-anon-key'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
