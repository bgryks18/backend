import { BadRequestException, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
export class ErrorHandler {
  constructor(e: any) {
    if (typeof e === 'string') {
      fs.appendFileSync('./apps/server/src/app/logs/error.log', '\n ----' + e + '\n ---- \n')
      throw new HttpException({ message: e }, 500)
    } else {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        fs.appendFileSync('./apps/server/src/app/logs/error.log', '\n ----' + e.message + '\n ---- \n')
        // The .code property can be accessed in a type-safe manner
        let errorObj = {}
        let errorCode = 0
        switch (e.code) {
          case 'P1000':
            errorObj = {
              message:
                'Authentication failed against database server at {database_host}, the provided database credentials for {database_user} are not valid. Please make sure to provide valid database credentials for the database server at {database_host}',
            }
            errorCode = 500
            break

          case 'P1001':
            errorObj = {
              message:
                "Can't reach database server at {database_host}:{database_port} Please make sure your database server is running at {database_host}:{database_port}.",
            }
            errorCode = 500
            break

          case 'P1002':
            errorObj = {
              message:
                'The database server at {database_host}:{database_port} was reached but timed out. Please try again. Please make sure your database server is running at {database_host}:{database_port}.',
            }
            errorCode = 500
            break

          case 'P1003':
            errorObj = { message: 'Database {database_file_name} does not exist at {database_file_path}.' }
            errorCode = 500
            break

          case 'P1008':
            errorObj = { message: 'Operations timed out after {time}' }
            errorCode = 500
            break

          case 'P1009':
            errorObj = {
              message: 'Database {database_name} already exists on the database server at {database_host}:{database_port}',
            }
            errorCode = 500
            break

          case 'P1010':
            errorObj = { message: 'User {database_user} was denied access on the database {database_name}' }
            errorCode = 500
            break

          case 'P1011':
            errorObj = { message: 'Error opening a TLS connection: {message}' }
            errorCode = 500
            break

          case 'P1012':
            errorObj = { message: 'An error occured.' }
            errorCode = 500
            break

          case 'P1013':
            errorObj = { message: 'The provided database string is invalid.' }
            errorCode = 500
            break

          case 'P1014':
            errorObj = { message: 'The underlying {kind} for model {model} does not exist.' }
            errorCode = 500
            break

          case 'P1015':
            errorObj = { message: 'Your Prisma schema is using features that are not supported for the version of the database.' }
            errorCode = 500
            break

          case 'P1016':
            errorObj = { message: 'Your raw query had an incorrect number of parameters.' }
            errorCode = 500
            break

          case 'P1017':
            errorObj = { message: 'Server has closed the connection.' }
            errorCode = 500
            break

          case 'P2000':
            errorObj = { message: 'Alanın değeri çok uzun.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2001':
            errorObj = { message: 'Bu koşul için aranan kayıt bulunamadı.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2002':
            errorObj = { message: 'Aynı isimde bir kayıt zaten var.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2003':
            errorObj = { message: 'Foreign key constraint failed on the field.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2004':
            errorObj = { message: 'A constraint failed on the database.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2005':
            errorObj = { message: 'Verinin tipi uyumlu değil.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2006':
            errorObj = { message: 'Veri geçerli değil.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2007':
            errorObj = { message: 'Veri validasyonu hatası.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2008':
            errorObj = { message: 'Sorgu hatası.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2008':
            errorObj = { message: 'Sorgu başarısız.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2009':
            errorObj = { message: 'Sorgu validasyonu başarısız.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2010':
            errorObj = { message: 'Sorgu başarısız.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2011':
            errorObj = { message: 'Zorunlu değer girilmemiş.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2012':
            errorObj = { message: 'Null değer ihlali.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2013':
            errorObj = { message: 'Zorunlu argüman girilmemiş.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2014':
            errorObj = { message: 'Yapmaya çalıştığınız değişiklik, ilişkilendirmeyi ihlal edebilir.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2015':
            errorObj = { message: 'İlişkili veri bulunamadı.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2016':
            errorObj = { message: 'Sorgu yorumlama hatası oluştu.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2017':
            errorObj = { message: 'İlişki için kayıtlar arasında bağlantı kurulamadı.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2018':
            errorObj = { message: 'Gerekli bağlantı kayıtları bulunamadı.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2019':
            errorObj = { message: 'Input error.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2020':
            errorObj = { message: 'Value out of range for the type.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2021':
            errorObj = { message: 'Table bulunamadı.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2022':
            errorObj = { message: 'Column bulunamadı.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2023':
            errorObj = { message: 'Tutarsız column verisi.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2024':
            errorObj = { message: 'Bağlantı kurulması zaman aşımına uğradı..', field: e.meta.target }
            errorCode = 500
            break

          case 'P2025':
            errorObj = {
              message: 'İşlem başarısız çünkü bu işlem zorunlu olan ama bulunamayan bir veya daha fazla kayıta bağlı.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P2026':
            errorObj = { message: 'Şuanki veritabanı bu sorgunun kullandığı teknolojiyi desteklemiyor.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2027':
            errorObj = { message: 'Sorgu çalıştırılma esnasında birden fazla hata meydana geldi.', field: e.meta.target }
            errorCode = 500
            break

          case 'P2030':
            errorObj = {
              message: 'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P2031':
            errorObj = {
              message:
                'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P2033':
            errorObj = {
              message:
                'A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you are trying to store large integers.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3000':
            errorObj = { message: 'Veritabanı kurulumu başarısız.', field: e.meta.target }
            errorCode = 500
            break

          case 'P3001':
            errorObj = { message: 'Migration possible with destructive changes and possible data loss.', field: e.meta.target }
            errorCode = 500
            break

          case 'P3002':
            errorObj = { message: 'The attempted migration was rolled back.', field: e.meta.target }
            errorCode = 500
            break

          case 'P3003':
            errorObj = {
              message:
                'The format of migrations changed, the saved migrations are no longer valid. To solve this problem, please follow the steps at: https://pris.ly/d/migrate.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3004':
            errorObj = {
              message:
                'The {database_name} database is a system database, it should not be altered with prisma migrate. Please connect to another database.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3005':
            errorObj = {
              message:
                'The database schema for {database_name} is not empty. Read more about how to baseline an existing production database: https://pris.ly/d/migrate-baseline',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3006':
            errorObj = {
              message: 'Migration {migration_name} failed to apply cleanly to the shadow database.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3007':
            errorObj = {
              message:
                'Some of the requested preview features are not yet allowed in migration engine. Please remove them from your data model before using migrations.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3008':
            errorObj = {
              message: 'The migration {migration_name} is already recorded as applied in the database.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3009':
            errorObj = {
              message:
                'migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3010':
            errorObj = {
              message: 'The name of the migration is too long. It must not be longer than 200 characters (bytes).',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3011':
            errorObj = {
              message:
                'Migration {migration_name} cannot be rolled back because it was never applied to the database. Hint: did you pass in the whole migration name? (example: "20201207184859_initial_migration")',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3012':
            errorObj = {
              message: 'Migration {migration_name} cannot be rolled back because it is not in a failed state.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3013':
            errorObj = {
              message:
                'Datasource provider arrays are no longer supported in migrate. Please change your datasource to use a single provider. Read more at https://pris.ly/multi-provider-deprecation',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3014':
            errorObj = {
              message:
                'Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases. More info: https://pris.ly/d/migrate-shadow.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3015':
            errorObj = {
              message:
                'Could not find the migration file at {migration_file_path}. Please delete the directory or restore the migration file.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3016':
            errorObj = {
              message:
                'The fallback method for database resets failed, meaning Migrate could not clean up the database entirely.',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3017':
            errorObj = {
              message:
                'The migration {migration_name} could not be found. Please make sure that the migration exists, and that you included the whole name of the directory. (example: "20201207184859_initial_migration")',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3018':
            errorObj = {
              message:
                'A migration failed to apply. New migrations can not be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3019':
            errorObj = {
              message:
                'The datasource provider {provider} specified in your schema does not match the one specified in the migration_lock.toml, {expected_provider}. Please remove your current migration directory and start a new migration history with prisma migrate dev. Read more: https://pris.ly/d/migrate-provider-switch',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3020':
            errorObj = {
              message:
                'The automatic creation of shadow databases is disabled on Azure SQL. Please set up a shadow database using the shadowDatabaseUrl datasource attribute. Read the docs page for more details: https://pris.ly/d/migrate-shadow',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3021':
            errorObj = {
              message:
                'Foreign keys cannot be created on this database. Learn more how to handle this: https://pris.ly/d/migrate-no-foreign-keys',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P3022':
            errorObj = {
              message:
                'Direct execution of DDL (Data Definition Language) SQL statements is disabled on this database. Please read more here about how to handle this: https://pris.ly/d/migrate-no-direct-ddl',
              field: e.meta.target,
            }
            errorCode = 500
            break

          case 'P4000':
            errorObj = { message: 'Introspection operation failed to produce a schema file.', field: e.meta.target }
            errorCode = 500
            break

          case 'P4001':
            errorObj = { message: 'The introspected database was empty.', field: e.meta.target }
            errorCode = 500
            break

          case 'P4002':
            errorObj = { message: 'The schema of the introspected database was inconsistent.', field: e.meta.target }
            errorCode = 500
            break

          default:
            errorObj = { message: 'Bir hata oluştu.', field: e.meta.target }
            break
        }
        throw new HttpException({ ...errorObj, prismaCode: e.code }, errorCode)
      } else {
        fs.appendFileSync('./apps/server/src/app/logs/error.log', '\n ----' + 'Bir hata oluştu.' + '\n ---- \n')
        throw new HttpException({ message: 'Bir hata oluştu' }, 500)
      }
    }
  }
}
