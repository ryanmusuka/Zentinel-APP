"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HeaderStatus() {
  const [officerName, setOfficerName] = useState<string | null>(null);

  useEffect(() => {
    // 1. Function to fetch the name from public.users
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from("users")
        .select("Full_Name")
        .eq("auth_id", userId)
        .single();
        
      if (data) setOfficerName(data.Full_Name);
    };

    // 2. Check if already logged in on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchProfile(session.user.id);
    });

    // 3. Listen for logins and logouts in real-time
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          fetchProfile(session.user.id);
        } else {
          setOfficerName(null); // Clear name on logout
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ONLINE STATE
  if (officerName) {
    return (
      <div className="flex items-center space-x-3 bg-[#00000040] px-4 py-2 border border-gray-700">
        <span className="h-3 w-3 rounded-full bg-green-500"></span>
        <span className="font-mono text-sm tracking-wider uppercase text-white">
          ONLINE - {officerName}
        </span>
      </div>
    );
  }

  // OFFLINE STATE (Your exact original code)
  return (
    <div className="hidden md:flex items-center space-x-3 bg-[#00000040] px-4 py-2 border border-gray-700">
      <span className="h-3 w-3 rounded-full bg-red-500"></span>
      <span className="font-mono text-sm tracking-wider uppercase text-white">
        OFFLINE
      </span>
    </div>
  );
}