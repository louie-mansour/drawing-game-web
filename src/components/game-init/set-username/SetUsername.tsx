import './set-username.scss'

const SetUsername = ({ setUsername }: { setUsername: (username: string) => void }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <div className="set-username">
      <form className="set-username__form">
        <label className="set-username__input">
          username:
          <input className="set-username__label" type="text" name="username" onChange={handleChange}/>
        </label>
      </form>
    </div>
  )
}

export default SetUsername
