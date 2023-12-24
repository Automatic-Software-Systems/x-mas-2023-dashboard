import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environment } from '../environments/environment';
import { prodEnvironment } from '../environments/environment-prod';
import { DatabaseService, initializeDatabase } from './database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.get(DatabaseService).assignDatabase(await initializeDatabase('MONGO'));
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, disableErrorMessages: false }));
  await app.listen(process.env.port || 3000, () => {
    Logger.log(`BUILD :::: ${process.env.ENV == 'prod' ? prodEnvironment.name : environment.name}`);
    app.get(DatabaseService).database ? Logger.log(`DATABASE EXISTS`) : Logger.error(`MISSING DATABASE`);
  });
}

bootstrap();
