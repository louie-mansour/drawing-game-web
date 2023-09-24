import { Player } from "./Player"

export interface Game {
  readonly ownerUuid: string
  readonly invite: string
  readonly players: Player[]
  readonly uuid: string
}