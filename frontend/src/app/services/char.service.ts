import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharacterInterface } from "../../../../shared/interfaces/character.interface";

@Injectable({
    providedIn: 'root',
})
export class CharService {
    private baseUrl = 'api/riddle';

    constructor(private http: HttpClient) {
    }

    private fetchChars(): Observable<CharacterInterface[]> {
        return this.http
            .get<CharacterInterface[]>(this.baseUrl + '/search/characters')
    }

    getChars(): Observable<CharacterInterface[]> {
        return this.fetchChars()
    }
}