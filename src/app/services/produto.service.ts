import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

    private produtoUrl = environment.API_PRODUTO.URL;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': environment.API_PRODUTO.CONTENT_TYPE })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getProdutos(idEmpresa: number): Observable<Produto[]> {
        const url = `${this.produtoUrl}/idEmpresa/${idEmpresa}`;
        return this.http.get<Produto[]>(url)
            .pipe(
                tap(_ => this.log(`Fetched Produtos with Produtos API <${url}>`)),
                catchError(this.handleError<Produto[]>('getProdutos', []))
            );
    }

    getProduto(id: number): Observable<Produto> {
        const url = `${this.produtoUrl}/id/${id}`;
        return this.http.get<Produto>(url)
            .pipe(
                tap(_ => this.log(`fetched Produto id=${id}`)),
                catchError(this.handleError<Produto>(`getProduto idProduto=${id}`))
            );
    }

    getProdutoByCodigo(codigo: string): Observable<Produto> {
        const url = `${this.produtoUrl}/codigo/${codigo}`;
        return this.http.get<Produto>(url)
            .pipe(
                tap(_ => this.log(`fetched Produto codigo=${codigo}`)),
                catchError(this.handleError<Produto>(`getProdutoByCodigo codigo=${codigo}`))
            );
    }

    getMateriaPrima(idEmpresa: number, idProduto: number): Observable<Produto[]> {
        const url = `${this.produtoUrl}/materia-prima/${idEmpresa}/idProduto/${idProduto}`;
        return this.http.get<Produto[]>(url)
            .pipe(
                tap(_ => this.log(`Fetched Produtos with Produtos API <${url}>`)),
                catchError(this.handleError<Produto[]>('getMateriaPrima', []))
            );
    }

    deleteProduto(id: number): Observable<Produto> {
        const url = `${this.produtoUrl}/id/${id}`;
        return this.http.delete<Produto>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted Produto id=${id}`)),
                catchError(this.handleError<Produto>('deleteProduto'))
        );
    }

    updateProduto(produto: Produto): Observable<Produto> {
        const url = `${this.produtoUrl}/id/${produto.idProduto}`;
        return this.http.put(url, produto, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated Produto id=${produto.idProduto}`)),
                catchError(this.handleError<any>('updateProduto'))
        );
    }

    createProduto(produto: Produto): Observable<Produto> {
        const url = `${this.produtoUrl}/id/0`;
        return this.http.post<Produto>(url, produto, this.httpOptions).
            pipe(
                tap((newProduto: Produto) => this.log(`added Produto with id=${newProduto.idProduto}`)),
                catchError(this.handleError<Produto>('addProduto'))
        );
    }

    private log(message: string) {
        this.messageService.add(`produto.service.ts: ${message}`);
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
