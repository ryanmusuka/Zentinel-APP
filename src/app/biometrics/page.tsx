"use client"; 
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ZrpActionBtn from '../../components/ui/ZrpActionBtn';
import ScanSquare from '@/components/ui/ScanSquare';

export default function BioPage() {
  const router = useRouter();
  const [activeScan, setActiveScan] = useState<"face" | "fingerprint" | null>(null);
  const [scanStatus, setScanStatus] = useState<"scanning" | "success" | "failed">("scanning");

  const handleScan = (method: "face" | "fingerprint") => {
    setActiveScan(method);
    setScanStatus("scanning");

    // Simulate scanning process with a timeout
    setTimeout(() => {
      const isSuccess = Math.random() > 0.6; // 50% chance of success
      if (isSuccess) {
        setScanStatus("success");
        setTimeout(() => {
          router.push('/dashboard'); // Redirect to dashboard after successful scan
        }); // Show success state for 2 seconds before redirecting
      } else {
        setScanStatus("failed");
        setTimeout(() => {
          setActiveScan(null); // Reset scan state after showing failure
        }, 2000); // Show failure state for 2 seconds before allowing retry
      }
      
    }, 2000); // Simulate a 2-second scanning process
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
        <p>Restructed access: ZRP Traffic Patrol Officers Only.</p>
        <h2 className="text-green-600 font-bold">Credentials Verified</h2>
        <p className="text-sm">Complete biometric authentication to proceed...</p>
        
            <div className="mt-8">
                <ZrpActionBtn 
                    text="SCAN FACE ID"
                    loadingLabel="Verifying Face..."
                    onClick={() => handleScan('face')} 
                    isProcesssing={activeScan === "face" && scanStatus === "scanning"}
                />
            </div>
            <div className="mt-8">
                <ZrpActionBtn 
                    text="SCAN FINGERPRINT"
                    loadingLabel="Verifying Fingerprint..."
                    onClick={() => handleScan('fingerprint')} 
                    disabled={activeScan !== null} // Disable button while a scan is active
                    isProcesssing={activeScan === "fingerprint" && scanStatus === "scanning"}
                />
                </div>
        
      </div>

    </main>
  );
}