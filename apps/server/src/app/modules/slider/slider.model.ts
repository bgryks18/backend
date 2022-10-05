import { ApiProperty } from '@nestjs/swagger'
import { Slider } from '@prisma/client'

export class SliderEntity implements Slider {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  product?: number

  @ApiProperty()
  images?: number[]
}

export class SliderCreateReqBody {
  @ApiProperty()
  name: string

  @ApiProperty()
  product: number

  @ApiProperty()
  images: number[]
}

export class SliderEditReqBody {
  @ApiProperty()
  name: string

  @ApiProperty()
  product: number

  @ApiProperty()
  images: number[]
}

export interface SliderListResponse {
  data: SliderEntity[]
  info: {
    count: number
  }
}

export class SliderDeletedResponse {
  @ApiProperty()
  message: 'Silindi.' | 'Bir hata oluştu.'
}
