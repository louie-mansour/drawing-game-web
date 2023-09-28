import axios from 'axios'
import Cookies from 'universal-cookie'
import { Player } from '../models/Player'

export const guestLogin = async (username: string): Promise<Player> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.put(
    '/guest/login',
    {
      player: {
        username: username,
      },
    },
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )

  cookies.set('drawing_accesstoken', res.data.access_token)
  return {
    uuid: res.data.player.uuid,
    username: res.data.player.username,
  }
}
