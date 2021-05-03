import { OnInit, AfterViewInit, Component, ViewChild } from "@angular/core";
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
export class ClientesComponent implements OnInit, AfterViewInit {

    clientes: Cliente[] = [];

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
        this.getClientes(1);
        console.log(this.getClientes(1));
    
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.clientes);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    }
    
    btnEdit(cliente: Cliente) {
        this.router.navigate([`cadastros/cliente/${cliente.idCliente}`]);
    }
    
    btnDelete(cliente: Cliente) {
        if (confirm(`Excluir o cliente id: ${cliente.idCliente} - ${cliente.razaoSocial}`)) {
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
                clientes => this.clientes = clientes,
            );
    }
}
