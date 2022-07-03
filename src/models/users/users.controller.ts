import { Controller, Get, Param, Put } from '@nestjs/common';
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

  @Get('favourites/:userId')
  getFavourites(@Param('userId') userId: string) {
    return this.usersService.getFavourites(userId);
  }
}
