import { createClient } from '@supabase/supabase-js';

// Usando as variáveis de ambiente definidas no arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Criando o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
