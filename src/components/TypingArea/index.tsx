import type { CharState } from "../../types";
import iconRestart from '../../assets/images/icon-restart.svg'

interface TypingAreaProps {
    chars: CharState[]
    cursorIndex: number
    status: 'idle' | 'running' | 'finished'
    onStart: () => void
    onRestart: () => void
}

export function TypingArea({
    chars,
    cursorIndex,
    status,
    onStart,
    onRestart,
}: TypingAreaProps) {
    return (
        <div className="relative flex-1 px-6 md:px-10 py-8">
            <div
                className={`relative text-2xl md:text-3xl leading-relaxed font-medium tracking-wide cursor-text select-none transition-all duration-300 ${status === 'idle' ? 'blur-sm' : ''}`}
                onClick={status === 'idle' ? onStart : undefined}
            >
                {chars.map((charState, index) => (
                    <span
                        key={index}
                        className={`relative transition-colors duration-75 ${
                            charState.status === 'correct' ? 'text-green-500' : charState.status === 'incorrect' ? 'text-red-500 underline underline-offset-4' : 'text-neutral-500'
                        }`}
                    >
                        {index === cursorIndex && status === 'running' && (
                            <span 
                                className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-neutral-400 animate-pulse"
                                aria-hidden="true"
                            />
                        )}
                        {charState.char}
                    </span>
                ))}
            </div>

            {status === 'idle' && (
                <div>
                    <button
                        onClick={onStart}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-400 text-neutral-0 font-semibold text-base rounded-xl transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900"
                    >
                        Comece o teste de digitação
                    </button>
                    <p className="text-sm font-semibold text-neutral-0">
                        Ou clique no texto e comece a digitar
                    </p>
                </div>
            )}

            {status === 'running' && (
                <div className="mt-10 flex flex-col items-center gap-4">
                    <div className="w-full h-px bg-neutral-800" />
                    <button
                        onClick={onRestart}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-0 font-semibold text-sm transition-colors duration-200 focus:outiline-none focus:rung-2 focus:ring-neutral-500 focus:rung=offset-2 focus:ring-offset-neutral-900"
                    >
                        Reiniciar teste
                        <img src={iconRestart} className="w-4 h-4"/>
                    </button>
                </div>
            )}
        </div>
    )
}