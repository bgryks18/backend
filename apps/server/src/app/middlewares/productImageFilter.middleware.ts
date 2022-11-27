import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { toNumber, isInteger } from 'lodash'

@Injectable()
export class ProductImageFilterMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const productName = req.query?.productName || undefined
    const productId = isInteger(toNumber(req.query?.productId)) ? toNumber(req.query?.productId) : undefined
    const name = req.query?.name || undefined
    const hasProduct = req.query?.hasProduct
      ? req.query?.hasProduct === 'true'
        ? true
        : req.query?.hasProduct === 'false'
        ? false
        : undefined
      : undefined
    let queries = []
    if (productName) {
      queries = [...queries, { product: { name: { contains: productName } } }]
    }
    if (productId) {
      queries = [...queries, { product: { id: productId } }]
    }
    if (name) {
      queries = [...queries, { name: { contains: name } }]
    }
    if (hasProduct === true) {
      queries = [...queries, { NOT: { product: null } }]
    } else if (hasProduct === false) {
      queries = [...queries, { product: null }]
    }
    res.locals.filterFields = ['productName', 'productId', 'name', 'hasProduct']
    res.locals.queries = queries.length > 0 ? { AND: queries } : {}
    next()
  }
}
