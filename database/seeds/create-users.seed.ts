import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../src/users/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = [
      {
        userName: 'Superadmin',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'Superadmin@$test.com',
        password: '$2b$10$lyyFLgN4ojrxmrZ5.gTPr.p7zaDMI8SnYoKoBdSmHxSi9Rm/YCcoG',
        role: 'superadmin',
        birthdayDate: new Date('1998-02-02')
      },
      {
        userName: 'Admin',
        firstName: 'Just',
        lastName: 'Admin',
        email: 'admin@$test.com',
        password: '$2b$10$lyyFLgN4ojrxmrZ5.gTPr.p7zaDMI8SnYoKoBdSmHxSi9Rm/YCcoG',
        role: 'admin',
        birthdayDate: new Date('1998-02-02')
      },
      {
        userName: 'Userok',
        firstName: 'Just',
        lastName: 'User',
        email: 'user@$test.com',
        password: '$2b$10$lyyFLgN4ojrxmrZ5.gTPr.p7zaDMI8SnYoKoBdSmHxSi9Rm/YCcoG',
        role: 'user',
        birthdayDate: new Date('1998-02-02')
      },
    ];

    for(const user of users) {
      await factory(User)().create(user)
    }
  }
}
