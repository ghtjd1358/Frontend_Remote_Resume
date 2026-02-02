import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

// Experiences CRUD
export const experiencesApi = {
    getAll: () => supabase.from('experiences').select('*').order('order_index'),
    getById: (id: string) => supabase.from('experiences').select('*').eq('id', id).single(),
    create: (data: any) => supabase.from('experiences').insert(data).select().single(),
    update: (id: string, data: any) => supabase.from('experiences').update(data).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('experiences').delete().eq('id', id),
}

// Portfolios CRUD
export const portfoliosApi = {
    getAll: () => supabase.from('portfolios').select('*').order('order_index'),
    getById: (id: string) => supabase.from('portfolios').select('*').eq('id', id).single(),
    create: (data: any) => supabase.from('portfolios').insert(data).select().single(),
    update: (id: string, data: any) => supabase.from('portfolios').update(data).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('portfolios').delete().eq('id', id),
}
