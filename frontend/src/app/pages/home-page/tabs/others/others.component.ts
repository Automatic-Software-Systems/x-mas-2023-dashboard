import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { MaterialModule } from "src/material.module"

@Component({
    selector: 'others',
    templateUrl: './others.component.html',
    styleUrls: ['./others.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule],
  })
  export class OthersComponent implements OnInit {
    ngOnInit(): void {}
  }