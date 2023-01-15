import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { SliderImageCreateInput, SliderImageWhereInput } from './sliderImage.dto'
import { SliderImageDeletedResponse, SliderImageEntity, SliderImageListResponse } from './sliderImage.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
import { Request } from 'express'
import * as fs from 'fs'
@Injectable()
export class SliderImageService {
  constructor(private prisma: PrismaService) {}

  async create(sliderImage: Express.Multer.File, req: Request): Promise<SliderImageEntity> {
    try {
      const path = sliderImage?.path || null
      const { name, sliderId } = req.body

      return await this.prisma.sliderImage.create({
        data: {
          name,
          path,
          sliderId: Number(sliderId),
        },
        include: {
          slider: {
            include: {
              images: {
                select: {
                  id: true,
                  name: true,
                  path: true,
                },
              },
              product: {
                include: {
                  category: true,
                  poster: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                },
              },
              _count: true,
            },
          },
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async list(where: SliderImageWhereInput, locals: Locals): Promise<SliderImageListResponse> {
    try {
      const res = await this.prisma.sliderImage.findMany({
        where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
        include: {
          slider: {
            include: {
              images: {
                select: {
                  id: true,
                  name: true,
                  path: true,
                },
              },
              product: {
                include: {
                  category: true,
                  poster: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                },
              },
              _count: true,
            },
          },
        },
      })
      return {
        data: res,
        info: {
          count: await this.prisma.sliderImage.count({
            where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
          }),
        },
      }
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async detail(id: number): Promise<SliderImageEntity> {
    try {
      return await this.prisma.sliderImage.findFirstOrThrow({
        where: { id: id },
        include: {
          slider: {
            include: {
              images: {
                select: {
                  id: true,
                  name: true,
                  path: true,
                },
              },
              product: {
                include: {
                  category: true,
                  poster: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                },
              },
              _count: true,
            },
          },
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async edit(sliderImage: Express.Multer.File, req: Request): Promise<SliderImageEntity> {
    try {
      const path = sliderImage?.path || null
      const { name } = req.body
      const { id } = req.params

      const available = await this.prisma.sliderImage.findFirstOrThrow({ where: { id: Number(id) }, include: { slider: true } })
      if (available.path && path) {
        fs.unlinkSync(available.path)
      }
      return await this.prisma.sliderImage.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          path: path || available.path,
        },
        include: {
          slider: {
            include: {
              _count: true,
              images: true,
              product: true,
            },
          },
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async delete(id: number): Promise<SliderImageDeletedResponse> {
    try {
      const foundItem = await this.prisma.sliderImage.findFirstOrThrow({
        where: {
          id,
        },
      })
      fs.unlinkSync(foundItem.path)
      await this.prisma.sliderImage.delete({
        where: {
          id,
        },
      })
      return { message: 'Silindi.' }
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async deleteMany(idList: number[]): Promise<SliderImageDeletedResponse> {
    try {
      const foundItems = await this.prisma.sliderImage.findMany({
        where: {
          id: {
            in: idList,
          },
        },
      })
      foundItems.forEach((item, index) => {
        fs.unlinkSync(foundItems[index].path)
      })
      await this.prisma.sliderImage.deleteMany({
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
