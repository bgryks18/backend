import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { ProductImageWhereInput } from './productImage.dto'
import {
  ProductImageCreateReqBody,
  ProductImageDeletedResponse,
  ProductImageEntity,
  ProductImageListResponse,
} from './productImage.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
import { Request } from 'express'
import * as fs from 'fs'
@Injectable()
export class ProductImageService {
  constructor(private prisma: PrismaService) {}
  async create(productImage: Express.Multer.File, req: Request): Promise<ProductImageEntity> {
    try {
      const path = productImage?.path || null
      const { name } = req.body

      return await this.prisma.productImage.create({
        data: {
          name,
          path,
        },
        include: {
          product: {
            include: {
              category: true,
              slider: {
                include: {
                  images: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                  _count: true,
                },
              },
            },
          },
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async list(where: ProductImageWhereInput, locals: Locals): Promise<ProductImageListResponse> {
    try {
      const omittedWhereObject = omit(where, ['offset', 'limit', 'sort', 'sortby', ...locals.filterFields])

      const res = await this.prisma.productImage.findMany({
        where: { ...omittedWhereObject, ...locals.queries },
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
        include: {
          product: {
            include: {
              category: true,
              slider: {
                include: {
                  images: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                  _count: true,
                },
              },
            },
          },
        },
      })
      return {
        data: res,
        info: {
          count: await this.prisma.productImage.count({
            where: { ...omittedWhereObject, ...locals.queries },
          }),
        },
      }
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async detail(id: number): Promise<ProductImageEntity> {
    try {
      return await this.prisma.productImage.findFirstOrThrow({
        where: { id },
        include: {
          product: {
            include: {
              category: true,
              slider: {
                include: {
                  images: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                  _count: true,
                },
              },
            },
          },
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async edit(productImage: Express.Multer.File, req: Request): Promise<ProductImageEntity> {
    try {
      const path = productImage?.path || null
      const { name } = req.body
      const { id } = req.params

      const available = await this.prisma.productImage.findFirstOrThrow({ where: { id: Number(id) }, include: { product: true } })
      if (available.path && path) {
        fs.unlinkSync(available.path)
      }
      return await this.prisma.productImage.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          path: path || available.path,
        },
        include: {
          product: {
            include: {
              category: true,
              slider: {
                include: {
                  images: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                  _count: true,
                },
              },
            },
          },
        },
      })
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
      fs.unlinkSync(foundItem.path)
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

  async deleteMany(idList: number[]): Promise<ProductImageDeletedResponse> {
    try {
      const foundItems = await this.prisma.productImage.findMany({
        where: {
          id: {
            in: idList,
          },
        },
      })

      foundItems.forEach((item, index) => {
        fs.unlinkSync(foundItems[index].path)
      })
      await this.prisma.productImage.deleteMany({
        where: {
          id: {
            in: idList,
          },
        },
      })
      return { message: 'Silindi.' }
    } catch (e) {
      new ErrorHandler(e)
    }
  }
}
