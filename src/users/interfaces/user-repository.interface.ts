import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';
import { User } from '../schemas/user.schema';

export abstract class IUserRepository extends GenericRepository<User> {
    abstract findOneByEmail(email: string): Promise<User | null>;
}
