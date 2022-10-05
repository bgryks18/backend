import { ApiProperty } from '@nestjs/swagger'
import { Product } from '@prisma/client'

export class ProductEntity implements Product {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  categoryId: number

  @ApiProperty()
  description: string

  @ApiProperty()
  priority: number

  @ApiProperty()
  sliderId: number

  @ApiProperty()
  posterId: number

  @ApiProperty()
  seoTitle: string

  @ApiProperty()
  seoContent: string
}

export class ProductCreateReqBody {
  @ApiProperty()
  name: string

  @ApiProperty()
  categoryId: number

  @ApiProperty()
  description: string

  @ApiProperty()
  priority: number

  @ApiProperty()
  sliderId: number

  @ApiProperty()
  posterId: number

  @ApiProperty()
  seoTitle: string

  @ApiProperty()
  seoContent: string
}

export class ProductEditReqBody {
  @ApiProperty()
  name: string

  @ApiProperty()
  categoryId: number

  @ApiProperty()
  description: string

  @ApiProperty()
  priority: number

  @ApiProperty()
  sliderId: number

  @ApiProperty()
  posterId: number

  @ApiProperty()
  seoTitle: string

  @ApiProperty()
  seoContent: string
}

export interface ProductListResponse {
  data: ProductEntity[]
  info: {
    count: number
  }
}

export class ProductDeletedResponse {
  @ApiProperty()
  message: 'Silindi.' | 'Bir hata oluştu.'
}
