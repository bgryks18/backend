import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  Res,
  UsePipes,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQueryOptions,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger'
import { YupValidationPipe } from '../../pipes/yup-validation.pipe'
import { ProductImageCreateInput, ProductImageWhereInput } from './productImage.dto'
import {
  ProductImageCreateReqBody,
  ProductImageEditReqBody,
  ProductImageEntity,
  ProductImageListResponse,
  ProductImageDeletedResponse,
} from './productImage.model'
import { ProductImageService } from './productImage.service'
import { ProductImageCreateSchema } from '../../utils/productImage.validator'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express, Request } from 'express'
import * as multer from 'multer'
import { editFileName, imageFileFilter } from '../../utils/file-upload.utils'
@ApiTags('ProductImage')
@Controller('productImage')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        productId: {
          type: 'number',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ type: ProductImageEntity })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: 'uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(@UploadedFile() image: any, @Req() req: Request): Promise<any> {
    return this.productImageService.create(image, req)
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
  @ApiOkResponse({ type: ProductImageEntity, isArray: true })
  async list(@Res({ passthrough: true }) res: any, @Query() where: ProductImageWhereInput): Promise<ProductImageListResponse> {
    return this.productImageService.list(where, res.locals)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: ProductImageEntity })
  async detail(
    @Param()
    params: {
      id: number
    },
  ): Promise<ProductImageEntity> {
    return this.productImageService.detail(Number(params.id))
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: ProductImageDeletedResponse })
  async delete(@Param() params: { id: number }): Promise<ProductImageDeletedResponse> {
    return this.productImageService.delete(Number(params.id))
  }
}
