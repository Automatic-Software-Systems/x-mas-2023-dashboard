import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, PermissionGuard } from './utility/guards';
import { DatabaseModule } from './database';
import { UserModule } from './routes/user';
import { AuthModule } from './routes/auth';
import { RiddleModule } from './routes/riddle'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    DatabaseModule, AuthModule, UserModule, RiddleModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule { }
