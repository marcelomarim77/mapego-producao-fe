import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cnpj } from "./../core/cnpj";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {

    constructor(
        private http: HttpClient
    ) {}

    getCnpj(cnpj: string): Observable<Cnpj> {
        const URL = environment.API_CNPJ.URL.concat(cnpj);
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': environment.API_CNPJ.CONTENT_TYPE, 'Accept': environment.API_CNPJ.ACCEPT, 'Access-Control-Allow-Origin': '*' })
        };

        return this.http.get<Cnpj>(URL, httpOptions);
    };
}
