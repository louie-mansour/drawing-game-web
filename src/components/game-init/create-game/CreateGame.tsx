import './create-game.scss'

const CreateGame = ({ createGame }: { createGame: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    createGame()
  }

  return (
    <div className="create-game">
      <button className="create-game__button" onClick={handleClick}>
        create
      </button>
    </div>
  )
}

export default CreateGame
