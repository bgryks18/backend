import { Prisma } from '.prisma/client'

export type CategoryCreateInput = Prisma.CategoryCreateWithoutProductsInput

export interface CategoryWhereInput extends Prisma.CategoryWhereInput {
  sort?: 'asc' | 'desc'
  limit?: number
  offset?: number
  sortby: string
}
