import { Prisma } from '.prisma/client'

export type SliderCreateInput = Prisma.SliderCreateInput

export interface SliderWhereInput extends Prisma.SliderWhereInput {
  sort?: 'asc' | 'desc'
  limit?: number
  offset?: number
  sortby: string
}
