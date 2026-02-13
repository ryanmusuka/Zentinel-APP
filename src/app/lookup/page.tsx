"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ZrpButton from '@/components/ui/ZrpButton';
import ZrpInput from '@/components/ui/ZrpInput';

// --- 1. DATA TYPES (Based on your Data Dictionary) ---
type RiskLevel = 'GREEN' | 'ORANGE' | 'RED';

interface VehicleData {
  vrn: string;
  make: string;
  model: string;
  color: string;
  ownerName: string;
  statusCode: string;
  statusTitle: string;
  statusDesc: string;
  riskLevel: RiskLevel;
}

export default function LookupPage() {
  const router = useRouter();
  const [vrn, setVrn] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<VehicleData | null>(null);

  // --- 2. THE RISK ENGINE (Process 2.0 Simulation) ---
  const handleSearch = () => {
    if (vrn.length < 5) return;
    setIsSearching(true);
    setResult(null);

    // Simulating the API Call and "Worst-Case Priority" Logic
    setTimeout(() => {
      let mockData: VehicleData;
      const cleanVrn = vrn.replace(/\s+/g, ''); // Remove spaces for checking

      if (cleanVrn.includes('STL')) {
        // TRIGGER RED: Stolen / Wanted
        mockData = {
          vrn: vrn, make: 'Ford', model: 'Ranger', color: 'Black', ownerName: 'Giveness Mazvorotopfa',
          statusCode: 'V_STOLEN', statusTitle: 'STOLEN VEHICLE',
          statusDesc: 'ARREST & IMPOUND. Immediate detention of driver. Secure vehicle. Call Backup.',
          riskLevel: 'RED'
        };
      } else if (cleanVrn.includes('XYZ')) {
        // TRIGGER RED: Habitual Offender (Matches your Screenshot exactly)
        mockData = {
          vrn: vrn, make: 'Nissan', model: 'Sunny', color: 'White', ownerName: 'UNKNOWN',
          statusCode: 'V_WARRANT', statusTitle: 'HABITUAL OFFENDER',
          statusDesc: 'Multiple unpaid warrants.',
          riskLevel: 'RED'
        };
      } else if (cleanVrn.includes('EXP')) {
        // TRIGGER ORANGE: Expired License
        mockData = {
          vrn: vrn, make: 'Honda', model: 'Fit', color: 'Silver', ownerName: 'Josiah Chipaguramatongo',
          statusCode: 'V_EXPIRED', statusTitle: 'LICENSE EXPIRED',
          statusDesc: 'Vehicle license term has lapsed. Issue Ticket: Section 22 of Vehicle Registration Act ($20).',
          riskLevel: 'ORANGE'
        };
      } else if (cleanVrn.includes('ABC')) {
        // TRIGGER GREEN: Only explicitly known good plates are Clear
        mockData = {
          vrn: vrn, make: 'Toyota', model: 'Hilux', color: 'White', ownerName: 'Lovemore Pfugamapaso',
          statusCode: 'V_VALID', statusTitle: 'VEHICLE CLEAR',
          statusDesc: 'Vehicle compliant and up to date with regulations.',
          riskLevel: 'GREEN'
        };
      } else {
        // TRIGGER RED: NOT FOUND / UNREGISTERED (The Catch-All for unknown plates)
        mockData = {
          vrn: vrn, make: 'UNKNOWN', model: 'UNKNOWN', color: 'UNKNOWN', ownerName: 'UNKNOWN',
          statusCode: 'V_NOT_FOUND', statusTitle: 'UNREGISTERED',
          statusDesc: 'IMPOUND. VRN does not exist in database. Vehicle likely smuggled or using forged plates.',
          riskLevel: 'RED'
        };
      }

      setResult(mockData);
      setIsSearching(false);
    }, 1500); // 1.5 second simulated delay
  };

  // --- 3. DYNAMIC BANNER STYLING FOR GREEN/ORANGE ---
  const getBannerColor = (risk: RiskLevel) => {
    if (risk === 'GREEN') return 'bg-[#0f6b36]'; 
    if (risk === 'ORANGE') return 'bg-orange-500';
    return 'bg-gray-500';
  };

  return (
    <main className="min-h-screen bg-[#F0F2F5] p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-lg bg-transparent flex flex-col gap-6">
        
        {/* --- SECTION 1: IDENTIFY VEHICLE --- */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-gray-600 font-black text-lg uppercase tracking-wider mb-1">1. IDENTIFY VEHICLE</h3>
            <hr className="border-gray-400 border-t-2" />
          </div>

          <ZrpInput
                      type="text"
                      value={vrn}
                      onChange={(e) => setVrn(e.target.value.toUpperCase())}
                      placeholder="Enter Registration e.g. ABC-1234" 
                      label={''}            />

          <ZrpButton 
            text={isSearching ? "QUERYING..." : "SEARCH DATABASE"}
            disabled={vrn.length < 5 || isSearching}
            onClick={handleSearch}
            variant="primary" 
          />
        </div>

        {/* --- RESULTS SECTION --- */}
        {result && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* CONDITIONAL RENDER: IF RED, SHOW IMPOUND UI */}
            {result.riskLevel === 'RED' ? (
              <>
                {/* Red Alert Banner */}
                <div className="bg-[#c23628] border-4 border-[#8c2218] p-6 shadow-md">
                  <h2 className="text-white text-5xl font-black mb-1">
                    ALERT!
                  </h2>
                  <p className="text-white text-xl font-bold uppercase tracking-wide">
                    {result.statusTitle} - IMPOUND
                  </p>
                </div>

                {/* Impound Action Card */}
                <div className="bg-[#fff0f0] border-2 border-[#d9382e] rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
                  <h3 className="text-[#c23628] text-2xl font-black uppercase mb-3 tracking-wider">
                    Impound Required
                  </h3>
                  <p className="text-gray-800 text-base mb-6 leading-relaxed">
                    This vehicle is flagged as <span className="font-black">HIGH RISK</span>.<br/>
                    Do not issue a standard ticket. Secure the vehicle immediately.
                  </p>
                  
                  {/* Custom button to match your exact screenshot */}
                  <button 
                    onClick={() => console.log('Impound Confirmed!')}
                    className="w-full bg-[#c23628] text-white font-bold text-lg p-4 uppercase hover:bg-[#a32b1f] active:scale-95 transition-all shadow-md"
                  >
                    Confirm Impound Complete
                  </button>
                </div>
              </>
            ) : (
              /* CONDITIONAL RENDER: IF GREEN OR ORANGE, SHOW STANDARD UI */
              <>
                {/* Standard Dynamic Banner */}
                <div className={`${getBannerColor(result.riskLevel)} p-6 shadow-md`}>
                  <h2 className="text-white text-4xl font-black uppercase mb-2">
                    {result.statusTitle}
                  </h2>
                  <p className="text-white text-lg font-medium leading-tight">
                    {result.statusDesc}
                  </p>
                </div>

                {/* Vehicle Basic Info Table */}
                <div className="bg-white border border-gray-200 shadow-sm p-4">
                  <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 border-b pb-2">Vehicle Details</h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-gray-500 font-semibold uppercase">Registered Owner</div>
                    <div className="text-black font-bold text-right uppercase">{result.ownerName}</div>
                    
                    <div className="text-gray-500 font-semibold uppercase">Make & Model</div>
                    <div className="text-black font-bold text-right uppercase">{result.make} {result.model}</div>
                    
                    <div className="text-gray-500 font-semibold uppercase">Color</div>
                    <div className="text-black font-bold text-right uppercase">{result.color}</div>
                  </div>
                </div>

                {/* Section 2: Select Procedure */}
                <div className="flex flex-col gap-4 mt-2">
                  <div>
                    <h3 className="text-gray-600 font-black text-lg uppercase tracking-wider mb-1">2. SELECT PROCEDURE</h3>
                    <hr className="border-gray-400 border-t-2" />
                  </div>

                  {/* Using standard ZrpButtons for normal procedures */}
                  <ZrpButton 
                    text="RUN INSPECTION ON VEHICLE"
                    onClick={() => console.log('Starting Inspection...')}
                    variant="primary" 
                  />
                  <ZrpButton 
                    text="ISSUE TICKET FOR TRAFFIC OFFENSE"
                    onClick={() => console.log('Issuing Ticket...')}
                    variant="danger" 
                  />
                </div>
              </>
            )}

          </div>
        )}

      </div>
    </main>
  );
}