/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Direct client access
import { verifyBiometricAvailability } from '@/lib/auth';
import ZrpActionBtn from '../../components/ui/ZrpActionBtn'; // Check your path
import ScanSquare from '@/components/ui/ScanSquare'; // Check your path

export default function BioPage() {
  const router = useRouter();
  const [activeScan, setActiveScan] = useState<"face" | "fingerprint" | null>(null);
  const [scanStatus, setScanStatus] = useState<"scanning" | "success" | "failed">("scanning");
  const [user, setUser] = useState<any>(null);
  const [officerName, setOfficerName] = useState(""); // ADDED THIS

  // 1. SECURITY CHECK: Kick them out if they skipped the login page
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/'); // Go back to login
      } else {
        setUser(session.user);
        
        // --- FETCH NAME ---
        const { data } = await supabase
          .from('users')
          .select('Full_Name')
          .eq('auth_id', session.user.id)
          .single();
          
        if (data) setOfficerName(data.Full_Name);
        
      }
    };
    checkSession();
  }, [router]);

  // 2. The Real Scan Logic
  const handleScan = async (method: "face" | "fingerprint") => {
    if (!user) return;
    
    setActiveScan(method);
    setScanStatus("scanning");

    try {
      // A. Verify the user exists in DB and has biometrics set up
      await verifyBiometricAvailability(user.id);

      // B. Simulate the hardware scan delay (2 seconds)
      setTimeout(() => {
        // Success!
        setScanStatus("success");
        setTimeout(() => {
          router.push('/dashboard'); 
        }, 1000); 
      }, 2000);

    } catch (err) {
      // Failed (User has no biometrics or DB error)
      console.error(err);
      setScanStatus("failed");
      setTimeout(() => setActiveScan(null), 2000);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center p-8 max-w-md mx-auto items-center text-center">
      
      <ScanSquare
        scanType={activeScan === "face" ? "face" : "fingerprint"}
        status={scanStatus}
        isOpen={activeScan !== null}
      />
      
      <div className="login-panel">
        <div className="crest-placeholder">ZRP</div>
        <h1>OFFICER LOGIN</h1>
        <p>Restricted access: ZRP Traffic Patrol Officers Only.</p>
        
            <h2 className="text-green-600 font-bold mt-4">Credentials Verified</h2>
        
        <p className="text-sm text-gray-500 mt-2">Welcome {officerName} Complete biometric authentication to proceed...</p>
        
        <div className="mt-8 space-y-4">
            <ZrpActionBtn 
                text="SCAN FACE ID"
                loadingLabel="Verifying Face..."
                onClick={() => handleScan('face')} 
                isProcesssing={activeScan === "face" && scanStatus === "scanning"}
                disabled={activeScan !== null}
            />
            
            <ZrpActionBtn 
                text="SCAN FINGERPRINT"
                loadingLabel="Verifying Fingerprint..."
                onClick={() => handleScan('fingerprint')} 
                disabled={activeScan !== null} 
                isProcesssing={activeScan === "fingerprint" && scanStatus === "scanning"}
            />
        </div>
      </div>

    </main>
  );
}