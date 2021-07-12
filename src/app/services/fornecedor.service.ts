import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Fornecedor } from '../interfaces/fornecedor';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

    private fornecedorUrl = environment.API_FORNECEDOR.URL;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': environment.API_FORNECEDOR.CONTENT_TYPE })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getFornecedores(idEmpresa: number): Observable<Fornecedor[]> {
        const url = `${this.fornecedorUrl}/idEmpresa/${idEmpresa}`;
        return this.http.get<Fornecedor[]>(url)
            .pipe(
                tap(_ => this.log(`Fetched Fornecedores with Fornecedores API <${url}>`)),
                catchError(this.handleError<Fornecedor[]>('getFornecedores', []))
            );
    }

    getFornecedor(id: number): Observable<Fornecedor> {
        const url = `${this.fornecedorUrl}/id/${id}`;
        return this.http.get<Fornecedor>(url)
            .pipe(
                tap(_ => this.log(`fetched Fornecedor id=${id}`)),
                catchError(this.handleError<Fornecedor>(`getFornecedor idFornecedor=${id}`))
            );
    }

    deleteFornecedor(id: number): Observable<Fornecedor> {
        const url = `${this.fornecedorUrl}/id/${id}`;
        return this.http.delete<Fornecedor>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted Fornecedor id=${id}`)),
                catchError(this.handleError<Fornecedor>('deleteFornecedor'))
        );
    }

    updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        const url = `${this.fornecedorUrl}/id/${fornecedor.idFornecedor}`;
        return this.http.put(url, fornecedor, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated Fornecedor id=${fornecedor.idFornecedor}`)),
                catchError(this.handleError<any>('updateFornecedor'))
        );
    }

    createFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        const url = `${this.fornecedorUrl}/id/0`;
        return this.http.post<Fornecedor>(url, fornecedor, this.httpOptions).
            pipe(
                tap((newFornecedor: Fornecedor) => this.log(`added Fornecedor with id=${newFornecedor.idFornecedor}`)),
                catchError(this.handleError<Fornecedor>('addFornecedor'))
        );
    }

    private log(message: string) {
        this.messageService.add(`fornecedor.service.ts: ${message}`);
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
