import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UiModule } from '@ui';
import { MaterialModule } from 'src/material.module';
import { PodcastComponent } from './tabs/podcast/podcast.component';
import { CharsComponent } from './tabs/chars/chars.component';
import { OthersComponent } from './tabs/others/others.component';

@Component({
  selector: 'page-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, UiModule, MaterialModule, PodcastComponent, CharsComponent, OthersComponent],
})
export class HomePageComponent implements OnInit {
  loading: boolean = false;
  showTabPodcast: boolean = true;
  showTabChars: boolean = false;
  showTabOthers: boolean = false;

  ngOnInit() {
    this.setupHomePage();
  }

  setupHomePage() {
    this.loading = false;
  }

  onTabChange(index: number): void{
    this.showTabPodcast = index === 0;
    this.showTabChars = index === 1;
    this.showTabOthers = index === 2;
  }
}
