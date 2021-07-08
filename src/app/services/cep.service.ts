import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cep } from "../interfaces/cep";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {

    constructor(
        private http: HttpClient
    ) {}

    getCep(cep: string): Observable<Cep> {
        const URL = environment.API_CEP.URL.concat(cep).concat(environment.API_CEP.APP_KEY).concat(environment.API_CEP.APP_SECRET);
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': environment.API_CEP.CONTENT_TYPE })
        };

        return this.http.get<Cep>(URL, httpOptions);
    };
}
