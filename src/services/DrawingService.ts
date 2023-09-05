import axios from 'axios'
import Cookies from 'universal-cookie'
import { FinishedDrawing } from '../drawing-area/DrawingArea'

export const submitFinishedDrawing = async (drawing: FinishedDrawing): Promise<FinishedDrawing> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.put(
    '/drawing/submit',
    { drawing },
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )
  return {
    base64Image: res.data.drawing.base_64_image,
  }
}

export const getPreviousDrawing = async (): Promise<FinishedDrawing> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.get('/drawing/previous', {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
  return {
    base64Image: res.data.drawing.base_64_image,
  }
}
