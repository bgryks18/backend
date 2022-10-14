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
import { SliderImageCreateInput, SliderImageWhereInput } from './sliderImage.dto'
import {
  SliderImageCreateReqBody,
  SliderImageEditReqBody,
  SliderImageEntity,
  SliderImageListResponse,
  SliderImageDeletedResponse,
  SliderImageDeleteManyReqBody,
} from './sliderImage.model'
import { SliderImageService } from './sliderImage.service'
import { SliderImageCreateSchema } from '../../utils/sliderImage.validator'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express, Request } from 'express'
import * as multer from 'multer'
import { editFileName, imageFileFilter } from '../../utils/file-upload.utils'
@ApiTags('SliderImage')
@Controller('sliderimage')
export class SliderImageController {
  constructor(private readonly sliderImageService: SliderImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        sliderId: {
          type: 'number',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ type: SliderImageEntity })
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
    return this.sliderImageService.create(image, req)
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
  @ApiOkResponse({ type: SliderImageEntity, isArray: true })
  async list(@Res({ passthrough: true }) res: any, @Query() where: SliderImageWhereInput): Promise<SliderImageListResponse> {
    return this.sliderImageService.list(where, res.locals)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: SliderImageEntity })
  async detail(
    @Param()
    params: {
      id: number
    },
  ): Promise<SliderImageEntity> {
    return this.sliderImageService.detail(Number(params.id))
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: SliderImageDeletedResponse })
  async delete(@Param() params: { id: number }): Promise<SliderImageDeletedResponse> {
    return this.sliderImageService.delete(Number(params.id))
  }

  @Delete('/delete/many')
  @ApiBody({
    type: SliderImageDeleteManyReqBody,
  })
  @ApiOkResponse({ type: SliderImageDeletedResponse })
  async deleteMany(@Body() data: { idList: any[] }): Promise<SliderImageDeletedResponse> {
    return this.sliderImageService.deleteMany(data.idList.map((item: any) => Number(item)))
  }
}
