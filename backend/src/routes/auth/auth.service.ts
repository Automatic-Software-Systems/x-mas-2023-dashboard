import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  SessionInterface,
  TokenInterface,
  LodgeUserInterface
} from '../../../../shared/interfaces';
import { EmailOnlyDto, LoginDto, SignupDto } from './auth.dto';
import { SignupMemberDto } from '../user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { PermissionEnum } from '../../../../shared/enums';
import { UserService } from '../user';
import { DatabaseService } from '../../database';
import { PasswordService, PasswordResetDto } from '../../password';

@Injectable()
export class AuthService {
  constructor(
    private dbService: DatabaseService,
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}


  async loginMember(attempt: LoginDto): Promise<SessionInterface>{
    try{
      const member = await this.userService.getMember(attempt.name, true) as LodgeUserInterface
      if (member && (await this.passwordService.checkPassword(attempt.password, member.password))) {
        if(!member.logedIn){
          member.logedIn = true;
          this.userService.updateMember(member)
        }
        return await this.generateJwtSession(this.userService.cleanMember(member));
      }else {
        throw new ForbiddenException('Not a valid user or password combination');
      }
    }catch (err) {
      console.log(err)
      throw new ForbiddenException('Not a valid user or password combination');
    }
  }

  private async generateJwtSession(user: LodgeUserInterface): Promise<SessionInterface> {
    const session: SessionInterface = await this.buildSession(this.userService.cleanMember(user));
    const token: string = await this.buildAccessToken(session);
    return { ...session, access_token: token };
  }

  private async buildSession(user: LodgeUserInterface): Promise<SessionInterface> {
    const session: SessionInterface = {
      user: user,
      access_token: null
    };
    return session;
  }

  private async buildAccessToken(session: SessionInterface): Promise<string> {
    const payload = {
      uid: session.user.userName,
      oid: session.user.userType,
      acc: session.user.type,
    };
    return this.jwtService.sign(payload);
  }

  async refreshToken(token: TokenInterface): Promise<SessionInterface> {
    const account = await this.userService.getMemberWithToken(token);
    return this.generateJwtSession(account);
  }

  async signupUser(token: TokenInterface, signupAttempt: SignupMemberDto){
    const createdUser = await this.generateUser(token, signupAttempt);
  }

  private async generateUser(token: TokenInterface, signup: SignupMemberDto): Promise<LodgeUserInterface> {
    try {
      const [password] = await Promise.all([
        await this.passwordService.encryptPassword(signup),
      ]);

      if (password) {
        return await this.userService.insertNewMember(token, signup, password);
      } else {
        throw new UnprocessableEntityException('Email is not unique. Please try another one!');
      }
    } catch (e) {
      throw new UnprocessableEntityException(e.response);
    }
  }
}
