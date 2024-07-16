import {createClient} from "@supabase/supabase-js";

export const supabaseSession = createClient(
    "https://ynnxablyssvpuufbvgxq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlubnhhYmx5c3N2cHV1ZmJ2Z3hxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTExMjY4NCwiZXhwIjoyMDM2Njg4Njg0fQ.12N-bHeI81IS17HTuBZoqXalY6jTYmNogv_0y-Pq_Kc"
)