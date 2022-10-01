import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { AdminCreateInput, AdminLoginInput, AdminWhereInput } from './admin.dto'
import { AdminDeletedResponse, AdminEntity, AdminListResponse, AdminLoginResponse } from './admin.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminInput: AdminCreateInput): Promise<AdminEntity> {
    try {
      return await this.prisma.admin.create({
        data: createAdminInput,
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async list(where: AdminWhereInput, locals: Locals): Promise<AdminListResponse> {
    try {
      const res = await this.prisma.admin.findMany({
        where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
        orderBy: { [locals.sortby]: locals.sort },
        skip: locals.offset,
        take: locals.limit,
      })
      return {
        data: res,
        info: {
          count: await this.prisma.admin.count({
            where: omit(where, ['offset', 'limit', 'sort', 'sortby']),
            skip: locals.offset,
            take: locals.limit,
          }),
        },
      }
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async detail(id: number): Promise<AdminEntity> {
    try {
      return await this.prisma.admin.findFirstOrThrow({ where: { id: id } })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async edit(id: number, editAdminInput: AdminCreateInput): Promise<AdminEntity> {
    try {
      return await this.prisma.admin.update({
        where: {
          id,
        },
        data: editAdminInput,
      })
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async delete(id: number): Promise<AdminDeletedResponse> {
    try {
      await this.prisma.admin.delete({
        where: {
          id,
        },
      })
      return { message: 'Silindi.' }
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async login(loginAdminInput: AdminLoginInput): Promise<AdminLoginResponse> {
    try {
      console.log('c', loginAdminInput)
      return
    } catch (e) {
      new ErrorHandler(e)
    }
  }
}
