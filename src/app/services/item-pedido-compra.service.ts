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

    deleteItemPedidoCompra(id: number): Observable<ItemPedidoCompra> {
        const url = `${this.pedidoCompraURL}/item-pedido-compra/delete/${id}`;
        return this.http.delete<ItemPedidoCompra>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted ItemPedidoCompra id=${id}`)),
                catchError(this.handleError<ItemPedidoCompra>('deleteItemPedidoCompra'))
        );
    }

    addItemPedidoCompra(id: number, itemPedidoCompra: ItemPedidoCompra): Observable<ItemPedidoCompra> {
        const url = `${this.pedidoCompraURL}/item-pedido-compra/id/${id}`;
        return this.http.post<ItemPedidoCompra>(url, itemPedidoCompra, this.httpOptions).
            pipe(
                tap(_ => this.log(`added ItemPedidoCompra`)),
                catchError(this.handleError<ItemPedidoCompra>('addItemPedidoCompra'))
        );
    }

    updateItemPedidoCompra(itemPedidoCompra: ItemPedidoCompra): Observable<ItemPedidoCompra> {
        const url = `${this.pedidoCompraURL}/item-pedido-compra/idItemPedidoCompra`;
        return this.http.put(url, itemPedidoCompra, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated ItemPedidoCompra id=${itemPedidoCompra.idPedidoCompra}`)),
                catchError(this.handleError<any>('updateItemPedidoCompra'))
        );
    }

/*
    getProduto(id: number): Observable<Produto> {
        const url = `${this.produtoUrl}/id/${id}`;
        return this.http.get<Produto>(url)
            .pipe(
                tap(_ => this.log(`fetched Produto id=${id}`)),
                catchError(this.handleError<Produto>(`getProduto idProduto=${id}`))
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
