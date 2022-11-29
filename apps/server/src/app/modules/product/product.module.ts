import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { PrismaService } from '../../globals/prisma.service'
import { GetListMiddleWare } from '../../middlewares/getList.middleware'
import { ProductFilterMiddleWare } from '../../middlewares/productFilter.middleware'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetListMiddleWare).forRoutes({ path: 'product', method: RequestMethod.GET })
    consumer.apply(ProductFilterMiddleWare).forRoutes({ path: 'product', method: RequestMethod.GET })
  }
}
