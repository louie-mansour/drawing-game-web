import { useEffect, useState } from 'react'
import './app.scss'
import DrawingArea from './components/drawing-area/DrawingArea'
import GameInit from './components/game-init/GameInit'
import Lobby from './components/lobby/Lobby'
import { Game, GameState } from './models/Game'
import { getGame } from './services/GameService'

function App() {
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    const getGameUseCase = async () => {
      const game = await getGame()
      setGame(game)
    }
    getGameUseCase()
    const intervalCall = setInterval(() => {
      getGameUseCase()
    }, 5000)
    return () => {
      clearInterval(intervalCall)
    }
  }, [])

  return (
    <>
      <div className="app">
        {!game && <GameInit />}
        {game?.state === GameState.Lobby && (
          <Lobby invite={game.invite} players={game.players} ownerUuid={game.ownerUuid} setGame={setGame} />
        )}
        {game?.state === GameState.DrawingInProgress && <DrawingArea />}
      </div>
    </>
  )
}

export default App
