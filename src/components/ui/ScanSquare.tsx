import React from 'react';
import Image from 'next/image';

interface ScanSquareProps {
    scanType: "face" | "fingerprint";
    isOpen: boolean; //should it be visible
    status: "scanning" | "success" | "failed"
}

export default function ScanSquare({ scanType, status, isOpen }: ScanSquareProps) {
    if (!isOpen) return null; // Don't render anything if not open

    // Determine border color based on status
    let borderColor = "border-zrp-grey"; // Default gray
    let bgClass = "bg-zrp-navy text-white"; // Default to primary navy" ;
     
    
    if (status === "scanning") {
        borderColor = "border-zrp-gold-animate"
        bgClass = "bg-zrp-gold text-white";
    }
    else if (status === "success") {
        borderColor = "border-green-600-animate";
        bgClass = "bg-green-600 text-white";
    }
    else if (status === "failed") {
        borderColor = "border-zrp-red-animate";
        bgClass = "bg-zrp-red text-white";
    }

    const animClass = status === "failed" ? "animate-shake" : "";

    return (
        <div className={`scan-overlay ${borderColor}`}> 
            <div className={`scan-square ${bgClass} ${animClass}`}>
                {/* 1. SCANNING STATE */}
                {status === "scanning" && (
                    <>
                      <div className="scan-ring"></div>
                      <div className="scan-icon">
                        <Image 
                            src={scanType === "face" ? "/icons/face-id-icon.svg" : "/icons/finger-print-icon.svg"}
                            alt={`${scanType} scan icon`}
                            fill
                            className="object-contain. p-4"
                            priority
                            />
                       </div>
                    </>
                )}

                {/* 2. SUCCESS STATE */}
                {status === "success" && (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <span className="text-7xl font-bold text-white mb-2">✓</span>
                    </div>
                )}
                {/* 3. FAILED STATE */}
                {status === "failed" && (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <span className="text-7xl font-bold text-white mb-2">✕</span>
                            </div>
                    )}
            </div>
            <p className="absolute mt-80 text-white font-extra-bold tracking-widest uppercase animate-pulse">
                {status === 'scanning' && `Verifying ${scanType}...`}
                {status === 'success' && 'Identity Confirmed'}
                {status === 'failed' && 'Access Denied'}
            </p>
        </div>
    );
}