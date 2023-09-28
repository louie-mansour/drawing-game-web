import axios, { AxiosResponse } from 'axios'
import Cookies from 'universal-cookie'
import { Game, GameState } from '../models/Game'

export const createGame = async (): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.post('/game/create', undefined, header(accessToken))

  const game = toGame(res)
  cookies.set('drawing_inviteid', game.invite)
  return game
}

export const joinGame = async (inviteCode: string): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.put(
    '/game/join',
    {
      game: {
        invite: inviteCode,
      },
    },
    header(accessToken)
  )

  const game = toGame(res)
  cookies.set('drawing_inviteid', game.uuid)
  return game
}

export const getGame = async (): Promise<Game | null> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const inviteId = cookies.get('drawing_inviteid')

  if (!accessToken || !inviteId) {
    return null
  }
  const res = await axios.get(`/game/${inviteId}`, header(accessToken))
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
  const { order_uuid, invite, players, uuid, state } = res.data.game
  return {
    ownerUuid: order_uuid,
    invite: invite,
    players: players,
    uuid: uuid,
    state: toGameState(state),
  }
}

const toGameState = (state: string): GameState => {
  if (state === GameState.Lobby) {
    return GameState.Lobby
  }
  if (state === GameState.DrawingInProgress) {
    return GameState.DrawingInProgress
  }
  throw Error('unrecognized state')
}
