import axios from 'axios'
import Cookies from 'universal-cookie'
import { Game, GameState } from '../models/Game'
import { Player } from '../models/Player'

export const createGame = async (): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.post('/game/create', undefined, header(accessToken))

  const game = toGame(res.data.game)
  cookies.set('drawing_inviteid', game.invite)
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
        invite: inviteCode,
      },
    },
    header(accessToken)
  )

  const game = toGame(res.data.game)
  cookies.set('drawing_inviteid', game.invite)
  cookies.set('drawing_gameuuid', game.uuid)
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
  return toGame(res.data.game)
}

const header = (accessToken: string) => {
  return {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
}

export const playerReady = async (): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const inviteId = cookies.get('drawing_inviteid')
  const res = await axios.put('/game/player-ready', { game: { invite: inviteId } }, header(accessToken))

  return toGame(res.data.game)
}

export const startGame = async (): Promise<Game> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const inviteId = cookies.get('drawing_inviteid')
  const res = await axios.put('/game/start', { game: { invite: inviteId } }, header(accessToken))

  return toGame(res.data.game)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toGame = (game: any): Game => {
  const { owner_uuid, invite, players, uuid, state } = game
  return {
    ownerUuid: owner_uuid,
    invite: invite,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    players: players.map((p: any) => toPlayer(p)),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPlayer = (player: any): Player => {
  return {
    uuid: player.uuid,
    username: player.username,
    isReady: player.is_ready,
  }
}
