import { Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { PrismaService } from '../../globals/prisma.service'
import { AdminCreateInput, AdminLoginInput, AdminWhereInput } from './admin.dto'
import { AdminDeletedResponse, AdminEntity, AdminListResponse, AdminLoginResponse } from './admin.model'
import { Locals } from '../../middlewares/getList.middleware'
import { ErrorHandler } from '../../utils/errorHandler'
import generateAccessToken from '../../utils/generateAccessToken'
import { isInteger, toNumber } from 'lodash'
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

  async login(loginAdminInput: AdminLoginInput, request: any, response: any): Promise<AdminLoginResponse> {
    try {
      await this.prisma.admin.findFirstOrThrow({
        where: {
          username: loginAdminInput.username,
          password: loginAdminInput.password,
        },
      })
      let expireTime = 86400000

      if (request.headers['expiretime'] && isInteger(toNumber(request.headers['expiretime']))) {
        expireTime = toNumber(request.headers['expiretime'])
      }
      const token = await generateAccessToken(loginAdminInput.username, expireTime)
      response.cookie('Authorization', 'Bearer ' + token, {
        expires: new Date(Date.now() + expireTime),
        httpOnly: true,
        path: '/',
      })
      return { token }
    } catch (e) {
      new ErrorHandler(e)
    }
  }

  async deleteMany(idList: number[]): Promise<AdminDeletedResponse> {
    try {
      await this.prisma.admin.deleteMany({
        where: {
          id: {
            in: idList,
          },
        },
      })
      return { message: 'Silindi.' }
    } catch (e) {
      new ErrorHandler(e)
    }
  }
}
