import { ApiProperty } from '@nestjs/swagger'
import { ProductImage, Product } from '@prisma/client'

export class ProductImageEntity implements ProductImage {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  path: string

  @ApiProperty()
  product: Product
}

export class ProductImageCreateReqBody {
  @ApiProperty()
  name: string

  @ApiProperty()
  path: string
}

export class ProductImageEditReqBody {
  @ApiProperty()
  name: string

  @ApiProperty()
  path: string
}

export class ProductImageDeleteManyReqBody {
  @ApiProperty()
  idList: number[]
}

export interface ProductImageListResponse {
  data: ProductImageEntity[]
  info: {
    count: number
  }
}

export class ProductImageDeletedResponse {
  @ApiProperty()
  message: 'Silindi.' | 'Bir hata oluştu.'
}
