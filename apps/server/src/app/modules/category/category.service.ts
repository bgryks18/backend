import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../globals/prisma.service';
import { CategoryCreateInput } from './category.dto';
import { CategoryEntity } from './category.model';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCategoryInput: CategoryCreateInput
  ): Promise<CategoryEntity | null> {
    return this.prisma.category.create({
      data: createCategoryInput,
    });
  }

  async list(where: Prisma.CategoryWhereInput): Promise<CategoryEntity[]> {
    return this.prisma.category.findMany({
      where: where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async detail(id: number): Promise<CategoryEntity> {
    return this.prisma.category.findFirst({ where: { id: id } });
  }
}
