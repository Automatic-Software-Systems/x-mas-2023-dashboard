import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private baseUrl = 'api/riddle';

  constructor(private http: HttpClient) {
  }

  private fetchPdf(): Observable<Blob> {
      return this.http.get(this.baseUrl+'/download/certificate', {
      responseType: 'blob',
    });
  }

  getPdf(): Observable<Blob> {
    return this.fetchPdf()
  }

}
