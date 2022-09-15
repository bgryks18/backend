import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  seoTitle: string;

  @ApiProperty()
  seoContent: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CategoryCreateReqBody {
  @ApiProperty()
  name: string;

  @ApiProperty()
  seoTitle: string;

  @ApiProperty()
  seoContent: string;
}

export class CategoryEditReqBody {
  @ApiProperty()
  name: string;

  @ApiProperty()
  seoTitle: string;

  @ApiProperty()
  seoContent: string;
}

export interface CategoryListResponse {
  data: CategoryEntity[];
  info: {
    count: number;
  };
}
