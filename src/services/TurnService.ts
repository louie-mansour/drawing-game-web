import { FinishedDrawing } from '../drawing-area/DrawingArea'
import axios from 'axios'

export const submitFinishedDrawing = async (drawing: FinishedDrawing): Promise<number> => {
  await axios.put('/drawing/submit', { drawing })
  return 0
}
