"use strict";

/*
 * =====================================================
 * SATORII · SUPABASE
 * =====================================================
 */

const SUPABASE_URL =
    "https://xwhfvcbeoyjpgcmvqcub.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Yk1bauVwN8d5hByxPqBk-Q_hmly-XQV";


const satoriSupabase =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
