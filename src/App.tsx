import { useCallback, useEffect, useState } from "react"
import { getRandomPassage } from "./utils/passages"
import { useTypingEngine } from "./hooks/useTypingEngine"
import { usePersonalBest } from "./hooks/usePersonalBest"
import { useTimer } from "./hooks/useTimer"
import type { Difficulty, ResultType, TestMode, TestResult } from "./types"
import { Header } from "./components/Header"
import { StatsBar } from './components/StatsBar'
import { Controls } from './components/Controls'
import { TypingArea } from './components/TypingArea'
import { ResultsScreen } from './components/ResultScreen'

type TestStatus = 'idle' | 'running' | 'finished'

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('hard')
  const [mode, setMode] = useState<TestMode>('timed')
  const [passage, setPassage] = useState(() => getRandomPassage('hard'))
  const [testStatus, setTestStatus] = useState<TestStatus>('idle')
  const [testRsult, setTestResult] = useState<TestResult | null>(null)

  const { personalBest, savePersonalBest } = usePersonalBest()

  const handleTimeExpire = useCallback(() => {
    finishTest()
  }, [])

  const { time, start: startTimer, stop: stopTimer, reset: resetTime } = useTimer(
    mode,
    handleTimeExpire
  )

  const handleComplete = useCallback(() => {
    finishTest()
  }, [])

  const { chars, cursorIndex, stats, handleKeyPress, reset: resetEngine } = useTypingEngine({
    passage: passage.text,
    mode,
    time,
    onComplete: handleComplete,
  })

  function finishTest() {
    stopTimer()
    setTestStatus('finished')

    let resultType: ResultType = 'complete'

    if (!personalBest) {
      resultType = 'baseline'
      savePersonalBest(stats.wpm)
    } else if (stats.wpm > personalBest.wpm) {
      resultType = 'highscore'
      savePersonalBest(stats.wpm)
    }

    setTestResult({
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      correctChars: stats.correctChars,
      incorrectChars: stats.incorrectChars,
      resultType,
    })
  }

  function startTest() {
    if (testStatus !== 'idle') return
    setTestStatus('running')
    startTimer()
  }

  const handleRestart = useCallback(() => {
    const newPassage = getRandomPassage(difficulty, passage.id)
    setPassage(newPassage)
    resetEngine(newPassage.text)
    resetTime()
    setTestStatus('idle')
    setTestResult(null)
  }, [difficulty, passage.id, resetEngine, resetTime])

  function handleDifficultyChange(newDifficulty: Difficulty) {
    setDifficulty(newDifficulty)
    const newPassage = getRandomPassage(newDifficulty)
    setPassage(newPassage)
    resetEngine(newPassage.text)
    resetTime()
    setTestStatus('idle')
    setTestResult(null)
  }

  function handleModeChange(newMode: TestMode) {
    setMode(newMode)
    resetEngine(passage.text)
    setTestStatus('idle')
    setTestResult(null)
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'Tab') { e.preventDefault(); return }

      if (testStatus === 'idle') {
        if (e.key.length === 1 || e.key === 'Backspace') {
          startTest()
        }
        return
      }

      if (testStatus === 'running') {
        if (e.key.length === 1 || e.key === 'Backspace') {
          handleKeyPress(e.key)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [testStatus, handleKeyPress])

  return (
    <div className="app">
      <Header personalBest={personalBest} />

      <div className="w-full h-px bg-neutral-800" />
      {testStatus === 'finished' && testRsult ? (
        <ResultsScreen result={testRsult} onRestart={handleRestart} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between
                  gap-4 md:gap-0 py-4">
            <StatsBar stats={stats} mode={mode} />
            <div className="px-6 md:px-0">
              <Controls
                difficulty={difficulty}
                mode={mode}
                onDifficultyChange={handleDifficultyChange}
                onModeChange={handleModeChange}
              />
            </div>
          </div>

          <div className="w-full h-px bg-neutral-800" />

          <TypingArea
            chars={chars}
            cursorIndex={cursorIndex}
            status={testStatus}
            onStart={startTest}
            onRestart={handleRestart}
          />
        </>
      )}
    </div>

  )
}

export default App
