import React from "react";

interface ZrpActionBtnProps {
    text: string;
    disabled?: boolean; // Optional prop to disable the button
    loadingLabel?: string; // Optional text to show when loading
    isProcesssing?: boolean; // Flag to indicate if the action is in progress
    onClick?: () => void; // A function that gets called when the button is clicked
}

export default function ZrpActionBtn({
    text,
    disabled = false, // Default to not disabled
    loadingLabel = "Processing...", // Default loading text
    isProcesssing,
    onClick,
}: ZrpActionBtnProps) {
    return (
        <button
            onClick={onClick}
            disabled={isProcesssing} // Disable button when processing
            className={'zrp-action-btn ' + (isProcesssing ? 'cursor-not-allowed opacity-70' : 'hover:opacity-90')}
        >{isProcesssing ? loadingLabel : text}
        </button>
    )
}