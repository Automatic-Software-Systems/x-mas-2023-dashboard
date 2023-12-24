import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '../../../environments/environment';
import { prodEnvironment } from '../../../environments/environment-prod';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ENV == 'prod' ? prodEnvironment.jwt_secret : environment.jwt_secret,
    });
  }

  async validate(payload: any) {
    const { iat, exp, ...newPayload } = payload;
    return newPayload;
  }
}
