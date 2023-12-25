import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { MaterialModule } from "src/material.module"
import { UserService } from "src/app/services/user.service"
import { LodgeUserInterface } from "../../../../../../../shared/interfaces/user.interface"
import { Observable } from "rxjs"
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'others',
    templateUrl: './others.component.html',
    styleUrls: ['./others.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule],
  })
  export class OthersComponent implements OnInit {
    displayedColumns: string[] = ['Name', 'Stations'];
    constructor(private userService: UserService) {

    }
    tableData!: MatTableDataSource<LodgeUserInterface>;
    ngOnInit(): void {
      this.userService.getOthers().subscribe(val =>  console.log(val))
      this.userService.getOthers().subscribe(val =>this.tableData = new MatTableDataSource(val))
    }
  }