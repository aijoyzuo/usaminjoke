import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nkxzidlazliegeorphia.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5reHppZGxhemxpZWdlb3JwaGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzg1MDcsImV4cCI6MjA5NDY1NDUwN30.IWjo0ZtBLDw_VjyifIScc0OgUof22-WRO3E7Bpc8UNI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)