"use client"
import React from 'react';
import {Theme} from "@/utils/types";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import Image from "next/image";
import "./ImageSlider.css"

const themes: Theme[] = [
    {
        id: 1,
        name: "Anime",
        image: "https://2ucczhzrfg.ufs.sh/f/04939xqzDQVfZIeWgGoLpxjubODvVKQMWohCHaIRdrFsg6cN"
    },
    {
        id: 2,
        name: "Hanime",
        image: "https://2ucczhzrfg.ufs.sh/f/04939xqzDQVfJM0dn0DaJcn34TdEyKRmIYGxlb1zgpr2MDHu"
    },
    {
        id: 3,
        name: "Hentai",
        image: "https://2ucczhzrfg.ufs.sh/f/04939xqzDQVfCEFRA7pJx9B63hRte5EFl78UvIYXHgdumi1f"
    },
    {
        id: 4,
        name: "Anime Devky",
        image: "https://2ucczhzrfg.ufs.sh/f/04939xqzDQVfuPwd4Q0fMUOStD6CF4ZrPyiBvRG3spNnH1m0"
    },
];

function ImageSlider() {
    const settings = {
        dots: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        pauseOnHover: true,
        autoplay: true,
    };

    return (
        <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden image-slider-container hidden sm:block">
            <Slider {...settings}>
                {themes.map(theme => (
                    <div key={theme.id} className="relative h-64 md:h-96">
                        <Image
                            src={theme.image}
                            alt={theme.name}
                            layout="fill"
                            style={{ objectFit: 'cover' }}
                            className="w-full h-full"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ImageSlider;