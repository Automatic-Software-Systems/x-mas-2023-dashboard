import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { TokenInterface, LodgeUserInterface} from '../../../../shared/interfaces';
import { UserEditDto, SignupMemberDto } from './user.dto';
import { DatabaseTables, TypesEnum, UserTypesEnum } from '../../../../shared/enums';
import { DatabaseService } from '../../database';
@Injectable()
export class UserService {
  constructor(private dbService: DatabaseService) {}

  private usersCollection = DatabaseTables.USERS;

  get db() {
    return this.dbService.database.collection(this.usersCollection);
  }

  async getAllMembers():Promise<LodgeUserInterface[]>{
      const allUsers = (await this.db.find({userType:1}).toArray())
      console.log(allUsers)
       allUsers.forEach(element => {
        element.password = "";
        element.finalGuess = ""
       });
      return allUsers;
  }

  
  async getMemberWithToken(token: TokenInterface): Promise<LodgeUserInterface> {
    try {
      const account = (await this.db.findOne({
        _id: token.uid
      })) as LodgeUserInterface;
      return this.cleanMember(account);
    } catch (err) {
      throw new NotFoundException('');
    }
  }

  async getMember(userName: string, withPassword = false):Promise<LodgeUserInterface>{
    try{
      const member = (await this.db.findOne({ userName: userName })) as LodgeUserInterface;
      if (withPassword) {
        console.log("returning member")
        console.log(member)
        return member;
      } else {
        return this.cleanMember(member)
      }
    }catch (err){
      throw new NotFoundException('');
    }
  }

  async insertNewMember(signupAttempt: SignupMemberDto, encryptedPassword: string): Promise<LodgeUserInterface> {
    try {
      const newMember: LodgeUserInterface = {
        userName: signupAttempt.name,
        password:encryptedPassword,
        logedIn:false,
        finalGuess:"",
        stations: new Array<string>(8),
        userType: signupAttempt.type,
        type: TypesEnum.USER,
        _id: signupAttempt.name
      };
      const insertResult = await this.db.insertOne(newMember);
      return this.cleanMember(newMember);
    } catch (err) {
      throw new InternalServerErrorException('Unable to insert new user.');
    }
  }

  cleanMember(account: LodgeUserInterface): LodgeUserInterface {
    const { password, ...clean } = account;
    return clean;
  }

  async updateMember(token: TokenInterface, updates: LodgeUserInterface): Promise<LodgeUserInterface> {
    const id = token.uid;
    const user = (await this.db.findOne({ userName: id })) as LodgeUserInterface;
    if (id == user._id) {
      const result = (await this.dbService.updateSingleItem(
        this.usersCollection,
        id,
        updates,
      )) as LodgeUserInterface;

      return this.cleanMember(result)
    } else {
      throw new ForbiddenException('You cannot update this user account.');
    }
  }
}
