import { Prisma } from '.prisma/client'

export type SliderImageCreateInput = Prisma.SliderImageCreateInput

export interface SliderImageWhereInput extends Prisma.SliderImageWhereInput {
  sort?: 'asc' | 'desc'
  limit?: number
  offset?: number
  sortby: string
}
