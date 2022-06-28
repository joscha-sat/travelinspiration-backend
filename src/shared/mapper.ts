import { User } from '../models/users/user.entity';
import { UserDto } from '../models/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

export const toUserDto = (data: User): UserDto => {
  const { id, username, email } = data;
  return { id, username, email };
};

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};
