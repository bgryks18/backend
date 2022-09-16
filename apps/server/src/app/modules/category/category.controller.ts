import { Body, Controller, Get, Param, Post, Put, Delete, Query, Res, UsePipes, UseFilters } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQueryOptions, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger'
import { Response } from 'express'
import { YupValidationPipe } from '../../pipes/yup-validation.pipe'
import { CategoryCreateInput, CategoryWhereInput } from './category.dto'
import {
  CategoryCreateReqBody,
  CategoryEditReqBody,
  CategoryEntity,
  CategoryListResponse,
  CategoryDeletedResponse,
} from './category.model'
import { CategoryService } from './category.service'
import { CategoryCreateSchema } from '../../utils/category.validator'
import { HttpExceptionFilter } from '../../utils/http-exception.filter'
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({
    type: CategoryCreateReqBody,
  })
  @UsePipes(new YupValidationPipe(CategoryCreateSchema))
  @UseFilters(new HttpExceptionFilter())
  @ApiCreatedResponse({ type: CategoryEntity })
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() data: CategoryCreateInput): Promise<CategoryEntity> {
    return this.categoryService.create(data)
  }

  @Get()
  @ApiQuery({
    name: 'sort',
    description: 'Sıralama tipi',
    type: 'string',
    enum: ['asc', 'desc'],
    required: false,
  } as ApiQueryOptions)
  @ApiQuery({
    name: 'sortby',
    description: 'Sıralama Fieldı',
    required: false,
    type: 'string',
  } as ApiQueryOptions)
  @ApiQuery({
    name: 'limit',
    description: 'Limit',
    required: false,
    type: 'integer',
  } as ApiQueryOptions)
  @ApiQuery({
    name: 'offset',
    description: 'Offset',
    required: false,
    type: 'string',
  } as ApiQueryOptions)
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  @UseFilters(new HttpExceptionFilter())
  async list(@Res({ passthrough: true }) res: Response, @Query() where: CategoryWhereInput): Promise<CategoryListResponse> {
    return this.categoryService.list(where, res.locals)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: CategoryEntity })
  @UseFilters(new HttpExceptionFilter())
  async detail(
    @Param()
    params: {
      id: number
    },
  ): Promise<CategoryEntity> {
    return this.categoryService.detail(Number(params.id))
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBody({
    type: CategoryEditReqBody,
  })
  @UsePipes(new YupValidationPipe(CategoryCreateSchema))
  @ApiOkResponse({ type: CategoryEntity })
  @UseFilters(new HttpExceptionFilter())
  async edit(@Body() data: CategoryCreateInput, @Param() params: { id: number }): Promise<CategoryEntity> {
    return this.categoryService.edit(Number(params.id), data)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: CategoryDeletedResponse })
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param() params: { id: number }): Promise<CategoryDeletedResponse> {
    return this.categoryService.delete(Number(params.id))
  }
}
