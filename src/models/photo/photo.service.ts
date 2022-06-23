import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepo: Repository<Photo>,
  ) {}

  getPosts() {
    return this.photoRepo.find({
      relations: ['travelpost'],
    });
  }

  getPhotosByPostId(id: string) {
    return this.photoRepo.find({
      relations: ['travelpost'],
      where: { travelpost: { id: id } },
    });
  }
}
