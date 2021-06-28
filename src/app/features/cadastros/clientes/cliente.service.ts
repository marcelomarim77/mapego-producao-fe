import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Cliente } from "./cliente";
import { MessageService } from './../../../message.service';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    private clienteUrl = environment.API_CLIENTE.URL;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': environment.API_CLIENTE.CONTENT_TYPE })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getClientes(idEmpresa: number): Observable<Cliente[]> {
        const url = `${this.clienteUrl}/idEmpresa/${idEmpresa}`;
        return this.http.get<Cliente[]>(url)
            .pipe(
                tap(_ => this.log(`Fetched Clientes with Clientes API <${url}>`)),
                catchError(this.handleError<Cliente[]>('getClientes', []))
            );
    }

    getCliente(id: number): Observable<Cliente> {
        const url = `${this.clienteUrl}/id/${id}`;
        return this.http.get<Cliente>(url)
            .pipe(
                tap(_ => this.log(`fetched Cliente id=${id}`)),
                catchError(this.handleError<Cliente>(`getCliente idCliente=${id}`))
            );
    }

    deleteCliente(cliente: Cliente): void {
        console.log(`cliente excluido: ${cliente.razaoSocial}`);
/*
        const id = typeof Cliente === 'number' ? Cliente : Cliente.idCliente;
        const url = `${this.clienteUrl}/id/${id}`;
    
        return this.http.delete<Cliente>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted Cliente id=${id}`)),
                catchError(this.handleError<Cliente>('deleteCliente'))
        );
*/
    }
    

/*
  updateCliente(Cliente: Cliente): Observable<Cliente> {
    const url = `${this.clienteUrl}/id/${Cliente.id}`;
    return this.http.put(url, Cliente, this.httpOptions).pipe(
      tap(_ => this.log(`updated Cliente id=${Cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  addCliente(Cliente: Cliente): Observable<Cliente> {
    const url = `${this.clienteUrl}/create`;
    return this.http.post<Cliente>(url, Cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => this.log(`added Cliente with id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  searchClientes(term: string): Observable<Cliente[]> {
    if (!term.trim()) {
      // if not search term, return empty Cliente array.
      return of([]);
    }
    return this.http.get<Cliente[]>(`${this.clienteUrl}/search/${term}`).pipe(
      tap(x => x.length ? this.log(`found Clientes matching "${term}"`) : this.log(`no Clientes matching "${term}"`)),
      catchError(this.handleError<Cliente[]>('searchClientes', []))
    );
  }
*/

    private log(message: string) {
        this.messageService.add(`ClienteService: ${message}`);
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
