import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { SliderCreateInput, SliderWhereInput } from './slider.dto'
import { SliderDeletedResponse, SliderEntity, SliderListResponse } from './slider.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
@Injectable()
export class SliderService {
  constructor(private prisma: PrismaService) {}

  async create(createSliderInput: SliderCreateInput): Promise<SliderEntity> {
    try {
      return await this.prisma.slider.create({
        data: createSliderInput,
        include: {
          images: true,
          product: true,
          _count: true,
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async list(where: SliderWhereInput, locals: Locals): Promise<SliderListResponse> {
    try {
      const res = await this.prisma.slider.findMany({
        where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
        include: {
          images: true,
          product: true,
          _count: true,
        },
      })
      return {
        data: res,
        info: {
          count: await this.prisma.slider.count({
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

  async detail(id: number): Promise<SliderEntity> {
    try {
      return await this.prisma.slider.findFirstOrThrow({
        where: { id: id },
        include: {
          images: true,
          product: true,
          _count: true,
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async edit(id: number, editSliderInput: SliderCreateInput): Promise<SliderEntity> {
    try {
      return await this.prisma.slider.update({
        where: {
          id,
        },
        data: editSliderInput,
        include: {
          images: true,
          product: true,
          _count: true,
        },
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async delete(id: number): Promise<SliderDeletedResponse> {
    try {
      await this.prisma.slider.delete({
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
