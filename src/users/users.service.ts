import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetTaskListDto } from './dto/get-user.dto';
import { UserModel } from './models/user.model';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly user_repository: Repository<User>
  ) { }

  async findAll(): Promise<UserModel[]> {
    return await this.user_repository.find();
  }

  async find(getTaskListDto: GetTaskListDto): Promise<UserModel[]> {
    let User = await this.findAll();

    const { FirstName, LastName, PhoneNumber } = getTaskListDto;

    if (FirstName) {
      User = User.filter((item: any) => item.FirstName.toLowerCase().includes(FirstName));
    }

    return User;
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    createUserDto.Password = await bcrypt.hash(createUserDto.Password, 10);

    const User: UserModel = {
      ClientId: uuid(),
      FirstName: createUserDto.FirstName,
      LastName: createUserDto.LastName,
      Email: createUserDto.Email,
      Password: createUserDto.Password,
      PhoneNumber: createUserDto.PhoneNumber,
      ProfileImageFile: createUserDto.ProfileImageFile,
    }

    await this.user_repository.create(User);

    this.user_repository.save(User);

    return User;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByPhoneNumber(PhoneNumber: string): Promise<UserModel> {
    return await this.user_repository.findOne({
      select: {
        Password: true,
        ClientId: true,
        PhoneNumber: true,
        Email: true,
        FirstName: true,
        LastName: true,
      },
      where: { PhoneNumber: PhoneNumber }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
