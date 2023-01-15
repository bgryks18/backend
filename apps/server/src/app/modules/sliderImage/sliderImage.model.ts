import { ApiProperty } from '@nestjs/swagger'
import { Slider } from '@prisma/client'

export class SliderImageEntity {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  path: string

  @ApiProperty()
  slider: Slider
}

export class SliderImageCreateReqBody {
  @ApiProperty()
  name: string

  @ApiProperty({ type: 'file', isArray: false, required: true })
  path: string

  @ApiProperty()
  sliderId: number
}

export class SliderImageEditReqBody {
  @ApiProperty()
  name: string

  @ApiProperty({ type: 'file', isArray: false, required: false })
  path: string
}

export class SliderImageDeleteManyReqBody {
  @ApiProperty()
  idList: number[]
}
export interface SliderImageListResponse {
  data: SliderImageEntity[]
  info: {
    count: number
  }
}

export class SliderImageDeletedResponse {
  @ApiProperty()
  message: 'Silindi.' | 'Bir hata oluştu.'
}
