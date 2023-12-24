import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Podcast } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private baseUrl = 'api/riddle';

  constructor(private http: HttpClient) {
  }

  private fetchPodcasts(): Observable<Podcast[]> {
    return this.http
      .get<Podcast[]>(this.baseUrl+'/search/podcasts')
  }

  getPodcasts(): Observable<Podcast[]> {
    return this.fetchPodcasts()
  }

}
