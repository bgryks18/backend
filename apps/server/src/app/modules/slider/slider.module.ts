import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { PrismaService } from '../../globals/prisma.service'
import { GetListMiddleWare } from '../../middlewares/getList.middleware'
import { SliderController } from './slider.controller'
import { SliderService } from './slider.service'

@Module({
  controllers: [SliderController],
  providers: [PrismaService, SliderService],
})
export class SliderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetListMiddleWare).forRoutes({ path: 'slider', method: RequestMethod.GET })
  }
}
