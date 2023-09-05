import axios from 'axios'
import Cookies from 'universal-cookie'

export const guestLogin = async (): Promise<string> => {
  const cookies = new Cookies()
  const accessToken = cookies.get('drawing_accesstoken')
  const res = await axios.put(
    '/guest/login',
    {
      user: {
        username: 'myname',
      },
    },
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )
  return res.data.access_token
}
