import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { comparePasswords, toUserDto } from '../../shared/mapper';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { TravelpostService } from '../travelpost/travelpost.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => TravelpostService))
    private travelpostService: TravelpostService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({
      where: { username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.userRepo.create({
      username,
      password,
      email,
    });

    await this.userRepo.save(user);

    return user;
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new HttpException(
        'User or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException(
        'User or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }

  async addTravelpostToFavouritesList(userId: string, postId: string) {
    const travelpost = await this.travelpostService.getTravelPostById(postId);
    const user = await this.userRepo.findOne({
      relations: ['favouriteList'],
      where: { id: userId },
    });

    if (!user.favouriteList) {
      user.favouriteList = [];
    }
    if (!user.favouriteList.find((travelpost) => travelpost.id === postId)) {
      user.favouriteList.push(travelpost);
    }

    return this.userRepo.save(user);
  }

  async getFavourites(id: string) {
    const user = await this.userRepo.findOne({
      relations: ['favouriteList'],
      where: { id: id },
    });

    return user.favouriteList;
  }

  async deleteFavouriteById(userId: string, postId: string) {
    const user = await this.userRepo.findOne({
      relations: ['favouriteList'],
      where: { id: userId },
    });

    const index = user.favouriteList.findIndex((object) => {
      return object.id.toString() === postId;
    });

    user.favouriteList.splice(index, 1);

    return await this.userRepo.save(user);
  }
}
