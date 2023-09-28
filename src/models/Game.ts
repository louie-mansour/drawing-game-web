import { Player } from './Player'

export interface Game {
  readonly ownerUuid: string
  readonly invite: string
  readonly players: Player[]
  readonly state: GameState
  readonly uuid: string
}

export enum GameState {
  Lobby = 'Lobby',
  DrawingInProgress = 'DrawingInProgress',
}
