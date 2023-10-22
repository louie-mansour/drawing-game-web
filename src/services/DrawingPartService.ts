import axios, { AxiosResponse } from 'axios'
import Cookies from 'universal-cookie'
import { FinishedDrawingPart } from '../components/drawing-area/DrawingArea'

interface DrawingPartDto {
  base_64_image: string
}

export const submitFinishedDrawingPart = async (drawingPart: FinishedDrawingPart): Promise<FinishedDrawingPart> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const gameUuid = cookies.get('drawing_gameuuid')
  const res = await axios.put(
    `/game/${gameUuid}/drawing/submit`,
    { drawing_part: toDrawingPartDto(drawingPart) },
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )
  return toDrawingPart(res)
}

export const getPreviousDrawingPart = async (): Promise<FinishedDrawingPart> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const gameUuid = cookies.get('drawing_gameuuid')
  const res = await axios.get(`/game/${gameUuid}/drawing/previous`, {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
  return toDrawingPart(res)
}

const toDrawingPartDto = (drawingPart: FinishedDrawingPart): DrawingPartDto => {
  return {
    base_64_image: drawingPart.base64Image,
  }
}

const toDrawingPart = (res: AxiosResponse): FinishedDrawingPart => {
  return {
    base64Image: res.data.drawing_part.base_64_image,
  }
}
