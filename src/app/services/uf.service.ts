import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Uf } from "../interfaces/uf";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UfService {

    constructor(
        private http: HttpClient
    ) {}

    getUf(): Observable<Uf[]> {
        const URL = environment.API_UF.URL;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': environment.API_UF.CONTENT_TYPE })
        };

        return this.http.get<Uf[]>(URL, httpOptions);
    };
}
