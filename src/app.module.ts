import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..',  '..', 'static'),
      serveRoot: '/images'
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    FilesModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
