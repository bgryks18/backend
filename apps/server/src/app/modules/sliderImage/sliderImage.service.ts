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

  async create(sliderImage: any, req: Request): Promise<SliderImageEntity> {
    try {
      const { path } = sliderImage
      const { name, sliderId } = req.body

      return await this.prisma.sliderImage.create({
        data: {
          name,
          path,
          sliderId: Number(sliderId),
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
      })
      return {
        data: res,
        info: {
          count: await this.prisma.sliderImage.count({
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

  async detail(id: number): Promise<SliderImageEntity> {
    try {
      return await this.prisma.sliderImage.findFirstOrThrow({ where: { id: id } })
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
      fs.unlinkSync('./' + foundItem.path)
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
}
