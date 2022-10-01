import { Module } from '@nestjs/common'
import { CategoryModule } from './modules/category/category.module'
import { ProductModule } from './modules/product/product.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './utils/http-exception.filter'
import { AdminModule } from './modules/admin/admin.module'
@Module({
  imports: [CategoryModule, ProductModule, AdminModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
