import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { CategoryCreateInput, CategoryWhereInput } from './category.dto'
import { CategoryDeletedResponse, CategoryEntity, CategoryListResponse } from './category.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryInput: CategoryCreateInput): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.create({
        data: createCategoryInput,
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async list(where: CategoryWhereInput, locals: Locals): Promise<CategoryListResponse> {
    try {
      const res = await this.prisma.category.findMany({
        where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
      })
      return {
        data: res,
        info: {
          count: await this.prisma.category.count({
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

  async detail(id: number): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.findFirstOrThrow({ where: { id: id } })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async edit(id: number, editCategoryInput: CategoryCreateInput): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: editCategoryInput,
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async delete(id: number): Promise<CategoryDeletedResponse> {
    try {
      await this.prisma.category.delete({
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
