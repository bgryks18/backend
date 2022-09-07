import { CategoryCreateSchema } from './utils/category.validator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { YupValidationPipe } from '../../pipes/yup-validation.pipe';
import { CategoryCreateInput } from './category.dto';
import { CategoryEntity } from './category.model';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new YupValidationPipe(CategoryCreateSchema))
  @ApiCreatedResponse({ type: CategoryEntity })
  async create(@Body() data: CategoryCreateInput): Promise<CategoryEntity> {
    return this.categoryService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  async list(
    @Query() where: Prisma.CategoryWhereInput
  ): Promise<CategoryEntity[]> {
    return this.categoryService.list(where);
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryEntity })
  async detail(@Param() params: { id: number }): Promise<CategoryEntity> {
    return this.categoryService.detail(Number(params.id));
  }
}
