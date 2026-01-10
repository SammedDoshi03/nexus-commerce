import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UsersService {
    constructor(private usersRepository: IUserRepository) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...rest } = createUserDto;
        const passwordHash = await bcrypt.hash(password, 10);
        // We need to create the object to pass to repository. 
        // Repository create expects T or any. 
        // Since strict typing usually implies DTO -> Entity conversion:
        const userToCreate = { ...rest, passwordHash };
        return this.usersRepository.create(userToCreate);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneByEmail(email);
    }
}
