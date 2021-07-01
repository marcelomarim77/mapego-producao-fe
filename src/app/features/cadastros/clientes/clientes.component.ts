import { OnInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    clientes: Cliente[];

    displayedColumns: string[] = [
        "cpfCnpj",
        "razaoSocial",
        "nomeFantasia",
        "apelido",
        "contato",
        "telefone",
        "celular",
        "botaoEditar",
        "botaoExcluir"
    ];

    dataSource: MatTableDataSource<Cliente>;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private clienteService: ClienteService) {
    }
    
    ngOnInit() {
        // Obtem a lista de clientes
        this.getClientes(1);
    }
    
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    
    btnIncluir() {
        this.router.navigate([`cadastros/cliente/0`]);
        this.getClientes(1);
    }
    
    btnEdit(cliente: Cliente) {
        this.router.navigate([`cadastros/cliente/${cliente.idCliente}`]);
        this.getClientes(1);
    }
    
    btnDelete(cliente: Cliente) {
        if (confirm(`Confirma a exclusão do cliente <id: ${cliente.idCliente}> [${cliente.razaoSocial}]`)) {
            this.deleteCliente(cliente);
            this.openSnackBar('Cliente excluído com sucesso', 'OK');
        };
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getClientes(idEmpresa: number): void {
        this.clienteService.getClientes(idEmpresa)
            .subscribe(
                response => {
                    this.clientes = response;
                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(response);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
            
                },
                error => console.log(error.message)
            );
    }

    deleteCliente(cliente: Cliente): void {
        this.clienteService.deleteCliente(cliente.idCliente)
            .subscribe(
                response => {
                    this.getClientes(1);
                },
                error => console.log(error.message)
            );
    }
}
