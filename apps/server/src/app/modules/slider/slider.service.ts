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
          images: {
            select: {
              id: true,
              name: true,
              path: true,
            },
          },
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
      const omittedWhereObject = omit(where, ['offset', 'limit', 'sort', 'sortby', ...locals.filterFields])
      const res = await this.prisma.slider.findMany({
        where: { ...omittedWhereObject, ...locals.queries },
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
        include: {
          images: {
            select: {
              id: true,
              name: true,
              path: true,
            },
          },
          product: true,
          _count: true,
        },
      })
      return {
        data: res,
        info: {
          count: await this.prisma.slider.count({
            where: { ...omittedWhereObject, ...locals.queries },
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
          images: {
            select: {
              id: true,
              name: true,
              path: true,
            },
          },
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
          images: {
            select: {
              id: true,
              name: true,
              path: true,
            },
          },
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

  async deleteMany(idList: number[]): Promise<SliderDeletedResponse> {
    try {
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
