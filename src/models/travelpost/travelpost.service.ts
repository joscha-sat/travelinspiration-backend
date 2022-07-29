import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Travelpost } from './travelpost.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TravelpostService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
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

  // GET ALL TRAVEL POSTS OF ONE STATE  ------------------------------------------------------//
  getTravelPostByState(state: string): Promise<Travelpost[]> {
    return this.travelPostRepo.find({ where: { state: state } });
  }

  // GET ALL TRAVEL POSTS OF ONE USER  ------------------------------------------------------//
  getTravelPostByUserId(userId: string): Promise<Travelpost[]> {
    return this.travelPostRepo.find({ where: { userId: userId } });
  }

  // GET ONE TRAVEL POSTS BY ID  ------------------------------------------------------//
  getTravelPostById(id: string): Promise<Travelpost> {
    return this.travelPostRepo.findOne({ where: { id } });
  }

  // UPDATE ONE TRAVEL POST  ------------------------------------------------------//
  updateTravelPostById(
    id: string,
    updateTravelPost: Travelpost,
  ): Promise<UpdateResult> {
    return this.travelPostRepo.update(id, updateTravelPost);
  }

  // DELETE TRAVEL POST BY ID  ------------------------------------------------------//
  deleteOneTravelPost(id: string): Promise<DeleteResult> {
    return this.travelPostRepo.delete(id);
  }
}
