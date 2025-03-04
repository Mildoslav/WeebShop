import React from 'react';
import Image from "next/image";
import {Theme} from "@/utils/types";

interface ThemeCardProps {
    theme: Theme;
    imageUrl: string;
    imageAlt: string;
    className?: string;
    onClick?: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
                                                 theme,
                                                 imageUrl,
                                                 imageAlt,
                                                 className = '',
                                                 onClick
                                             }) => {
    return (
        <div
            className={`rounded-lg shadow-md overflow-hidden  ${className}`}
            onClick={onClick}
        >
            <div className="relative h-64 w-64">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    style={{ objectFit: 'cover' }}
                    priority
                    // height={48}
                    // width={48}
                    fill
                />
            </div>
            <div className="p-4">
                <h1 className="text-xl font-bold">{theme.name}</h1>
            </div>
        </div>
    );
}

export default ThemeCard;
