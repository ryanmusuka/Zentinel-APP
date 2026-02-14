"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTicket } from '@/components/tickets/TicketContext'; 

export default function TicketPage() {
  const router = useRouter();
  
  // READ DATA FROM GLOBAL STATE
  const { activeOffenses, totalFine, removeOffense } = useTicket(); 

  return (
    <main className="min-h-screen bg-[#F0F2F5] pb-32">
      <div className="bg-zrp-navy p-6 shadow-md">
        <h1 className="text-white text-2xl font-black uppercase tracking-widest text-center">
          Form 265 Summary
        </h1>
      </div>

      <div className="max-w-lg mx-auto p-4 mt-4">
        <div className="bg-white border-[3px] border-gray-300 shadow-sm">
          
          <div className="bg-gray-100 p-4 border-b-2 border-gray-200 flex justify-between items-center">
             <span className="font-bold text-gray-500 text-sm">TICKET ID: #88291</span>
             <span className="font-bold text-gray-500 text-sm">DATE: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="divide-y divide-gray-200">
            {activeOffenses.length === 0 ? (
              <div className="p-8 text-center text-gray-400 font-bold italic">
                No offenses recorded.
              </div>
            ) : (
              activeOffenses.map((offense) => (
                <div key={offense.id} className="p-4 flex justify-between items-center group">
                  <div>
                    <h3 className="font-bold text-gray-800 uppercase text-sm">{offense.label}</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      {offense.code} • {offense.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xl text-gray-900">${offense.price}</span>
                    {/* Allow removing an item here too */}
                    <button 
                      onClick={() => removeOffense(offense.id)}
                      className="text-red-400 font-bold text-xs border border-red-200 px-2 py-1 rounded hover:bg-red-50"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
            <span className="text-lg font-medium tracking-widest uppercase">Total Fine</span>
            <span className="text-4xl font-black text-yellow-400">${totalFine}.00</span>
          </div>
        </div>

        <button 
           className="w-full mt-6 py-4 border-2 border-dashed border-gray-400 text-gray-500 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
           onClick={() => router.push("/offense")} // Go to traffic offense list
        >
          + Add Traffic Offense
        </button>
      </div>

      {/* CONFIRMATION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-gray-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-lg mx-auto flex gap-4">
          <button 
            onClick={() => router.back()}
            className="px-6 py-4 bg-gray-200 text-gray-700 font-bold text-lg uppercase border-[3px] border-gray-300 active:bg-gray-300 transition-colors"
          >
            Back
          </button>
          
          <button 
            className="flex-1 py-4 bg-zrp-gold text-zrp-navy font-black text-lg uppercase border-[3px] border-[#d4af37] shadow-md active:scale-[0.98]"
            onClick={() => alert("Submitting to ZINARA Database...")}
          >
            Confirm & Print
          </button>
        </div>
      </div>
    </main>
  );
}