import { ApiProperty } from '@nestjs/swagger'
import { Prisma, Category, Slider, ProductImage } from '@prisma/client'

export class ProductEntity {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  category: Category

  @ApiProperty()
  description: string

  @ApiProperty()
  priority: number

  @ApiProperty()
  slider: Slider

  @ApiProperty()
  poster: ProductImage

  @ApiProperty()
  seoTitle: string

  @ApiProperty()
  seoContent: string
}

export class ProductCreateReqBody implements Prisma.ProductCreateInput {
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

export class ProductDeleteManyReqBody {
  @ApiProperty()
  idList: number[]
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
