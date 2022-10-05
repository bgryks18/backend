import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { PrismaService } from '../../globals/prisma.service'
import { GetListMiddleWare } from '../../middlewares/getList.middleware'
import { SliderImageController } from './sliderImage.controller'
import { SliderImageService } from './sliderImage.service'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  controllers: [SliderImageController],
  providers: [PrismaService, SliderImageService],
  imports: [MulterModule.register({ dest: 'uploads', limits: { fileSize: 1 * 1024 * 1024 } })],
})
export class SliderImageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetListMiddleWare).forRoutes({ path: 'sliderImage', method: RequestMethod.GET })
  }
}
