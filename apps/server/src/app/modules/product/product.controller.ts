import { Body, Controller, Get, Param, Post, Put, Delete, Query, Res, UsePipes } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQueryOptions, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger'
import { Response } from 'express'
import { YupValidationPipe } from '../../pipes/yup-validation.pipe'
import { ProductCreateInput, ProductWhereInput } from './product.dto'
import {
  ProductCreateReqBody,
  ProductEditReqBody,
  ProductEntity,
  ProductListResponse,
  ProductDeletedResponse,
} from './product.model'
import { ProductService } from './product.service'
import { ProductCreateSchema } from '../../utils/product.validator'

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBody({
    type: ProductCreateReqBody,
  })
  @UsePipes(new YupValidationPipe(ProductCreateSchema))
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() data: ProductCreateInput): Promise<ProductEntity> {
    return this.productService.create(data)
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
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async list(@Res({ passthrough: true }) res: Response, @Query() where: ProductWhereInput): Promise<ProductListResponse> {
    return this.productService.list(where, res.locals)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: ProductEntity })
  async detail(
    @Param()
    params: {
      id: number
    },
  ): Promise<ProductEntity> {
    return this.productService.detail(Number(params.id))
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBody({
    type: ProductEditReqBody,
  })
  @UsePipes(new YupValidationPipe(ProductCreateSchema))
  @ApiOkResponse({ type: ProductEntity })
  async edit(@Body() data: ProductCreateInput, @Param() params: { id: number }): Promise<ProductEntity> {
    return this.productService.edit(Number(params.id), data)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: ProductDeletedResponse })
  async delete(@Param() params: { id: number }): Promise<ProductDeletedResponse> {
    return this.productService.delete(Number(params.id))
  }
}
