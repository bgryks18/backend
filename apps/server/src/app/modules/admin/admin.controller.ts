import { Body, Controller, Get, Param, Post, Put, Delete, Query, Res, UsePipes, Header, Req } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQueryOptions, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger'
import { YupValidationPipe } from '../../pipes/yup-validation.pipe'
import { AdminCreateInput, AdminLoginInput, AdminWhereInput } from './admin.dto'
import {
  AdminCreateReqBody,
  AdminEditReqBody,
  AdminEntity,
  AdminListResponse,
  AdminDeletedResponse,
  AdminLoginResponse,
  AdminLoginBody,
  AdminDeleteManyReqBody,
} from './admin.model'
import { AdminService } from './admin.service'
import { AdminCreateSchema, AdminLoginSchema } from '../../utils/admin.validator'

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiBody({
    type: AdminCreateReqBody,
  })
  @UsePipes(new YupValidationPipe(AdminCreateSchema))
  @ApiCreatedResponse({ type: AdminEntity })
  async create(@Body() data: AdminCreateInput): Promise<AdminEntity> {
    return this.adminService.create(data)
  }

  @Get()
  @ApiQuery({
    name: 'sort',
    description: 'Sıralama tipi',
    type: 'string',
    enum: ['asc', 'desc'],
    required: false,
  } as ApiQueryOptions)
  @ApiQuery({
    name: 'sortby',
    description: 'Sıralama Fieldı',
    required: false,
    type: 'string',
  } as ApiQueryOptions)
  @ApiQuery({
    name: 'limit',
    description: 'Limit',
    required: false,
    type: 'integer',
  } as ApiQueryOptions)
  @ApiQuery({
    name: 'offset',
    description: 'Offset',
    required: false,
    type: 'string',
  } as ApiQueryOptions)
  @ApiOkResponse({ type: AdminEntity, isArray: true })
  async list(@Res({ passthrough: true }) res: any, @Query() where: AdminWhereInput): Promise<AdminListResponse> {
    return this.adminService.list(where, res.locals)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: AdminEntity })
  async detail(
    @Param()
    params: {
      id: number
    },
  ): Promise<AdminEntity> {
    return this.adminService.detail(Number(params.id))
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBody({
    type: AdminEditReqBody,
  })
  @UsePipes(new YupValidationPipe(AdminCreateSchema))
  @ApiOkResponse({ type: AdminEntity })
  async edit(@Body() data: AdminCreateInput, @Param() params: { id: number }): Promise<AdminEntity> {
    return this.adminService.edit(Number(params.id), data)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiOkResponse({ type: AdminDeletedResponse })
  async delete(@Param() params: { id: number }): Promise<AdminDeletedResponse> {
    return this.adminService.delete(Number(params.id))
  }

  @Post('login')
  @ApiBody({
    type: AdminLoginBody,
  })
  @UsePipes(new YupValidationPipe(AdminLoginSchema))
  @ApiCreatedResponse({ type: AdminLoginResponse })
  async login(
    @Body() data: AdminLoginInput,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AdminLoginResponse> {
    return this.adminService.login(data, request, response)
  }

  @Delete('/delete/many')
  @ApiBody({
    type: AdminDeleteManyReqBody,
  })
  @ApiOkResponse({ type: AdminDeletedResponse })
  async deleteMany(@Body() data: { idList: any[] }): Promise<AdminDeletedResponse> {
    return this.adminService.deleteMany(data.idList.map((item: any) => Number(item)))
  }
}
