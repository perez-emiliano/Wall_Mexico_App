// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Estas llaves te las da Supabase al crear tu proyecto
const supabaseUrl = 'https://nkgfonewhlkalictheue.supabase.co';
const supabaseAnonKey = 'sb_publishable_oxJbaoaq6oVUTrK1v53tsA_mmIotAe7';

// Creamos y exportamos el cliente de conexión
export const supabase = createClient(supabaseUrl, supabaseAnonKey);