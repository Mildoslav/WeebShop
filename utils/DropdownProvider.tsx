"use client"
import React, {createContext, useContext, useState} from 'react';

type DropdownContextType = {
    openDropdown: string | null;
    setOpenDropdown: (id: string | null) => void;
};

const DropdownContext = createContext<DropdownContextType>({
    openDropdown: null,
    setOpenDropdown: () => {},
});

export function DropdownProvider({ children }: { children: React.ReactNode }) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>
            {children}
        </DropdownContext.Provider>
    );
}

export const useDropdown = () => useContext(DropdownContext);
