import { FinishedDrawing } from '../drawing-area/DrawingArea'
import axios from 'axios'

export const submitFinishedDrawing = async (drawing: FinishedDrawing): Promise<FinishedDrawing> => {
  const res = await axios.put('/drawing/submit', { drawing })
  return {
    base64Image: res.data.drawing.base64Image,
  }
}

export const getPreviousDrawing = async (): Promise<FinishedDrawing> => {
  const res = await axios.get('/drawing/previous')
  return {
    base64Image: res.data.drawing.base64Image,
  }
}
