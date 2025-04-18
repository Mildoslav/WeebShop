// src/components/Banner.tsx
import React from 'react';
import Image from 'next/image';

interface BannerProps {
    imageUrl: string;
    altText: string;
    title?: string; // Nepovinný titul
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}

const Banner: React.FC<BannerProps> = ({
                                           imageUrl,
                                           altText,
                                           title,
                                           subtitle,
                                           buttonText,
                                           buttonLink,
                                       }) => {
    return (
        <section className="relative w-full h-64 md:h-80 lg:h-96">
            {/* Kontejner pro Image */}
            <div className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-4">
                {title && (
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl mb-4">
                        {subtitle}
                    </p>
                )}
                {buttonText && buttonLink && (
                    <a
                        href={buttonLink}
                        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </section>
    );
};

export default Banner;