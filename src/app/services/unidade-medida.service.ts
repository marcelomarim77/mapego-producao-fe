import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
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
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getUnidadesMedida(idEmpresa: number): Observable<UnidadeMedida[]> {
        const url = `${this.unidadeMedidaUrl}/idEmpresa/${idEmpresa}`;

        return this.http.get<UnidadeMedida[]>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`Fetched UnidadeMedida with UnidadeMedida API <${url}>`)),
                catchError(this.handleError<UnidadeMedida[]>('getUnidadeMedida', []))
            );
    };

    getUnidadeMedida(id: number): Observable<UnidadeMedida> {
        const url = `${this.unidadeMedidaUrl}/id/${id}`;

        return this.http.get<UnidadeMedida>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`fetched UnidadeMedida id=${id}`)),
                catchError(this.handleError<UnidadeMedida>(`getUnidadeMedida idUnidade=${id}`))
            );
    };

    deleteUnidadeMedida(id: number): Observable<UnidadeMedida> {
        const url = `${this.unidadeMedidaUrl}/id/${id}`;
        return this.http.delete<UnidadeMedida>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted Unidade Medida id=${id}`)),
                catchError(this.handleError<UnidadeMedida>('deleteUnidadeMedida'))
        );
    }

    updateUnidade(unidade: UnidadeMedida): Observable<UnidadeMedida> {
        const url = `${this.unidadeMedidaUrl}/id/${unidade.idUnidade}`;
        return this.http.put(url, unidade, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated UnidadeMedida id=${unidade.idUnidade}`)),
                catchError(this.handleError<any>('updateUnidadeMedida'))
        );
    }

    createUnidade(unidade: UnidadeMedida): Observable<UnidadeMedida> {
        const url = `${this.unidadeMedidaUrl}/id/0`;
        return this.http.post<UnidadeMedida>(url, unidade, this.httpOptions).
            pipe(
                tap((newUnidadeMedida: UnidadeMedida) => this.log(`added UnidadeMedida with id=${newUnidadeMedida.idUnidade}`)),
                catchError(this.handleError<UnidadeMedida>('addUnidadeMedida'))
        );
    }

    private log(message: string) {
        this.messageService.add(`unidade-medida.service.ts: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
