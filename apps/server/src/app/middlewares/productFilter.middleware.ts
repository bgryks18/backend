import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { toNumber, isInteger } from 'lodash'

@Injectable()
export class ProductFilterMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = isInteger(toNumber(req.query?.id)) ? toNumber(req.query?.id) : undefined
    const name = req.query?.name || undefined
    const categoryName = req.query?.categoryName || undefined
    const sliderName = req.query?.sliderName || undefined
    const hasCategory = req.query?.hasCategory
      ? req.query?.hasCategory === 'true'
        ? true
        : req.query?.hasCategory === 'false'
        ? false
        : undefined
      : undefined
    const hasSlider = req.query?.hasSlider
      ? req.query?.hasSlider === 'true'
        ? true
        : req.query?.hasSlider === 'false'
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
    if (categoryName) {
      queries = [...queries, { category: { name: { contains: categoryName } } }]
    }
    if (sliderName) {
      queries = [...queries, { slider: { name: { contains: sliderName } } }]
    }
    if (hasCategory === true) {
      queries = [...queries, { NOT: { category: null } }]
    } else if (hasCategory === false) {
      queries = [...queries, { category: null }]
    }
    if (hasSlider === true) {
      queries = [...queries, { NOT: { slider: null } }]
    } else if (hasSlider === false) {
      queries = [...queries, { slider: null }]
    }

    res.locals.filterFields = ['id', 'name', 'categoryName', 'sliderName', 'hasCategory', 'hasSlider']
    res.locals.queries = queries.length > 0 ? { AND: queries } : {}
    next()
  }
}
