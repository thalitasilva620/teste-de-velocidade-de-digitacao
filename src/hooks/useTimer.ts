import { useCallback, useEffect, useRef, useState } from "react";

interface useTimerReturn {
    time: number;
    isRunning: boolean;
    start: () => void
    stop: () => void
    reset: () => void
}

export function useTimer((mode: TestMode, onExpire: () => void): useTimerReturn) {

    const initialTime = mode === 'timed' ? TIMED_DURATION : 0
    const [time, setTime] = useState(initialTime)
    const [isRunning, setIsRunning] = useState(false)

    const intervalRef = useRef<returnType<typeof setInterval | null>(null)

    const onExpireRef = useRef(onExpire)
    useEffect(() => {
        onExpireRef.current = onExpireRef
    }, [onExpire])

    useEffect(() => {
        reset()
    }, [mode])

    useEffect(() => {
        
        if (!isRunning) return

        intervalRef.current = setInterval(() => {
            setTime(prev => {

                if (mode === 'timed') {

                    if (prev <= 1) {
                        clearInterval(intervalRef.current!)
                        setIsRunning(false)
                        onExpireRef.current()
                        return 0
                    }
                    return prev - 1
                }
                return prev + 1
            })
        }, 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning, mode])

    const start = useCallback(() => {
        setIsRunning(true)
    }, [])

    const stop = useCallback(() => {
        setIsRunning(false)
    }, [])

    const reset = useCallback(() => {
        setIsRunning(false)

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setTime(mode === 'timed' ? TIMED_DURATION : 0)
    }, [mode])

    return { time, isRunnig, start, stop, reset }
}