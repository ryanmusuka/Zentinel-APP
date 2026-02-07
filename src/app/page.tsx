/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithForceNumber } from '@/lib/auth'; // Import our logic
import ZrpButton from '../components/ui/ZrpButton';
import ZrpInput from '../components/ui/ZrpInput';

export default function Home() {
  const router = useRouter();
  
  // 1. Local State (Renamed 'forceId' to 'officerId' to match DB, but works the same)
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. Handle Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page reload
    setError("");
    setLoading(true);

    try {
      // Pass the updated 'officerId' variable
      await loginWithForceNumber(officerId, password);
      
      // If no error thrown, we are logged in!
      // Move to Step 2: Biometrics
      router.push('/biometrics'); 
      
    } catch (err: any) {
      setError(err.message); // Show "Invalid Password" etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center p-8 max-w-md mx-auto items-center text-center">
      
      <div className="login-panel">
        <div className="crest-placeholder">ZRP</div>
        <h1>OFFICER LOGIN</h1>
        <p>Restricted access: ZRP Traffic Patrol Officers Only.</p>
        
        {/* Error Message Display */}
        {error && <p className="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">{error}</p>}

        <form onSubmit={handleLogin} className="mt-8 w-full max-w-md">
            <ZrpInput 
              label="Force Number" // LABEL KEPT AS REQUESTED
              placeholder="Enter Force Number" 
              value={officerId} // Bound to new state name
              onChange={(e: any) => setOfficerId(e.target.value)}
            />
            
            <ZrpInput 
              label="Password" 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
        
            <div className="mt-8">
                <ZrpButton 
                  text={loading ? "VERIFYING..." : "VERIFY CREDENTIALS"} 
                  disabled={loading}
                />
            </div>
        </form>
      </div>

    </main>
  );
}