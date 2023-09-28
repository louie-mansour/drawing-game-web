import { useState } from 'react'
import './join-game.scss'

const JoinGame = ({ setInvite }: { setInvite: (invite: string) => void }) => {
  const [invite, setInviteLocal] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteLocal(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInvite(invite)
  }
  return (
    <div className="join-game">
      <form className="join-game__invite-form">
        <label className="join-game__invite-label">
          Invite:
          <input className="join-game__invite-input" type="text" name="invite" onChange={handleChange} />
        </label>
        <input className="join-game__invite-button" type="button" value="Join" onClick={handleSubmit} />
      </form>
    </div>
  )
}

export default JoinGame
