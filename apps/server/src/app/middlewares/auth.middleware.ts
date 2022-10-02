import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken: any = process.env.ACCESS_TOKEN
    let authHeader: any
    if (req.headers.authorization) {
      authHeader = req.headers?.authorization
    } else if (req.cookies.Authorization) {
      authHeader = authHeader = req.cookies.Authorization
    }
    const token: any = authHeader && authHeader.split(' ')[1]

    if (token === undefined) {
      throw new UnauthorizedException()
    } else {
      verify(token, accessToken, (err: any, user: any) => {
        if (err) {
          throw new ForbiddenException(err.message)
        } else {
          next()
        }
      })
    }
  }
}
