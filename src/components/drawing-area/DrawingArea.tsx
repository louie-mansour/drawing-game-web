import { useEffect, useState } from 'react'
import { getPreviousDrawingPart, submitFinishedDrawingPart } from '../../services/DrawingPartService'
import Canvas from './canvas/Canvas'
import Sliver from './sliver/Sliver'
import SubmitButton from './submit/SubmitButton'
import './drawing-area.scss'

export const enum DrawingPartState {
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export interface FinishedDrawingPart {
  base64Image: string
}

const DrawingArea = () => {
  const [drawingPartState, setDrawingPartState] = useState(DrawingPartState.InProgress)
  const [finishedDrawingPart, setFinishedDrawingPart] = useState<FinishedDrawingPart | null>(null)
  const [previousDrawingPart, setPreviousDrawingPart] = useState<FinishedDrawingPart | null>(null)
  const [isReset, setIsReset] = useState<boolean>(false)

  useEffect(() => {
    const endTurnUseCase = async () => {
      if (!finishedDrawingPart) {
        return
      }

      await submitFinishedDrawingPart(finishedDrawingPart)
      const previousDrawingPart = await getPreviousDrawingPart()
      setPreviousDrawingPart(previousDrawingPart)
      startReset()
    }

    endTurnUseCase()
  }, [finishedDrawingPart])

  const completeDrawingPart = () => {
    setDrawingPartState(DrawingPartState.Completed)
  }

  const startReset = () => {
    setIsReset(true)
  }

  const endReset = () => {
    setIsReset(false)
    setDrawingPartState(DrawingPartState.InProgress)
  }

  return (
    <div>
      <h1> Drawing Area</h1>
      <div className="drawing-area">
        {previousDrawingPart ? <Sliver previousDrawingPart={previousDrawingPart} /> : null}
        <Canvas
          drawingPartState={drawingPartState}
          setFinishedDrawingPart={setFinishedDrawingPart}
          isReset={isReset}
          endReset={endReset}
        />
      </div>
      <SubmitButton completeDrawingPart={completeDrawingPart} />
    </div>
  )
}

export default DrawingArea
