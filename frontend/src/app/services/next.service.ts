import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class NextService {
    private baseUrl = 'api/riddle';

    constructor(private http: HttpClient) {
    }

    private fetchNext(id: string): Observable<void> {
        return this.http
            .get<void>(this.baseUrl + '/' + id)
    }

    getNextStation(id: string): Observable<void> {
        return this.fetchNext(id)
    }
}