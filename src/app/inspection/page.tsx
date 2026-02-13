"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- ZRP STATUTORY INSPECTION CHECKLIST ---
// Cleaned up labels: Removed redundant "Missing/Defective" text
const INSPECTION_CATEGORIES = [
  {
    title: "EMERGENCY EQUIPMENT",
    items: [
      { id: "EQ_TRIANGLES", label: "Warning Triangles (2)" },
      { id: "EQ_EXTINGUISHER", label: "Fire Extinguisher" },
      { id: "EQ_SPARE", label: "Spare Wheel / Jack / Spanner" },
      { id: "EQ_REFLECTORS", label: "Reflectors (Front / Rear / Side)" },
    ]
  },
  {
    title: "LIGHTING & ELECTRICAL",
    items: [
      { id: "LT_HEADLIGHTS", label: "Headlights (Dim / Bright)" },
      { id: "LT_BRAKE", label: "Brake & Tail Lights" },
      { id: "LT_INDICATORS", label: "Turn Signals / Indicators" },
      { id: "LT_PLATE", label: "Number Plate Light" },
      { id: "LT_HORN", label: "Horn / Hooter" },
    ]
  },
  {
    title: "BODY & MECHANICAL",
    items: [
      { id: "BD_TIRES", label: "Tires (Canvas visible / Tread < 1mm)" },
      { id: "BD_WINDSCREEN", label: "Windscreen (Shattered / Deep Cracks)" },
      { id: "BD_WIPERS", label: "Windscreen Wipers" },
      { id: "BD_EXHAUST", label: "Exhaust System (Loud / Leaking)" },
    ]
  }
];

export default function InspectionPage() {
  const router = useRouter();
  
  // State to track which defects have been selected
  const [defects, setDefects] = useState<string[]>([]);

  // Toggle a defect on or off
  const toggleDefect = (id: string) => {
    setDefects(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) // Remove if already selected
        : [...prev, id] // Add if not selected
    );
  };

  const handleComplete = () => {
    if (defects.length === 0) {
      console.log("Vehicle Cleared. Returning to dashboard...");
      router.push("/dashboard");
    } else {
      console.log(`Generating Ticket for ${defects.length} offenses...`, defects);
      // Route to Form 265
      router.push("/ticket"); 
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F2F5] pb-32">
      {/* HEADER */}
      <div className="bg-zrp-navy p-6 shadow-md sticky top-0 z-10">
        <h1 className="text-white text-2xl font-black uppercase tracking-widest text-center">
          Vehicle Inspection
        </h1>
        <p className="text-gray-300 text-sm text-center font-medium mt-1 uppercase">
          Select <span className="text-red-400 font-bold">MISSING</span> or <span className="text-red-400 font-bold">DEFECTIVE</span> items only
        </p>
      </div>

      <div className="max-w-lg mx-auto p-4 flex flex-col gap-8 mt-4">
        
        {INSPECTION_CATEGORIES.map((category) => (
          <div key={category.title} className="flex flex-col gap-3">
            <h2 className="text-gray-500 font-black text-sm uppercase tracking-widest border-b-2 border-gray-300 pb-1">
              {category.title}
            </h2>

            <div className="flex flex-col gap-3">
              {category.items.map((item) => {
                const isSelected = defects.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleDefect(item.id)}
                    className={`
                      flex items-center justify-between p-5 border-[3px] transition-all cursor-pointer active:scale-[0.98]
                      ${isSelected 
                        ? 'bg-[#fff0f0] border-[#c23628] shadow-sm' 
                        : 'bg-white border-gray-300 shadow-sm'}
                    `}
                  >
                    <span className={`text-lg font-bold leading-tight pr-4 ${isSelected ? 'text-[#c23628]' : 'text-gray-800'}`}>
                      {item.label}
                    </span>
                    
                    <div className={`
                      w-10 h-10 flex-shrink-0 flex items-center justify-center border-[3px]
                      ${isSelected ? 'bg-[#c23628] border-[#c23628]' : 'bg-gray-100 border-gray-400'}
                    `}>
                      {isSelected && (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-gray-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-lg mx-auto flex gap-4">
          <button 
            onClick={() => router.back()}
            className="px-6 py-4 bg-gray-200 text-gray-700 font-bold text-lg uppercase border-[3px] border-gray-300 active:bg-gray-300 transition-colors"
          >
            Back
          </button>
          
          <button 
            onClick={handleComplete}
            className={`
              flex-1 py-4 font-black text-lg uppercase border-[3px] transition-colors shadow-md active:scale-[0.98]
              ${defects.length === 0 
                ? 'bg-[#0f6b36] border-[#0a4a25] text-white' // Green if clear
                : 'bg-[#c23628] border-[#8c2218] text-white' // Red if defects found
              }
            `}
          >
            {defects.length === 0 ? "VEHICLE CLEAR" : `ISSUE TICKET (${defects.length})`}
          </button>
        </div>
      </div>

    </main>
  );
}