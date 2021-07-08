import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UnidadeMedida } from '../interfaces/unidade-medida';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService {

    private unidadeMedidaUrl = environment.API_UNIDADE_MEDIDA.URL;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': environment.API_UNIDADE_MEDIDA.CONTENT_TYPE })
    };

    constructor(
        private http: HttpClient
    ) {}


    getUnidadeMedida(idEmpresa: number): Observable<UnidadeMedida[]> {
        const url = `${this.unidadeMedidaUrl}/idEmpresa/${idEmpresa}`;

        return this.http.get<UnidadeMedida[]>(url, this.httpOptions);
    };
}
