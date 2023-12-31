import { Stage, Layer, Line } from 'react-konva'
import { useState, useRef, useEffect } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { DrawingPartState, FinishedDrawingPart } from '../DrawingArea'

interface Lines {
  points: number[]
}

const Canvas = ({
  drawingPartState,
  setFinishedDrawingPart,
  isReset,
  endReset,
}: {
  drawingPartState: DrawingPartState
  setFinishedDrawingPart: (_: FinishedDrawingPart) => void
  isReset: boolean
  endReset: () => void
}) => {
  const [lines, setLines] = useState<Lines[]>([])

  const isDrawing = useRef(false)
  const stageRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    if (drawingPartState === DrawingPartState.Completed) {
      setFinishedDrawingPart({
        base64Image: stageRef.current.toDataURL(),
      })
    }
  }, [drawingPartState, setFinishedDrawingPart])

  useEffect(() => {
    if (isReset) {
      setLines([])
      stageRef.current.clearCache()
      endReset()
    }
  }, [isReset, endReset])

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true
    const pos = e.target.getStage()!.getPointerPosition()
    setLines([...lines, { points: [pos!.x, pos!.y] }])
  }

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage!.getPointerPosition()

    const lastLine = lines[lines.length - 1]

    if (lastLine) {
      lastLine.points = lastLine.points.concat([point!.x, point!.y])
      lines.splice(lines.length - 1, 1, lastLine)
      setLines(lines.concat())
    }
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div className="canvas">
      <Stage
        ref={stageRef}
        width={600}
        height={194}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="canvas-stage"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={'source-over'}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas
