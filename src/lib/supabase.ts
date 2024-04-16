import { createClient } from '@supabase/supabase-js';
import { serviceKey, supabaseUrl } from '../constant/env';

export const supabase = createClient(supabaseUrl, serviceKey);
