import React from 'react';

// This interface defines the shape/blueprint of the data this input component accepts
interface ZrpInputProps {
    label: string;
    placeholder: string;
    type?: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Next, the props are destructured so they're easier to use
export default function ZrpInput ({ 
    label, 
    placeholder, 
    type="text", 
    name,
    value,      
    onChange    
}: ZrpInputProps) {
    return (
        <div className="mb-5 text-left">
            <label className="block font-bold mb-2 text-lg uppercase text-zrp-navy">
                {label} 
            </label> 
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}       // Connected to state
                onChange={onChange} // Connected to state handler
                className="w-full p-4 border-[3px] border-zrp-navy
                rounded-none 
                focus:outline-none focus:ring-4 focus:ring-zrp-gold 
                text-black bg-white"
            />  
        </div>
    );
}