import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Travelpost } from './travelpost.entity';
import { TravelpostService } from './travelpost.service';
import { UpdateResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';
import { diskStorage } from 'multer';

@Controller('travelpost')
export class TravelpostController {
  constructor(private travelPostService: TravelpostService) {}

  //  UPLOAD POST WITH IMAGE
  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async addPost(@Body() post: Travelpost, @UploadedFiles() files) {
    return await this.travelPostService.addTravelPost(post, files);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.travelPostService.getTravelPostById(id);
  }

  @Get('/state/:state')
  getTravelPostByState(@Param('state') state: string) {
    return this.travelPostService.getTravelPostByState(state);
  }

  @Get('/user/:userId')
  getTravelPostByUserId(
    @Param('userId') userId: string,
  ): Promise<Travelpost[]> {
    return this.travelPostService.getTravelPostByUserId(userId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateTravelPost: Travelpost,
  ): Promise<UpdateResult> {
    return this.travelPostService.updateTravelPostById(id, updateTravelPost);
  }

  @Delete(':id')
  deleteOneTravelPost(@Param() id: string) {
    return this.travelPostService.deleteOneTravelPost(id);
  }

  // IMAGE

  @Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images' });
  }
}
