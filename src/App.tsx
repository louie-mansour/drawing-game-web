import { useEffect } from 'react'
import './app.scss'
import DrawingArea from './drawing-area/DrawingArea'
import { guestLogin } from './services/UserService'
import Cookies from 'universal-cookie'

function App() {
  useEffect(() => {
    const loginAsGuest = async () => {
      const accessToken = await guestLogin()
      const cookies = new Cookies()
      cookies.set('drawing_accesstoken', accessToken, {
        path: '/',
        secure: true,
        httpOnly: false,
        sameSite: 'strict',
      })
    }

    loginAsGuest()
  })
  return (
    <>
      <h1> Drawing Area</h1>
      <div className="app">
        <DrawingArea />
      </div>
    </>
  )
}

export default App
