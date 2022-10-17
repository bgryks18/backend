import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { CategoryModule } from './modules/category/category.module'
import { ProductModule } from './modules/product/product.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './utils/http-exception.filter'
import { AdminModule } from './modules/admin/admin.module'
import { AuthMiddleWare } from './middlewares/auth.middleware'
import { SliderModule } from './modules/slider/slider.module'
import { SliderImageModule } from './modules/sliderImage/sliderImage.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ProductImageModule } from './modules/productImage/productImage.module'
@Module({
  imports: [
    CategoryModule,
    ProductModule,
    AdminModule,
    SliderModule,
    SliderImageModule,
    ProductImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    /* category */
    consumer.apply(AuthMiddleWare).forRoutes({ path: 'category', method: RequestMethod.POST })
    consumer
      .apply(AuthMiddleWare)
      .forRoutes(
        { path: 'category/:id', method: RequestMethod.PUT },
        { path: 'category/:id', method: RequestMethod.DELETE },
        { path: 'category/delete/many', method: RequestMethod.DELETE },
      )

    /* product */
    consumer.apply(AuthMiddleWare).forRoutes({ path: 'product', method: RequestMethod.POST })
    consumer
      .apply(AuthMiddleWare)
      .forRoutes(
        { path: 'product/:id', method: RequestMethod.PUT },
        { path: 'product/:id', method: RequestMethod.DELETE },
        { path: 'product/delete/many', method: RequestMethod.DELETE },
      )

    /* admin */
    consumer.apply(AuthMiddleWare).forRoutes({ path: 'admin', method: RequestMethod.POST })
    consumer
      .apply(AuthMiddleWare)
      .forRoutes(
        { path: 'admin/:id', method: RequestMethod.PUT },
        { path: 'admin/:id', method: RequestMethod.DELETE },
        { path: 'admin/delete/many', method: RequestMethod.DELETE },
      )

    /* slider */
    consumer.apply(AuthMiddleWare).forRoutes({ path: 'slider', method: RequestMethod.POST })
    consumer
      .apply(AuthMiddleWare)
      .forRoutes(
        { path: 'slider/:id', method: RequestMethod.PUT },
        { path: 'slider/:id', method: RequestMethod.DELETE },
        { path: 'slider/delete/many', method: RequestMethod.DELETE },
      )

    /* sliderImage */
    consumer.apply(AuthMiddleWare).forRoutes({ path: 'sliderImage', method: RequestMethod.POST })
    consumer
      .apply(AuthMiddleWare)
      .forRoutes(
        { path: 'sliderImage/:id', method: RequestMethod.PUT },
        { path: 'sliderImage/:id', method: RequestMethod.DELETE },
        { path: 'sliderImage/delete/many', method: RequestMethod.DELETE },
      )

    /* productImage */
    consumer.apply(AuthMiddleWare).forRoutes({ path: 'productImage', method: RequestMethod.POST })
    consumer
      .apply(AuthMiddleWare)
      .forRoutes(
        { path: 'productImage/:id', method: RequestMethod.PUT },
        { path: 'productImage/:id', method: RequestMethod.DELETE },
        { path: 'productImage/delete/many', method: RequestMethod.DELETE },
      )
  }
}
