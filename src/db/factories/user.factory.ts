import { User } from '../../users/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  return new User()
})