import { useEffect, useState } from 'react'
import { Game } from '../../models/Game'
import { Player } from '../../models/Player'
import { playerReady } from '../../services/GameService'
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
    </div>
  )
}

export default Lobby
