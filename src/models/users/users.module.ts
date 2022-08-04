import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { UsersController } from './users.controller';
import { TravelpostModule } from '../travelpost/travelpost.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TravelpostModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
