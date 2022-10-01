import { Prisma } from '.prisma/client'

export type AdminCreateInput = Prisma.AdminCreateInput

export interface AdminWhereInput extends Prisma.AdminWhereInput {
  sort?: 'asc' | 'desc'
  limit?: number
  offset?: number
  sortby: string
}

export interface AdminLoginInput {
  username: string
  password: string
}
