import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travelpost } from './travelpost.entity';
import { TravelpostController } from './travelpost.controller';
import { TravelpostService } from './travelpost.service';
import { Photo } from '../photo/photo.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Travelpost, Photo])],
  controllers: [TravelpostController],
  providers: [TravelpostService],
})
export class TravelpostModule {}
