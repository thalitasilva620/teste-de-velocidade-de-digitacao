import type { TestMode, TypingStats } from "../../types";

interface StatsBarProps {
    stats: TypingStats;
    mode: TestMode
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function StatsBar({ stats, mode }: StatsBarProps) {
    const timeIsLow = mode === 'timed' && stats.time <= 10 && stats.time > 0

    return (
        <div className="flex items-center gap-6 px-6 md:px-10 py-4">
            <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-400">WPM:</span>
                <span className="text-base font-bold text-neutral-0">{stats.wpm}</span>
            </div>

            <div className="w-px h-4 bg-neutral-800" />

            <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-400">Accuracy:</span>
                <span
                    className={`text-base font-bold ${stats.accuracy === 100 ? 'text-neutral-0' : stats.accuracy >= 90 ? 'text-neutral-0' : 'text-red-500'}`}
                >
                  {stats.accuracy}%
                </span>
            </div>

            <div className="w-px h-4 bg-neutral-800" />

            <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-400">Time:</span>
                <span
                 className={`text-base fonrt-bold transition-colors duration-300 ${
                    timeIsLow ? 'text-yellow-400' : 'text-neutral-0'
                 }`}
                >
                    {formatTime(stats.time)}
                </span>
            </div>
        </div>

         
    )
}