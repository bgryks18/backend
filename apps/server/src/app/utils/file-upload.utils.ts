import { BadRequestException } from '@nestjs/common'
import { extname } from 'extname'
import { ErrorHandler } from './errorHandler'

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    callback(new BadRequestException('Desteklenmeyen dosya biçimi'), true)
  }
  callback(null, true)
}
export const editFileName = (req: any, file: any, callback: any) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  callback(null, uniqueSuffix + '' + file.originalname)
}
