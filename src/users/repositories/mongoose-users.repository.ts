import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { MongooseRepository } from '../../core/repositories/mongoose.repository';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class MongooseUsersRepository extends MongooseRepository<UserDocument> implements IUserRepository {
    constructor(@InjectModel(User.name) private userModel_: Model<UserDocument>) {
        super(userModel_);
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel_.findOne({ email }).exec();
    }
}
