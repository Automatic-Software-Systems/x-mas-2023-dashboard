import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class GuessService {
    private baseUrl = 'api/riddle';

    constructor(private http: HttpClient) {
    }

    private fetchGuess(name: string): Observable<void> {
        return this.http
            .get<void>(this.baseUrl + '/guess/' + name)
    }

    placeGuess(name: string): Observable<void> {
        return this.fetchGuess(name)
    }
}