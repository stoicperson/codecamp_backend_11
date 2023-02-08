import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUserServiceCreate,
  IUserServiceDelete,
  IUserServiceFindOne,
  IUserServiceFindOneByEmail,
  IUserServiceGetHasedPwd,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne({ userId }: IUserServiceFindOne): Promise<User> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  getHasedPwd({ pwd }: IUserServiceGetHasedPwd): Promise<string> {
    return bcrypt.hash(pwd, 10);
  }
  async create({ createUserInput }: IUserServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({ email: createUserInput.email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPwd = await this.getHasedPwd({ pwd: createUserInput.pwd });
    return this.usersRepository.save({
      ...createUserInput,
      pwd: hashedPwd,
    });
  }
  async update({ userId, updateUserInput }) {
    const user = await this.findOne({ userId });

    return this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }
  async delete({ userId }: IUserServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }
  findOneByEmail({ email }: IUserServiceFindOneByEmail) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}
