import { useEffect, useState } from 'react'
import { submitFinishedDrawing } from '../services/TurnService'
import Canvas from './canvas/Canvas'
import SubmitButton from './submit/SubmitButton'

export const enum DrawingState {
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export interface FinishedDrawing {
  base64Image: string
}

const DrawingArea = () => {
  const [drawingState, setDrawingState] = useState(DrawingState.InProgress)
  const [finishedDrawing, setFinishedDrawing] = useState<FinishedDrawing | null>(null)

  useEffect(() => {
    if (finishedDrawing) {
      submitFinishedDrawing(finishedDrawing)
    }
  }, [finishedDrawing])

  const completeDrawing = () => {
    setDrawingState(DrawingState.Completed)
  }

  return (
    <div>
      <Canvas drawingState={drawingState} setFinishedDrawing={setFinishedDrawing} />
      <SubmitButton completeDrawing={completeDrawing} />
    </div>
  )
}

export default DrawingArea
