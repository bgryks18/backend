import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { toNumber, isInteger } from 'lodash'

@Injectable()
export class GetListMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const sortby = req.query?.sortby || 'id'
    const sort = req.query?.sort || 'asc'
    const limit = isInteger(toNumber(req.query?.limit)) ? Number(req.query.limit) : 10
    const offset = isInteger(toNumber(req.query?.offset)) ? Number(req.query.offset) : 0
    const name = req.query?.name || ''

    res.locals.limit = limit
    res.locals.offset = offset
    res.locals.sort = sort
    res.locals.sortby = sortby
    res.locals.name = name

    next()
  }
}
export interface Locals {
  limit: number
  offset: number
  sort: string
  sortby: string
  name: string
}
