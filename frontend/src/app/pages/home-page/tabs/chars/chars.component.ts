import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MaterialModule } from "src/material.module"
import { CharacterInterface } from "../../../../../../../shared/interfaces/character.interface"
import { Observable } from "rxjs"
import { CharService } from "src/app/services/char.service"

@Component({
  selector: 'chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
})
export class CharsComponent implements OnInit {
  $chars!: Observable<CharacterInterface[]>
  constructor(private charService: CharService) {

  }
  
  ngOnInit(): void {
    this.$chars = this.charService.getChars()
  }
}