import { HttpException, Injectable } from '@nestjs/common';
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

  async findOne(ClientId: string): Promise<UserModel> {
    const User = await this.user_repository.findOne({
      where: { ClientId: ClientId }
    });

    if (User) { return User; }

    else { throw new HttpException('User not found', 404); }
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

  async update(ClientId: string, updateUserDto: UpdateUserDto) {
    const User = await this.findOne(ClientId);

    if (User) {
      const result = await this.user_repository.update({ ClientId }, { ...updateUserDto });

      return (result && result.affected === 1) ? updateUserDto : {};
    }

    else { throw new HttpException('User not found', 404); }
  }

  async remove(ClientId: string) {
    const User: any = await this.findOne(ClientId);

    if (User && User.Id) {
      const result = await this.user_repository.delete(User.Id);

      return (result && result.affected === 1) ? true : false;
    }

    else { throw new HttpException('User not found', 404); }
  }
}
