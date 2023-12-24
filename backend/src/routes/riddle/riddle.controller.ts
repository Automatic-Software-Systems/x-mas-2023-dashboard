import { Body, Controller, Param, Post, Get, Res } from '@nestjs/common';
import { RiddleService } from './riddle.service';
import {
  TokenInterface
} from '../../../../shared/interfaces';
import {CharacterInterface} from '../../../../shared/interfaces/character.interface'
import {
  ForbiddenException,
} from '@nestjs/common';
import { PodcastDTO } from './riddle.dto';
import { TokenData } from '../../utility/decorators';
import { Console } from 'console';

@Controller('riddle')
export class RiddleController {
  constructor(private readonly riddleService: RiddleService) {}

  @Get("/:station")
  solvedRiddle(@TokenData() token:TokenInterface, @Param('station') station:string):Promise<PodcastDTO>{
      return this.riddleService.setRiddleToSolved(token, station);
  }

  @Get("guess/:name")
  makeGuess(@TokenData() token:TokenInterface, @Param('name') name:string):Promise<PodcastDTO>{
      return this.riddleService.makeGuess(token, name);
  }

  @Get("/search/podcasts")
  getPodcasts(@TokenData() token:TokenInterface):Promise<PodcastDTO[]>{
      return this.riddleService.getPodcasts(token);
  }

  @Get("/search/characters")
  getCharacters(@TokenData() token:TokenInterface):Promise<CharacterInterface[]>{
      return this.riddleService.getCharacters(token);
  }

  @Get("/download/certificate")
  async downloadCert(@TokenData() token:TokenInterface, @Res() res){
      const buffer = await this.riddleService.getPriceCert(token);
      res.set({
        // pdf
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=pdf.pdf`,
        'Content-Length': buffer.length,
        // prevent cache
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      });
      res.end(buffer);
  }
}
