import { Body, Controller, Get, Param, Post, Put, Delete, Query, Res, UsePipes } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQueryOptions, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger'
import { YupValidationPipe } from '../../pipes/yup-validation.pipe'
import { SliderCreateInput, SliderWhereInput } from './slider.dto'
import {
  SliderCreateReqBody,
  SliderEditReqBody,
  SliderEntity,
  SliderListResponse,
  SliderDeletedResponse,
  SliderDeleteManyReqBody,
} from './slider.model'
import { SliderService } from './slider.service'
import { SliderCreateSchema } from '../../utils/slider.validator'

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  @ApiBody({
    type: SliderCreateReqBody,
  })
  @UsePipes(new YupValidationPipe(SliderCreateSchema))
  @ApiCreatedResponse({ type: SliderEntity })
  async create(@Body() data: SliderCreateInput): Promise<SliderEntity> {
    return this.sliderService.create(data)
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
  @ApiOkResponse({ type: SliderEntity, isArray: true })
  async list(@Res({ passthrough: true }) res: any, @Query() where: SliderWhereInput): Promise<SliderListResponse> {
    return this.sliderService.list(where, res.locals)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: SliderEntity })
  async detail(
    @Param()
    params: {
      id: number
    },
  ): Promise<SliderEntity> {
    return this.sliderService.detail(Number(params.id))
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBody({
    type: SliderEditReqBody,
  })
  @UsePipes(new YupValidationPipe(SliderCreateSchema))
  @ApiOkResponse({ type: SliderEntity })
  async edit(@Body() data: SliderCreateInput, @Param() params: { id: number }): Promise<SliderEntity> {
    return this.sliderService.edit(Number(params.id), data)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: SliderDeletedResponse })
  async delete(@Param() params: { id: number }): Promise<SliderDeletedResponse> {
    return this.sliderService.delete(Number(params.id))
  }

  @Delete('/delete/many')
  @ApiBody({
    type: SliderDeleteManyReqBody,
  })
  @ApiOkResponse({ type: SliderDeletedResponse })
  async deleteMany(@Body() data: { idList: any[] }): Promise<SliderDeletedResponse> {
    return this.sliderService.deleteMany(data.idList.map((item: any) => Number(item)))
  }
}
