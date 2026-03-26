import { useEffect, useRef, useState } from "react";
import type { Difficulty, TestMode } from "../../types";
import iconDownArrow from '../../assets/images/icon-down-arrow.svg'

interface ControlsProps {
    difficulty: Difficulty;
    mode: TestMode;
    onDifficultyChange: (d: Difficulty) => void
    onModeChange: (m: TestMode) => void
}

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
]

const MODES: { value: TestMode; label: string }[] = [
    { value: 'timed', label: 'Timed (60s)' },
    { value: 'passage', label: 'Passage' },
]

interface DropdownProps<T extends string> {
    options: { value: T; label: string }[]
    selected: T
    onChange: (value: T) => void
}

function Dropdown<T extends string>({ options, selected, onChange }: DropdownProps<T>) {

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const selectedLabel = options.find(o => o.value === selected)?.label

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-800
                    bg-neutral-900 text-neutral-0 text-sm font-medium w-full hover:border-neutral-500 transition-colors duration-200 focus:outiline-none focus:border-blue-400"
            >
                <img src={iconDownArrow} className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}/>
                <span className="flex-1 text-left">{selectedLabel}</span>
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-1 w-full z-50 bg-neutral-700 rounded-lg over-flow-hidden shandow-lg">
                    {options.map(option => (
                        <label
                            key={option.value}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-700 transition-colors duration-150"
                        >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                                transition-colors duration-150 ${selected === option.value ? 'border-blue-400' : 'border-neutral-500'
                                }`}>
                                {selected === option.value && (
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                )}
                            </div>
                            <span className="text-sm text-neutral-0">{option.label}</span>

                            <input
                                type="radio"
                                className="sr-only"
                                checked={selected === option.value}
                                onChange={() => {
                                    onChange(option.value)
                                    setOpen(false)
                                }}
                            />
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

interface ButtonGroupProps<T extends string> {
    options: { value: T; label: string}[]
    selected: T
    onChange: (value: T) => void
}

function ButtonGroup<T extends string>({ options, selected, onChange }: ButtonGroupProps<T>) {
    return (
        <div className="felc items-center gap-1">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
                        focus:ring-offset-neutral-900 ${
                            selected === option.value ? 'border-blue-600 text-neutral-0' : 'border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-neutral-0'
                        }`}
                >
                    {option.label}
                </button>
            ))}

        </div>
    )
}

export function Controls({
    difficulty,
    mode,
    onDifficultyChange,
    onModeChange,
}: ControlsProps) {
    return (
        <>
            <div className="hidden md:flex items-center gap-4 px-10">

                <span className="text-sm text-neutral-400">Difficulty:</span>
                <ButtonGroup
                    options={DIFFICULTIES}
                    selected={difficulty}
                    onChange={onDifficultyChange}
                />

                <div className="w-px h-4 bg-neutral-800 mx-2" />

                <span className="text-sm text-neutral-400">Mode:</span>
                <ButtonGroup
                    options={MODES}
                    selected={mode}
                    onChange={onModeChange}
                />
            </div>

            <div className="flex md:hidden items-center gap-3 px-6">
                <div className="flex-1">
                    <Dropdown
                        options={DIFFICULTIES}
                        selected={difficulty}
                        onChange={onDifficultyChange}
                    />
                </div>
            </div>

            <div className="flex-1">
                <Dropdown
                    options={MODES}
                    selected={mode}
                    onChange={onModeChange}
                />
            </div>
        </>
    )
}