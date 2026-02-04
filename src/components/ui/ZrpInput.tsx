// This interface defines the shape/blueprint of the data this input component accepts
interface ZrpInputProps {
    label: string;
    placeholder: string;
    type?: string;
    name?: string;
}

// Next, the props are destructured so they're easier to use
export default function ZrpInput ({ label, placeholder, type="text", name}: ZrpInputProps) {
    return (
        <div className="mb-5">
            <label className="block font-bold mb-2 text-lg uppercase">
                {label} 
            </label> 
            <input 
                type={type}
                name={name}
                placeholder={placeholder} 
                className="w-full p-4 border-[3px] border-zrp-navy /* ZRP Navy Border */
                rounded-none /* SHARP EDGES = AUTHORITY */
                focus:outline-none focus:ring-4 focus:ring-zrp-gold /* Gold Ring on Focus */"
            />  
        </div>
    );
}