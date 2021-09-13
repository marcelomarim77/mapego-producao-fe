import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { ComposicaoProduto } from '../interfaces/composicao-produto';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ComposicaoProdutoService {

    private composicaoProdutoURL = environment.API_COMPOSICAO_PRODUTO.URL;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': environment.API_PRODUTO.CONTENT_TYPE })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getComposicaoProdutoByCodigo(idEmpresa: number, idProduto: number): Observable<ComposicaoProduto[]> {
        const url = `${this.composicaoProdutoURL}/idEmpresa/${idEmpresa}/idProduto/${idProduto}`;
        return this.http.get<ComposicaoProduto[]>(url)
            .pipe(
                tap(_ => this.log(`fetched ComposicaoProduto idProduto=${idProduto}`)),
                catchError(this.handleError<ComposicaoProduto[]>(`getComposicaoProdutoByCodigo idProduto=${idProduto}`))
            );
    }

    deleteComposicaoProduto(idEmpresa: number, idProduto: number, idMateriaPrima: number): Observable<ComposicaoProduto> {
        const url = `${this.composicaoProdutoURL}/idEmpresa/${idEmpresa}/idProduto/${idProduto}/idMateriaPrima/${idMateriaPrima}`;
        return this.http.delete<ComposicaoProduto>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted ComposicaoProduto idMateriaPrima=${idMateriaPrima}`)),
                catchError(this.handleError<ComposicaoProduto>('deleteComposicaoProduto'))
        );
    }

    updateComposicaoProduto(composicaoProduto: ComposicaoProduto): Observable<ComposicaoProduto> {
        const url = this.composicaoProdutoURL;
        return this.http.put<ComposicaoProduto>(url, composicaoProduto, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated ComposicaoProduto idMateriaPrima=${composicaoProduto.idMateriaPrima}`)),
                catchError(this.handleError<any>('updateComposicaoProduto'))
        );
    }

    createComposicaoProduto(composicaoProduto: ComposicaoProduto): Observable<ComposicaoProduto> {
        const url = this.composicaoProdutoURL;
        return this.http.post<ComposicaoProduto>(url, composicaoProduto, this.httpOptions).
            pipe(
                tap((newComposicaoProduto: ComposicaoProduto) => this.log(`added ComposicaoProduto with idMateriaPrima=${newComposicaoProduto.idMateriaPrima}`)),
                catchError(this.handleError<ComposicaoProduto>('addComposicaoProduto'))
        );
    }

    private log(message: string) {
        this.messageService.add(`composicao-produto.service.ts: ${message}`);
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
