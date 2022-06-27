import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travelpost } from './models/travelpost/travelpost.entity';
import { TravelpostModule } from './models/travelpost/travelpost.module';
import { Photo } from './models/photo/photo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PhotoModule } from './models/photo/photo.module';
import { UserService } from './models/user/user.service';
import { AuthModule } from './models/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '195.37.176.178',
      port: 20133,
      username: '21_DB_Grp_2',
      password: `pS!'NWkk5hrb84ijZr3EPJ2+qqd/aV*4`,
      database: '21_DB_Gruppe2_Projektmanagement',
      entities: [Travelpost, Photo],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './images',
    }),

    TravelpostModule,
    PhotoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
