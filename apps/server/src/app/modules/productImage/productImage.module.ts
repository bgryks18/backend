import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { PrismaService } from '../../globals/prisma.service'
import { GetListMiddleWare } from '../../middlewares/getList.middleware'
import { ProductImageController } from './productImage.controller'
import { ProductImageService } from './productImage.service'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  controllers: [ProductImageController],
  providers: [PrismaService, ProductImageService],
  imports: [MulterModule.register({ dest: 'uploads', limits: { fileSize: 1 * 1024 * 1024 } })],
})
export class ProductImageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetListMiddleWare).forRoutes({ path: 'productImage', method: RequestMethod.GET })
  }
}
