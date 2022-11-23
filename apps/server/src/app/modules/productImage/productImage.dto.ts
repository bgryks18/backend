import { Prisma } from '.prisma/client'

export type ProductImageCreateInput = Prisma.ProductImageCreateInput

export interface ProductImageWhereInput extends Prisma.ProductImageWhereInput {
  sort?: 'asc' | 'desc'
  limit?: number
  offset?: number
  sortby?: string
}
