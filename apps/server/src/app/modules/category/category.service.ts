import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { PrismaService } from '../../globals/prisma.service';
import { CategoryCreateInput, CategoryWhereInput } from './category.dto';
import { CategoryEntity, CategoryListResponse } from './category.model';
import { Locals } from '../../middlewares/getList.middleware';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCategoryInput: CategoryCreateInput
  ): Promise<CategoryEntity | null> {
    try {
      return await this.prisma.category.create({
        data: createCategoryInput,
      });
    } catch (e) {
      return e;
    }
  }

  async list(
    where: CategoryWhereInput,
    locals: Locals
  ): Promise<CategoryListResponse> {
    try {
      const res = await this.prisma.category.findMany({
        where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
      });
      return {
        data: res,
        info: {
          count: await this.prisma.category.count(),
        },
      };
    } catch (e) {
      return e;
    }
  }

  async detail(id: number): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.findFirstOrThrow({ where: { id: id } });
    } catch (e) {
      return e;
    }
  }

  async edit(
    id: number,
    editCategoryInput: CategoryCreateInput
  ): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: editCategoryInput,
      });
    } catch (e) {
      return e;
    }
  }
}

/*
parametreleri middleware'e al
countu da yazdır
error exception middleware'ı düzenle
*/
