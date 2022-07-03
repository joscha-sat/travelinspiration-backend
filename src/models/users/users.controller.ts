import { Controller, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':userId/travelposts/:postId')
  addTravelpostToFavouritesList(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return this.usersService.addTravelpostToFavouritesList(userId, postId);
  }
}
