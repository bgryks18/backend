import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { toNumber, isInteger } from 'lodash'

@Injectable()
export class CategoryFilterMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = isInteger(toNumber(req.query?.id)) ? toNumber(req.query?.id) : undefined
    const name = req.query?.name || undefined

    let queries = []

    if (id) {
      queries = [...queries, { id }]
    }

    if (name) {
      queries = [...queries, { name: { contains: name } }]
    }

    res.locals.filterFields = ['id', 'name']
    res.locals.queries = queries.length > 0 ? { AND: queries } : {}
    next()
  }
}
