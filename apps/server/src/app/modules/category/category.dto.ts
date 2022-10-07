import { Prisma } from '.prisma/client'

export type CategoryCreateInput = Prisma.CategoryUncheckedCreateInput

export interface CategoryWhereInput extends Prisma.CategoryWhereInput {
  sort?: 'asc' | 'desc'
  limit?: number
  offset?: number
  sortby: string
}
