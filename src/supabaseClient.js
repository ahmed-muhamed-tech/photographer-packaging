import { createClient } from "@supabase/supabase-js";

// بيانات الاتصال بـ Supabase - بتيجي من ملف .env.local
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// بنعمل connection واحد وبنصدره لكل الملفات اللي محتاجاه
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
