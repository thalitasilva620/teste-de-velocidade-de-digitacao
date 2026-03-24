import type { Difficulty, Passage } from "../types";

import data from '../data/data.json'

export function getRandomPassage (
    difficulty: Difficulty,
    excludeId?: string
): Passage {
    const pool = data[difficulty] as Passage[]

    const filtered = excludeId && pool.length > 1 ? pool.filter(p => p.id !== excludeId) : pool

    const randomIndex = Math.floor(Math.random() * filtered.length)
    return filtered[randomIndex]
}