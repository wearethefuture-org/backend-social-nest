import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(parseInt(process.env.PORT));

  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().finally(() => {
  console.log('success');
  }
);
