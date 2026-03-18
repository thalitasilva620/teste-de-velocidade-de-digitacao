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