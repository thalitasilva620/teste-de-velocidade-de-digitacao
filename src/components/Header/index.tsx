import type { PersonalBest } from "../../types";
import iconSmall from '../../assets/images/logo-small.svg'
import iconPersonalBest from '../../assets/images/icon-personal-best.svg'

interface HeaderProps {
    personalBest: PersonalBest | null
}

export function Header({ personalBest }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-6 py-5 md:px-10">

            <div className="flex items-center gap-3,">
                <img src={iconSmall} alt="Teste Velocidade de Digitação logo" className="w-9 h-9" />

                <div className="flex flex-col">
                    <span className="font-bold text-base text-neutral-0 leading-tight">Teste Velocidade de Digitação</span>

                    <span className="text-xs text-neutral-500 leading-tight">Digite o mais rápido que puder em 60 segundos</span>
                </div>
            </div>

            <img src={iconPersonalBest} className="w-5 h-5" />
            <span className="text-sm text-neutral-400">Personal best:{' '}
                <span className="font-bold text-neutral-0">
                    {personalBest ? `${personalBest.wpm} WPM` : '-'}
                </span>
            </span>

        </header>
    )
}