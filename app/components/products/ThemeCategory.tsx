import React from 'react';
import ThemeCard from "@/app/components/products/cards/ThemeCard";
import {Theme} from "@/utils/types";

// Example theme data - you can replace this with your actual data source
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

function ThemeCategory() {
    return (
        <div className="flex justify-center gap-4 px-4 pt-8">
            {themes.map((theme) => (
                <ThemeCard
                    key={theme.id}
                    theme={theme}
                    imageUrl={theme.image}
                    imageAlt={`${theme.name} preview`}
                    className="transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
                />
            ))}
        </div>
    );
}

export default ThemeCategory;
