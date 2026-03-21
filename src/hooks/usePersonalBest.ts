import { useEffect, useState } from "react";
import type{ PersonalBest } from "../types";

export function usePersonalBest() {
    const [personalBest, setPersonalBest] = useState<PersonalBest | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)

        if (stored) {
            const parsed: PersonalBest = JSON.parse(stored);

            setPersonalBest(parsed);
        }
    }, [])

    const savePersonalBest = (wpm: number) => {
        
        const newBest: PersonalBest = { wpm }

        setPersonalBest(newBest);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBest))
    }

    return { personalBest, savePersonalBest }
}
