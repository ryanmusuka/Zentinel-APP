"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of an Offense
export type Offense = {
  id: string;
  label: string;
  price: number;
  code: string;
  type: 'INSPECTION' | 'TRAFFIC' | 'AI_DETECTED';
  timestamp: Date;
};

// Define the shape of our Global State
interface TicketContextType {
  vehicleVrn: string;
  setVehicleVrn: (vrn: string) => void;
  activeOffenses: Offense[];
  addOffense: (offense: Offense) => void;
  removeOffense: (id: string) => void;
  clearSession: () => void;
  totalFine: number;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [vehicleVrn, setVehicleVrn] = useState("");
  const [activeOffenses, setActiveOffenses] = useState<Offense[]>([]);

  // Helper to add an offense (preventing duplicates if needed)
  const addOffense = (offense: Offense) => {
    setActiveOffenses((prev) => {
      if (prev.find(o => o.id === offense.id)) return prev; // Avoid duplicates
      return [...prev, offense];
    });
  };

  const removeOffense = (id: string) => {
    setActiveOffenses((prev) => prev.filter((o) => o.id !== id));
  };

  const clearSession = () => {
    setVehicleVrn("");
    setActiveOffenses([]);
  };

  // Auto-calculate total
  const totalFine = activeOffenses.reduce((sum, item) => sum + item.price, 0);

  return (
    <TicketContext.Provider value={{ 
      vehicleVrn, 
      setVehicleVrn, 
      activeOffenses, 
      addOffense, 
      removeOffense, 
      clearSession,
      totalFine
    }}>
      {children}
    </TicketContext.Provider>
  );
}

// Custom Hook for easy access
export function useTicket() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
}