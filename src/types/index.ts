export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Passage {
    id: string;
    text: string;
}

export type TestMode = 'timed' | 'passage'

export type TestStatus = 'idle' | 'running' | 'finished'

export type CharStatus = 'pending' | 'correct' | 'incorrect'

export interface CharState {
    char: string;
    status: CharStatus
}

export interface TypingStats {
    wpm: number;
    accuracy: number;
    time: number;
    correctChars: number;
    incorrectChars: number;
}

export type ResultType = 'baseline' | 'highscore' | 'complete'

export interface TestResult {
    wpm: number;
    accuracy: number;
    correctChars: number;
    incorrectChars: number;
    resultType: ResultType
}

export interface PersonalBest {
    wpm: number;
}