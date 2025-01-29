import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  createOne(userDto: any): Promise<any> {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  async findOneWithProfileById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['profile'] });
    delete user['password'];
    return user;
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
}
