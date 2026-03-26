import { useEffect, useRef } from "react"
import type { TestResult } from "../../types"
import iconChecked from '../../assets/images/icon-completed.svg'
import iconParty from '../../assets/images/icon-new-pb.svg'
import iconRedStar from '../../assets/images/pattern-star-2.svg'
import iconYellowStar from '../../assets/images/pattern-star-1.svg'
import iconAction from '../../assets/images/icon-restart.svg'

interface ResultsScreenProps {
    result: TestResult 
    onRestart: () => void
}

const RESULT_CONFIG = {
    baseline: {
        title: 'Linha de base estabelecida!',
        subtitle: "Você definiu o padrão. Agora começa o verdadeiro desafio: é hora de vencê-lo.",
        buttonLabel: 'Bata esta pontuação'
    },
    highscore: {
        title: 'Pontuação alta esmagada!',
        subtitle: "Você está ficando mais rápido. Foi uma digitação incrível.",
        buttonLabel: 'Bata esta pontuação'
    },
    complete: {
        title: 'Teste concluído!',
        subtitle: "Corrida sólida. Continue pressionando para bater sua pontuação mais alta.",
        buttonLabel: 'Vá de novo'
    },
}

function CheckIcon() {
    return (
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
           <img src={iconChecked} className="w-6 h-6" />
        </div>
    )
}

function PartyIcon() {
    return (
        <div className="flex items-center justify-center w-20 h-20 mb-6">
            <img src={iconParty} className="w-16 h-16" />
        </div>
    )
}

const CONFETTI_COLORS = ['#38bdf8', '#4ade80', '#f472b6', '#facc15', '#f87171']
const CONFETTI_COUNT = 80

interface ConfettiPiece {
    id: number;
    x: number;
    color: string;
    size: number;
    delay: number;
    duration: number;
    rotation: number
}

function Confetti() {
    const pieces: ConfettiPiece[] = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 360,
    }))

    return (
        <div>
            {pieces.map(piece => (
                <div 
                    key={piece.id}
                    className="absolute top-0 animate-confetti-fall"
                    style={{
                        left: `${piece.x}%`,
                        width: `${piece.size}px`,
                        height: `${piece.size * 0.5}px`,
                        backgroundColor: piece.color,
                        animationDelay: `${piece.delay}s`,
                        animationDuration: `${piece.duration}s`,
                        transform: `rotate(${piece.rotation}deg)`,
                    }}
                />
            ))}
        </div>
    )
}

function StarDecorations() {
    return (
        <>
            <img src={iconRedStar} className="absolute left-8 top-1/3 w-6 h-6 opacity-70" />

            <img src={iconYellowStar} className="absolute right-10 bottom-1/3 w-8 h-8 opacity-80" />
        </>
    )
}

interface StatsCardProps {
    label: string;
    children: React.ReactNode
}

function StatCard({ label, children }: StatsCardProps) {
    return (
        <div className="flex flex-col gap-2 px-6 py-4 rounded-xl border border-neutral-800
                    bg-neutral-900 min-w-[140px]">
            <span className="text-sm text-neutral-400">{label}</span>
            <div className="text-2xl font-bold">{children}</div>
        </div>
    )
}

export function ResultsScreen({ result, onRestart }: ResultsScreenProps) {
    const config = RESULT_CONFIG[result.resultType]
    const isHighScore = result.resultType === 'highscore'

    const btnRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        btnRef.current?.focus()
    }, [])

    return (
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden">
            {isHighScore && <Confetti />}
            <StarDecorations />

            <div className="relative z-10 flex flex-col items-center">
                {isHighScore ? <PartyIcon /> : <CheckIcon />}

                <h2 className="text-3xl md:text-4xl font-bold text-neutral-0 mb-3">
                    {config.title}
                </h2>

                <p className="text-sm text-neutral-400 max-w-sm mb-10">
                    {config.subtitle}
                </p>

                <div>
                    <StatCard label="WPM:">
                        <span className="text-neutral-0">{result.wpm}</span>
                    </StatCard>

                    <StatCard label="Accuracy:">
                        <span className={result.accuracy >= 90 ? 'text-green-500' : 'text-red-500'}>
                            {result.accuracy}%
                        </span>
                    </StatCard>

                    <StatCard label="Characters">
                        <span>
                            <span className="text-green-500">{result.correctChars}</span>
                            <span className="text-neutral-500">/</span>
                            <span className="text-red-500">{result.incorrectChars}</span>
                        </span>
                    </StatCard>
                </div>

                <button
                    ref={btnRef}
                    onClick={onRestart}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl border border-neutral-0
                            bg-transparent text-neutral-0 font-semibold text-base hover:bg-neutral-0 hover:text-neutral-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-0 focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                    {config.buttonLabel} 
                    <img src={iconAction} className="w-4 h-4" />  
                </button>
            </div>
        </div>
    )
}