import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { IUserRepository } from './interfaces/user-repository.interface';
import { MongooseUsersRepository } from './repositories/mongoose-users.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [
    UsersService,
    {
      provide: IUserRepository,
      useClass: MongooseUsersRepository,
    }
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
