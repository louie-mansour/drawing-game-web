import { useEffect, useState } from 'react'
import { createGame, joinGame } from '../../services/GameService'
import { guestLogin } from '../../services/UserService'
import CreateGame from './create-game/CreateGame'
import './game-init.scss'
import JoinGame from './join-game/JoinGame'
import SetUsername from './set-username/SetUsername'

const GameInit = () => {
  const [invite, setInvite] = useState('')
  const [isCreateNewGame, setIsCreateNewGame] = useState(false)
  const [username, setUsername] = useState('')

  const createNewGame = () => {
    setIsCreateNewGame(true)
  }

  useEffect(() => {
    const joinGameUseCase = async () => {
      if (!invite) {
        return
      }
      await guestLogin(username)
      await joinGame(invite)
    }
    joinGameUseCase()
  }, [invite, username])

  useEffect(() => {
    const createGameUseCase = async () => {
      if (!isCreateNewGame) {
        return
      }
      await guestLogin(username)
      await createGame()
    }
    createGameUseCase()
  }, [isCreateNewGame, username])

  return (
    <div className="game-init">
      <SetUsername setUsername={setUsername}/>
      <JoinGame setInvite={setInvite} />
      <CreateGame createGame={createNewGame}/>
    </div>
  )
}

export default GameInit
