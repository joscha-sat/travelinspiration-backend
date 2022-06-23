import { Controller, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get()
  getPosts() {
    console.log('hallo');
    return this.photoService.getPosts();
  }

  @Get(':id')
  async getPhotosByPostId(@Param('id') id: string) {
    console.log('hallo');

    const result = await this.photoService.getPhotosByPostId(id);

    const resultUrls = [];

    for (let i = 0; i < result.length; i++) {
      resultUrls.push(result[i].url);
    }

    return resultUrls;
  }
}
