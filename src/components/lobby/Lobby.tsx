import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { Game } from '../../models/Game'
import { Player } from '../../models/Player'
import { playerReady, startGame } from '../../services/GameService'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import './lobby.scss'

const Lobby = ({
  invite,
  players,
  ownerUuid,
  setGame,
}: {
  invite: string
  players: Player[]
  ownerUuid: string
  setGame: (game: Game) => void
}) => {
  const [isReady, setIsReady] = useState(false)
  const [isStart, setIsStart] = useState(false)

  useEffect(() => {
    const playerReadyUseCase = async () => {
      if (!isReady) {
        return
      }
      const game = await playerReady()
      setGame(game)
    }
    playerReadyUseCase()
  }, [isReady])

  useEffect(() => {
    const startGameUseCase = async () => {
      if (!isStart) {
        return
      }
      const game = await startGame()
      setGame(game)
    }
    startGameUseCase()
  }, [isStart])

  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const decodedJwt = jwt_decode<JwtPayload>(accessToken)
  const isOwner = ownerUuid === decodedJwt?.sub

  return (
    <div className="lobby">
      <div className="lobby__invite-code">
        <h2>Invite Code: {invite}</h2>
      </div>
      <div className="lobby__players">
        {players.map((player) => {
          const readyText = player.isReady ? '(ready)' : '(not ready)'
          const ownerText = player.uuid === ownerUuid ? '[owner]' : ''
          return (
            <div>
              `{player.username}: {player.uuid} {ownerText} {readyText}`
            </div>
          )
        })}
      </div>
      <div className="lobby__ready">
        <button className="lobby__ready-button" onClick={() => setIsReady(true)} type="submit">
          I'm ready
        </button>
      </div>
      {isOwner && (
        <div className="lobby__start">
          <button className="lobby__start-button" onClick={() => setIsStart(true)} type="submit">
            Start
          </button>
        </div>
      )}
    </div>
  )
}

export default Lobby
