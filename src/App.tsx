import './app.scss'
import GameInit from './components/game-init/GameInit'
// import DrawingArea from './components/drawing-area/DrawingArea'

function App() {
  // useEffect(() => {
  //   const loginAsGuest = async () => {
  //     const accessToken = await guestLogin()
  //     const cookies = new Cookies()
  //     cookies.set('drawing_accesstoken', accessToken, {
  //       path: '/',
  //       secure: true,
  //       httpOnly: false,
  //       sameSite: 'strict',
  //     })
  //   }

  //   loginAsGuest()
  // })
  return (
    <>
      <h1> Drawing Area</h1>
      <div className="app">
        <GameInit />
        {/* <DrawingArea /> */}
      </div>
    </>
  )
}

export default App
