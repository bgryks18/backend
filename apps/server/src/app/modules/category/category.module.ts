import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { PrismaService } from '../../globals/prisma.service'
import { GetListMiddleWare } from '../../middlewares/getList.middleware'
import { CategoryFilterMiddleWare } from '../../middlewares/categoryFilter.middleware'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService],
})
export class CategoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetListMiddleWare).forRoutes({ path: 'category', method: RequestMethod.GET })
    consumer.apply(CategoryFilterMiddleWare).forRoutes({ path: 'category', method: RequestMethod.GET })
  }
}
