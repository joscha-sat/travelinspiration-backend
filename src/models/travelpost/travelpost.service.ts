import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Travelpost } from './travelpost.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Injectable()
export class TravelpostService {
  constructor(
    @InjectRepository(Travelpost)
    private travelPostRepo: Repository<Travelpost>,
    @InjectRepository(Photo)
    private photoRepo: Repository<Photo>,
  ) {}

  // ADD TRAVEL POST  ------------------------------------------------------//
  async addTravelPost(travelpost: Travelpost, photos: any[]) {
    const myPhotos: any[] = [];

    for (let i = 0; i < photos.length; i++) {
      const photo = await this.photoRepo.save({ url: photos[i].filename });
      myPhotos.push(photo);
    }

    travelpost.photos = myPhotos;

    return await this.travelPostRepo.save(travelpost);
  }

  // GET ALL TRAVEL POSTS  ------------------------------------------------------//
  getTravelPosts(): Promise<Travelpost[]> {
    return this.travelPostRepo.find();
  }

  // GET ALL TRAVEL POSTS OF ONE STATE  ------------------------------------------------------//
  getTravelPostByState(state: string): Promise<Travelpost[]> {
    return this.travelPostRepo.find({ where: { state: state } });
  }

  // GET ONE TRAVEL POSTS BY ID  ------------------------------------------------------//
  getTravelPostById(id: string): Promise<Travelpost> {
    return this.travelPostRepo.findOne({ where: { id } });
  }

  // PATCH TRAVEL POSTS  ------------------------------------------------------//
  updateTravelPostById(
    id: string,
    updateTravelPost: Travelpost,
  ): Promise<UpdateResult> {
    return this.travelPostRepo.update(id, updateTravelPost);
  }

  // DELETE ALL TRAVEL POSTS  ------------------------------------------------------//
  deleteAllTravelPosts(): Promise<void> {
    return this.travelPostRepo.clear();
  }

  // DELETE ONE TRAVEL POSTS BY ID  ------------------------------------------------------//
  deleteTravelPostsById(id: string): Promise<DeleteResult> {
    return this.travelPostRepo.delete(id);
  }
}
