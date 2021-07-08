import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { TipoProduto } from '../interfaces/tipo-produto';

@Injectable({
  providedIn: 'root'
})
export class TipoProdutoService {

    private tipoProdutoUrl = environment.API_TIPO_PRODUTO.URL;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': environment.API_TIPO_PRODUTO.CONTENT_TYPE })
    };

    constructor(
        private http: HttpClient
    ) {}


    getTipoProduto(idEmpresa: number): Observable<TipoProduto[]> {
        const url = `${this.tipoProdutoUrl}/idEmpresa/${idEmpresa}`;

        return this.http.get<TipoProduto[]>(url, this.httpOptions);
    };
}
