import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_KEY || '';

export const supabase = url && key ? createClient(url, key) : null;

export async function dbInsert(table, values) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from(table).insert(values).select();
  if (error) throw error;
  return data;
}

export async function dbSelect(table, query = '*', filters = (q) => q) {
  if (!supabase) throw new Error('Supabase not configured');
  let q = supabase.from(table).select(query);
  q = filters(q);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function dbUpdate(table, values, filters = (q) => q) {
  if (!supabase) throw new Error('Supabase not configured');
  let q = supabase.from(table).update(values);
  q = filters(q);
  const { data, error } = await q.select();
  if (error) throw error;
  return data;
}

export async function dbDelete(table, filters = (q) => q) {
  if (!supabase) throw new Error('Supabase not configured');
  let q = supabase.from(table).delete();
  q = filters(q);
  const { data, error } = await q.select();
  if (error) throw error;
  return data;
}

