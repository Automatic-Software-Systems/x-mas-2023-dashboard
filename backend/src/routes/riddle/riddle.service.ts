import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {LodgeUserInterface, TokenInterface} from '../../../../shared/interfaces';
import {CharacterInterface } from '../../../../shared/interfaces/character.interface';
import { PodcastDTO } from './riddle.dto';
import { UserService } from '../user';
import { DatabaseService } from '../../database';
import { DatabaseTables } from '../../../../shared/enums';
import { createReadStream, readFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class RiddleService {
  constructor(
    private dbService: DatabaseService,
    private userService: UserService
  ) {}

  private usersCollection = DatabaseTables.PODCAST;

  private charactersCollection = DatabaseTables.CHARACTERS;

  get db() {
    return this.dbService.database.collection(this.usersCollection);
  }
  get characterDB(){
    return this.dbService.database.collection(this.charactersCollection);
  }

stations = ["hof","statue", "bahn", "tower", "wohnmobil","schule", "kirche", "konzert"];

killer = "Peter";

  async setRiddleToSolved(token:TokenInterface, station:string):Promise<PodcastDTO>{
    if(!this.stations.includes(station)){
      throw new UnprocessableEntityException("We do not know this location. Maybe solve the riddle")
    }
    const member = (await this.userService.getMemberWithToken(token));
    if(!member){
      throw new UnprocessableEntityException("");
    }
    if(!member.stations.includes(station)){
      member.stations.push(station)
    }
    this.userService.updateMember(member)
    return this.getPodcast(station);
  }
  async makeGuess(token:TokenInterface, guess:string):Promise<PodcastDTO>{
    const member = await this.userService.getMemberWithToken(token);
    if(!member){
      throw new UnprocessableEntityException("");
    }
    if(member.finalGuess){
      throw new UnprocessableEntityException("You already made a guess");
    }
    member.finalGuess = guess;
    if(this.killer === guess){
      member.stations.push("winner")
      this.userService.updateMember(member)
      return this.getPodcast("winner");
    }else{
      member.stations.push("wellYouTried")
      this.userService.updateMember(member)
      return this.getPodcast("wellYouTried");
    }
  }

  async getPodcast(id:string):Promise<PodcastDTO>{
     return (await this.db.findOne({_id:id})) as PodcastDTO
  }

 async getCharacters(token:TokenInterface):Promise<CharacterInterface[]>{
  const member = await this.userService.getMemberWithToken(token);
  if(!member){
    throw new UnprocessableEntityException("");
  }
  const cast = (await this.characterDB.find().toArray());
  cast.forEach(element => {
    if(member.stations.includes(element.station) ||member.userType == 413 || element._id === 0){
      element.enabled = true;
  }else{
    element.enabled = false;
    element.name = "Unbekannte Person"
    element.imgUrl = ""
    element.description = "Du kennst diese Person noch nicht"
    element.station = "Häckermans Haus"
  }})
  return cast.sort((a,b) => {return a._id - b._id;});
 } 

  async getPodcasts(token:TokenInterface):Promise<PodcastDTO[]>{
    const member = await this.userService.getMemberWithToken(token);
    if(!member){
      throw new UnprocessableEntityException("");
    }
    const podcasts = (await this.db.find({ _id : { $ne : "test" } }).toArray());
    podcasts.forEach(element => {
      if(member.stations.includes(element._id) || element._id ==="intro" || (member.userType == 413 && element.number != 10 && element.number != 11)){
        element.enabled = true;
      }else{
        element.enabled = false;
        element.name = "Noch nicht verfügbar";
        element.audioUrl = "";
        element._id = "Häckermans Haus"
      }
    });

    return podcasts.sort((a,b) => {return a.number - b.number;});
  }

  async getPriceCert(token:TokenInterface){
    const member = (await this.userService.getMemberWithToken(token)) as LodgeUserInterface;
    if(!member){
      throw new ForbiddenException("No you can not do this!");
    }
    const options = {
      displayHeaderFooter: false,
      landscape: false,
    };
    if(member.stations.includes("wellYouTried")){
      const filePath = path.join(process.cwd(), 'pdf', 'lose.pdf');
      return readFileSync(filePath)
    }
    if(member.stations.includes("winner")){
      const filePath = path.join(process.cwd(), 'pdf', 'win.pdf');
      return readFileSync(filePath)
    }
    const filePath = path.join(process.cwd(), 'pdf', 'wtf.pdf');
    return readFileSync(filePath)
  }
}
