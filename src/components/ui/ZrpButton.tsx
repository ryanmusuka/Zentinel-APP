// This interface defines the shape/blueprint of the data this button component accepts
interface ZrpButtonProps {
    text: string;
    onClick?: () => void; // A function that gets called when the button is clicked
    variant?: "primary" | "secondary" | "danger";
}

export default function ZrpButton ({ text, onClick, variant="primary" }: ZrpButtonProps) {
    // Logic to swap colors based on variant
    let bgClass = "bg-zrp-navy text-white"; // Default to primary navy" ;
    if (variant == "danger") {
        bgClass = "bg-zrp-red text-white"; // Red for impound
    }
    return (
        <button 
            onClick={onClick}
            className={`${bgClass}
        w-full 
        p-4 
        text-lg 
        font-bold 
        uppercase 
        tracking-wide /* Spreads letters out slightly */
        hover:opacity-90 
        transition-all
      `}
      >{text}</button>
     );

}