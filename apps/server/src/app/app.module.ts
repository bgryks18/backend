import { Module } from '@nestjs/common'
import { CategoryModule } from './modules/category/category.module'
import { ProductModule } from './modules/product/product.module'

@Module({
  imports: [CategoryModule, ProductModule],
})
export class AppModule {}
