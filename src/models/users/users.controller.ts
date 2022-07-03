import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('addFavPost')
  addTravelpostToFavouritesList(
    @Body('userId') userId: string,
    @Body('postId') postId: string,
  ) {
    return this.usersService.addTravelpostToFavouritesList(userId, postId);
  }

  @Put('delete/favPost')
  DeleteFavouritesById(
    @Body('userId') userId: string,
    @Body('postId') postId: string,
  ) {
    console.log(userId, postId);
    this.usersService.deleteFavouriteById(userId, postId).then();
    return null;
  }

  @Get('favourites/:userId')
  getFavourites(@Param('userId') userId: string) {
    return this.usersService.getFavourites(userId);
  }
}
