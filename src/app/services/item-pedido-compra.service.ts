import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { ItemPedidoCompra } from '../interfaces/item-pedido-compra';

@Injectable({
  providedIn: 'root'
})
export class ItemPedidoCompraService {

    private pedidoCompraURL = environment.API_PEDIDO_COMPRA.URL;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': environment.API_PEDIDO_COMPRA.CONTENT_TYPE })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getItemPedidoCompra(id: number): Observable<ItemPedidoCompra[]> {
        const url = `${this.pedidoCompraURL}/item-pedido-compra/id/${id}`;
        return this.http.get<ItemPedidoCompra[]>(url)
            .pipe(
                tap(_ => this.log(`fetched Item Pedido de Compra idPedidoCompra=${id}`)),
                catchError(this.handleError<ItemPedidoCompra[]>(`getItemPedidoCompra idPedidoCompra=${id}`))
            );
    }

/*
    updatePedidoCompra(pedidoCompra: PedidoCompra): Observable<PedidoCompra> {
        const url = `${this.pedidoCompraURL}/pedido-compra/id/${pedidoCompra.idPedidoCompra}`;
        return this.http.put(url, pedidoCompra, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated PedidoCompra id=${pedidoCompra.idPedidoCompra}`)),
                catchError(this.handleError<any>('updatePedidoCompra'))
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

    createProduto(produto: Produto): Observable<Produto> {
        const url = `${this.produtoUrl}/id/0`;
        return this.http.post<Produto>(url, produto, this.httpOptions).
            pipe(
                tap((newProduto: Produto) => this.log(`added Produto with id=${newProduto.idProduto}`)),
                catchError(this.handleError<Produto>('addProduto'))
        );
    }
*/

    private log(message: string) {
        this.messageService.add(`pedido-compra.service.ts: ${message}`);
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
