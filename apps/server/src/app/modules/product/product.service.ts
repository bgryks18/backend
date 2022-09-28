import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { ProductCreateInput, ProductWhereInput } from './product.dto'
import { ProductDeletedResponse, ProductEntity, ProductListResponse } from './product.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductInput: ProductCreateInput): Promise<ProductEntity> {
    try {
      return await this.prisma.product.create({
        data: createProductInput,
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async list(where: ProductWhereInput, locals: Locals): Promise<ProductListResponse> {
    try {
      const res = await this.prisma.product.findMany({
        where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
      })
      return {
        data: res,
        info: {
          count: await this.prisma.product.count({
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

  async detail(id: number): Promise<ProductEntity> {
    try {
      return await this.prisma.product.findFirstOrThrow({ where: { id: id } })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async edit(id: number, editProductInput: ProductCreateInput): Promise<ProductEntity> {
    try {
      return await this.prisma.product.update({
        where: {
          id,
        },
        data: editProductInput,
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async delete(id: number): Promise<ProductDeletedResponse> {
    try {
      await this.prisma.product.delete({
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
