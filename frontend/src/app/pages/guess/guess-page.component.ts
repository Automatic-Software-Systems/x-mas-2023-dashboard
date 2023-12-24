import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NextService } from '@services';
import { catchError, switchMap, take } from 'rxjs';
import { GuessService } from 'src/app/services/guess.service';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'guess',
  templateUrl: './guess-page.component.html',
  styleUrls: ['./guess-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class GuessPageComponent {
  selectedValue: string = '';
  constructor(private guessService : GuessService, private router: Router) {}
  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    this.selectedValue = event.target.value;
  }

  enterGuess(){
    if (this.selectedValue) {
      this.guessService.placeGuess(this.selectedValue).pipe(take(1)).subscribe({
        next: () => this.router.navigateByUrl('/'),  
        error: err => {
          console.log(err)
          this.router.navigateByUrl('/')
        },  
      })
    }
  }
}
