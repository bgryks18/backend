import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { PrismaService } from '../../globals/prisma.service'
import { GetListMiddleWare } from '../../middlewares/getList.middleware'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
  controllers: [AdminController],
  providers: [PrismaService, AdminService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetListMiddleWare).forRoutes({ path: 'admin', method: RequestMethod.GET })
  }
}
