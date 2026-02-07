import { supabase } from './supabase'

const INTERNAL_DOMAIN = "@zrp.internal"; 

export async function loginWithForceNumber(officerId: string, password: string) {
  // 1. Construct the email
  const systemEmail = `${officerId.trim()}${INTERNAL_DOMAIN}`;
  
  // DEBUG LOGS (Check your browser console!)
  console.log("--- DEBUG LOGIN ATTEMPT ---");
  console.log("Officer ID:", officerId);
  console.log("Generated Email:", systemEmail);
  console.log("Password Length:", password.length);

  // 2. Attempt Login
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: systemEmail,
    password: password,
  });

  // 3. Handle Errors
  if (authError) {
    console.error("🚨 SUPABASE AUTH ERROR:", authError.message);
    throw new Error(authError.message); // Throw the REAL error message
  }

  return authData.user;
}

export async function verifyBiometricAvailability(userId: string) {
  const { data: officer, error } = await supabase
    .from('users')
    .select('Biometric_Ref_ID, Full_Name, Rank, Officer_ID') 
    .eq('auth_id', userId)
    .single();

  if (error || !officer) {
    console.error("🚨 DB LOOKUP ERROR:", error);
    throw new Error("Officer record not found in public database.");
  }
  
  if (!officer.Biometric_Ref_ID) {
    throw new Error("No biometrics registered for this officer.");
  }
  
  return officer;
} 