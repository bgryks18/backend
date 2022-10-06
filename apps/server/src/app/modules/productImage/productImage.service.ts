import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { ProductImageCreateInput, ProductImageWhereInput } from './productImage.dto'
import { ProductImageDeletedResponse, ProductImageEntity, ProductImageListResponse } from './productImage.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
import { Request } from 'express'
import * as fs from 'fs'
@Injectable()
export class ProductImageService {
  constructor(private prisma: PrismaService) {}

  async create(productImage: any, req: Request): Promise<ProductImageEntity> {
    try {
      const { path } = productImage
      const { name, productId } = req.body

      return await this.prisma.productImage.create({
        data: {
          name,
          path,
        },
        include: {
          product: productId,
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async list(where: ProductImageWhereInput, locals: Locals): Promise<ProductImageListResponse> {
    try {
      const res = await this.prisma.productImage.findMany({
        where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
      })
      return {
        data: res,
        info: {
          count: await this.prisma.productImage.count({
            where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
            skip: locals.offset,
            take: locals.limit,
          }),
        },
      }
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async detail(id: number): Promise<ProductImageEntity> {
    try {
      return await this.prisma.productImage.findFirstOrThrow({ where: { id: id } })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async delete(id: number): Promise<ProductImageDeletedResponse> {
    try {
      const foundItem = await this.prisma.productImage.findFirstOrThrow({
        where: {
          id,
        },
      })
      fs.unlinkSync('./' + foundItem.path)
      await this.prisma.productImage.delete({
        where: {
          id,
        },
      })
      return { message: 'Silindi.' }
    } catch (e) {
      new ErrorHandler(e)
    }
  }
}
