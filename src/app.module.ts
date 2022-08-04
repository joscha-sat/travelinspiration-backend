import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travelpost } from './models/travelpost/travelpost.entity';
import { TravelpostModule } from './models/travelpost/travelpost.module';
import { Photo } from './models/photo/photo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PhotoModule } from './models/photo/photo.module';
import { AuthModule } from './models/auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { User } from './models/users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '195.37.176.178',
      port: 20133,
      username: '21_DB_Grp_2',
      password: `pS!'NWkk5hrb84ijZr3EPJ2+qqd/aV*4`,
      database: '21_DB_Gruppe2_Projektmanagement',
      entities: [Travelpost, Photo, User],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './images',
    }),
    ConfigModule.forRoot(),
    TravelpostModule,
    PhotoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
