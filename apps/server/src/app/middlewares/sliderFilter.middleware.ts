import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { toNumber, isInteger } from 'lodash'

@Injectable()
export class SliderFilterMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = isInteger(toNumber(req.query?.id)) ? toNumber(req.query?.id) : undefined
    const productName = req.query?.productName || undefined
    const name = req.query?.name || undefined
    const hasProduct = req.query?.hasProduct
      ? req.query?.hasProduct === 'true'
        ? true
        : req.query?.hasProduct === 'false'
        ? false
        : undefined
      : undefined
    let queries = []
    if (id) {
      queries = [...queries, { id }]
    }
    if (name) {
      queries = [...queries, { name: { contains: name } }]
    }
    if (productName) {
      queries = [...queries, { product: { name: { contains: productName } } }]
    }
    if (hasProduct === true) {
      queries = [...queries, { NOT: { product: null } }]
    } else if (hasProduct === false) {
      queries = [...queries, { product: null }]
    }
    res.locals.filterFields = ['id', 'name', 'productName', 'hasProduct']
    res.locals.queries = queries.length > 0 ? { AND: queries } : {}
    next()
  }
}
