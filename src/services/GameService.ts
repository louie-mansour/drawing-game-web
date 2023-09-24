import axios, { AxiosResponse } from 'axios'
import Cookies from 'universal-cookie'
import { Game } from '../models/Game'

export const createGame = async (): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.post(
    '/game/create',
    undefined,
    header(accessToken)
  )

  const game = toGame(res)
  cookies.set('drawing_gameuuid', game.uuid)
  return game
}

export const joinGame = async (inviteCode: string): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.put(
    '/game/join',
    {
      game: {
        invite: inviteCode
      }
    },
    header(accessToken)
  )

  const game = toGame(res)
  cookies.set('drawing_gameuuid', game.uuid)
  return game
}

export const getGame = async (): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const gameUuid = cookies.get('drawing_gameuuid')
  const res = await axios.get(
    `/game/join/${gameUuid}`,
    header(accessToken)
  )
  return toGame(res)
}

const header = (accessToken: string) => {
  return {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
}

const toGame = (res: AxiosResponse): Game => {
  const { order_uuid, invite, players, uuid } = res.data.game
  return {
    ownerUuid: order_uuid,
    invite: invite,
    players: players,
    uuid: uuid,
  }
}