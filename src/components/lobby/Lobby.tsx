import { Player } from '../../models/Player'
import './lobby.scss'

const Lobby = ({ invite, players }: { invite: string; players: Player[] }) => {
  return (
    <div className="lobby">
      <div className="lobby__invite-code">
        <h2>Invite Code: {invite}</h2>
      </div>
      <div className="lobby__players">
        {players.map((player) => {
          return (
            <div>
              `{player.username}: {player.uuid}`
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Lobby
