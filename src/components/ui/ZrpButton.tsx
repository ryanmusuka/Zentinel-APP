import { ReactNode } from "react";

interface ZrpButtonProps {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    // Added the new variants, kept the old ones
    variant?: "primary" | "danger" | "dashboardPrimary" | "dashboardSecondary" | "outline";
    icon?: ReactNode; // Optional icon
}

export default function ZrpButton ({ text, onClick, disabled=false, variant="primary", icon }: ZrpButtonProps) {
   
    if (variant === "primary" || variant === "danger") {
        let bgClass = "bg-zrp-navy text-white"; 
        if (variant === "danger") {
            bgClass = "bg-zrp-red text-white"; // Or bg-red-600 depending on your config
        }
        return (
            <button 
                onClick={onClick}
                disabled={disabled}
                className={`${bgClass} w-full p-4 text-lg font-bold uppercase tracking-wide hover:opacity-90 transition-all flex justify-center items-center gap-3`}
            >
                {icon && <span>{icon}</span>}
                <span>{text}</span>
            </button>
        );
    }

    if (variant === "dashboardPrimary") {
        return (
            <button 
                onClick={onClick}
                disabled={disabled}
                className="w-full h-48 bg-zrp-navy border-4 border-zrp-grey text-zrp-gold rounded-lg font-black uppercase tracking-wider transition-all flex flex-col justify-center items-center gap-4 text-2xl shadow-lg active:scale-95"
            >
                {icon && <div>{icon}</div>}
                <span>{text}</span>
            </button>
        );
    }

    if (variant === "dashboardSecondary") {
        return (
            <button 
                onClick={onClick}
                disabled={disabled}
                className="w-full h-32 bg-gray-100 border-2 border-zrp-grey text-gray-600 rounded-lg font-bold uppercase tracking-wider transition-all flex flex-col justify-center items-center gap-2 text-sm hover:bg-white hover:border-zrp-gold hover:text-zrp-navy shadow-md active:scale-95"
            >
                {icon && <div>{icon}</div>}
                <span>{text}</span>
            </button>
        );
    }

    // Fallback just in case
    return <button onClick={onClick}>{text}</button>;
}