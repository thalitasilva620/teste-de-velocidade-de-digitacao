import { useCallback, useMemo, useState } from "react";

import type { CharState, CharStatus, TypingStats, TestMode } from '../types'

interface useTypingEngineProps {
    passage: string;
    mode: TestMode;
    time: number;
    onComplete: () => void
}

interface useTypingEngineReturn {
    chars: CharState[];
    cursorIndex: number;
    stats: TypingStats;
    handleKeyPress: (key: string) => void
    reset: (newPassage: string) => void
}

function buildCharArray(text: string): CharState[] {
    return text.split('').map(char => ({ char, status: 'pending' as CharStatus}));
}

function calculateWPM(correctChars: number, elapsedSeconds: number): number {
    if (elapsedSeconds === 0) return 0
    const minutes = elapsedSeconds / 60
    return Math.round(correctChars / 5 / minutes)
}

function calculateAccuracy(correctChars: number, totalErrors: number): number {
    const totalKeystrokes = correctChars + totalErrors

    if (totalKeystrokes === 0) return 100
    return Math.round((correctChars / totalKeystrokes) * 100)
}

export function useTypingEngine({
    passage,
    mode, 
    time,
    onComplete
}: useTypingEngineProps): useTypingEngineReturn {
    
    const [chars, setChars] = useState<CharState[]>(() => buildCharArray(passage));

    const [cursorIndex, setCursorIndex] = useState(0);

    const [totalErrors, setTotalErrors] = useState(0);

    const [correctChars, setCorrectChars] = useState(0);

    const elapsedSeconds = useMemo(() => {
        return mode === 'timed' ? 60 - time : time
    }, [mode, time])

    const stats: TypingStats = useMemo(() => ({
        wpm: calculateWPM(correctChars, elapsedSeconds),
        accuracy: calculateAccuracy(correctChars, totalErrors),
        time,
        correctChars,
        incorrectChars: totalErrors,
    }), [correctChars, totalErrors, elapsedSeconds, time])

    const handleKeyPress = useCallback((key: string) => {
        if (key === 'Backspace') {
            if (cursorIndex === 0) return

            const prevIndex = cursorIndex - 1

            setChars(prev => {
                const updated = [...prev]
                const prevChar = updated[prevIndex]

                if (prevChar.status === 'correct') {
                    setCorrectChars(c => c - 1)
                }

                updated[prevIndex] = { ...prevChar, status: 'pending' }
                return updated
            })

            setCursorIndex(prevIndex)
            return
        }
        if (cursorIndex >= chars.length) return

        const expected = chars[cursorIndex].char
        const isCorrect = key === expected
        
        setChars(prev => {
            const updated = [...prev]
            updated[cursorIndex] = {
                ...updated [cursorIndex],
                status: isCorrect ? 'correct' : 'incorrect',
            }
            return updated
        })

        if (isCorrect) {
            setCorrectChars(c => c + 1)
        }else {
            setTotalErrors(e => e + 1)
        }

        const nextIndex = cursorIndex + 1
        setCursorIndex(nextIndex)

        if (nextIndex === chars.length) {
            onComplete()
        }
    }, [cursorIndex, chars, onComplete])

    const reset = useCallback((newPassage: string) => {
        setChars(buildCharArray(newPassage))
        setCursorIndex(0);
        setTotalErrors(0);
        setCorrectChars(0);
    }, [])

    return { chars, cursorIndex, stats, handleKeyPress, reset }
}

