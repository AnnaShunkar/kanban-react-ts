import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { User } from '../../database/entities';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findByName(name: string) {
    return this.usersRepository.findOne({ where: { name } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      id: randomUUID(),
      ...createUserDto,
    });
    return this.usersRepository.save(user);
  }
}
