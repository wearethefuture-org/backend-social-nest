import { define } from 'typeorm-seeding';
import { User } from '../../src/users/user.entity';

define(User, () => {
  return new User()
})
