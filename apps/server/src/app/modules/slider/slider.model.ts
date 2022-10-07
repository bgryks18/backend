import { ApiProperty } from '@nestjs/swagger'
import { Slider, SliderImage, Product } from '@prisma/client'

export class SliderEntity implements Slider {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  product?: Product

  @ApiProperty()
  images?: { id: number; name: string; path: string }[]
}

export class SliderCreateReqBody {
  @ApiProperty()
  name: string
}

export class SliderEditReqBody {
  @ApiProperty()
  name: string
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
