import { useEffect, useState } from 'react'
import { getPreviousDrawing, submitFinishedDrawing } from '../services/DrawingService'
import Canvas from './canvas/Canvas'
import Sliver from './sliver/Sliver'
import SubmitButton from './submit/SubmitButton'
import './drawing-area.scss'

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
  const [previousDrawing, setPreviousDrawing] = useState<FinishedDrawing | null>(null)
  const [isReset, setIsReset] = useState<boolean>(false)

  useEffect(() => {
    const endTurnUseCase = async () => {
      if (!finishedDrawing) {
        return
      }

      await submitFinishedDrawing(finishedDrawing)
      const previousDrawing = await getPreviousDrawing()
      setPreviousDrawing(previousDrawing)
      startReset()
    }

    endTurnUseCase()
  }, [finishedDrawing])

  const completeDrawing = () => {
    setDrawingState(DrawingState.Completed)
  }

  const startReset = () => {
    setIsReset(true)
  }

  const endReset = () => {
    setIsReset(false)
    setDrawingState(DrawingState.InProgress)
  }

  return (
    <div>
      <div className="drawing-area">
        {previousDrawing ? <Sliver previousDrawing={previousDrawing} /> : null}
        <Canvas
          drawingState={drawingState}
          setFinishedDrawing={setFinishedDrawing}
          isReset={isReset}
          endReset={endReset}
        />
      </div>
      <SubmitButton completeDrawing={completeDrawing} />
    </div>
  )
}

export default DrawingArea
