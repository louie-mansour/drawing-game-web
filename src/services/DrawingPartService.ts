import axios from 'axios'
import Cookies from 'universal-cookie'
import { FinishedDrawingPart } from '../components/drawing-area/DrawingArea'

export const submitFinishedDrawingPart = async (drawing: FinishedDrawingPart): Promise<FinishedDrawingPart> => {
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

export const getPreviousDrawingPart = async (): Promise<FinishedDrawingPart> => {
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
