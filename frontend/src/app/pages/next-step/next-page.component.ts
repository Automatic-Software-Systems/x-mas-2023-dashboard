import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NextService } from '@services';
import { catchError, switchMap, take } from 'rxjs';

@Component({
  selector: 'next',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NextPageComponent {
  constructor(private route: ActivatedRoute, private nextService: NextService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(
      take(1),
      switchMap(params => {
        const queryParamId = params['id'];
        return this.nextService.getNextStation(queryParamId);
      })
    ).subscribe({
      next: () => this.router.navigateByUrl('/'),  
      error: err => {
        console.log(err)
        this.router.navigateByUrl('/')
      },  
    })
  }
}
