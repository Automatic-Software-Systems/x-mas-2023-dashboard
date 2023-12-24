import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../../environments/environment';
import { prodEnvironment } from '../../../environments/environment-prod';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user';
import { DatabaseModule } from '../../database';
import { PasswordModule } from '../../password';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PasswordModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.ENV == 'prod' ? prodEnvironment.jwt_secret : environment.jwt_secret,
      signOptions: { expiresIn: process.env.ENV == 'prod' ? prodEnvironment.session_length : environment.session_length },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
