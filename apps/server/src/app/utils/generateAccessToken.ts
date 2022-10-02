import { sign } from 'jsonwebtoken'
const accessToken: any = process.env.ACCESS_TOKEN
const generateAccesToken: any = (user: string, expireTime: number) => {
  return sign(
    {
      user,
    },
    accessToken,
    {
      expiresIn: `${expireTime}`,
    },
  )
}

export default generateAccesToken
