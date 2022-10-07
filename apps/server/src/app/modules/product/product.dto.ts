import { Prisma } from '.prisma/client'

export type ProductCreateInput = Prisma.ProductUncheckedCreateInput

export interface ProductWhereInput extends Prisma.ProductWhereInput {
  sort?: 'asc' | 'desc'
  limit?: number
  offset?: number
  sortby: string
}
