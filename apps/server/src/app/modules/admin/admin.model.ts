import { ApiProperty } from '@nestjs/swagger'
import { Admin } from '@prisma/client'

export class AdminEntity implements Admin {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  password: string

  @ApiProperty()
  email: string

  @ApiProperty()
  createdAt: Date
}

export class AdminCreateReqBody {
  @ApiProperty()
  username: string

  @ApiProperty()
  password: string

  @ApiProperty()
  email: string
}

export class AdminEditReqBody {
  @ApiProperty()
  username: string

  @ApiProperty()
  password: string

  @ApiProperty()
  email: string
}

export class AdminLoginBody {
  @ApiProperty()
  username: string

  @ApiProperty()
  password: string
}

export interface AdminListResponse {
  data: AdminEntity[]
  info: {
    count: number
  }
}

export class AdminDeletedResponse {
  @ApiProperty()
  message: 'Silindi.' | 'Bir hata oluştu.'
}

export class AdminLoginResponse {
  @ApiProperty()
  token: string
}
