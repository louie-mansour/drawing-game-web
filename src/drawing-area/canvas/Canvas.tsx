import { Stage, Layer, Line } from 'react-konva'
import { useState, useRef, useEffect } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { DrawingState, FinishedDrawing } from '../DrawingArea'

interface Lines {
  points: number[]
}

const Canvas = ({
  drawingState,
  setFinishedDrawing,
}: {
  drawingState: DrawingState
  setFinishedDrawing: (_: FinishedDrawing) => void
}) => {
  const [lines, setLines] = useState<Lines[]>([])

  const isDrawing = useRef(false)
  const stageRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    if (drawingState === DrawingState.Completed) {
      setFinishedDrawing({
        base64Image: stageRef.current.toDataURL(),
      })
    }
  }, [drawingState, setFinishedDrawing])

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
    <div className=" text-center text-dark">
      <Stage
        ref={stageRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
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
