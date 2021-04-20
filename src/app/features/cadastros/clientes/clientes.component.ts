import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

import { Cliente } from './cliente';

const NAMES: string[] = [
    "Maia",
    "Asher",
    "Olivia",
    "Atticus",
    "Amelia",
    "Jack",
    "Charlotte",
    "Theodore",
    "Isla",
    "Oliver",
    "Isabella",
    "Jasper",
    "Cora",
    "Levi",
    "Violet",
    "Arthur",
    "Mia",
    "Thomas",
    "Elizabeth"
];
  
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements AfterViewInit {

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
                private router: Router) {
        // Create 100 users
        const clientes = Array.from({ length: 50 }, (_, k) => createNewUser(k + 1));
    
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(clientes);
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
        this.router.navigateByUrl(`cadastros/cliente/0`);
    }
    
    btnEdit(cliente: Cliente) {
        this.router.navigateByUrl(`cadastros/cliente/${cliente.idCliente}`);
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
}
    
/** Builds and returns a new User. */
function createNewUser(id: number): Cliente {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + " " + NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + ".";

    return {
        idEmpresa: 1,
        idCliente: id,
        tipoPessoa: 'Física',
        cpfCnpj: '12345678901234',
        rgIe: 'string',
        razaoSocial: name,
        nomeFantasia: name + ' Fantasia',
        apelido: 'Apelido',
        cep: 'string',
        endereco: 'string',
        numero: 'string',
        complemento: 'string',
        bairro: 'string',
        cidade: 'string',
        uf: 'string',
        contato: 'Contato',
        telefone: '11 1234-5678',
        celular: '11 98765-4321',
        email: 'string',
        dadosAdicionais: 'string',
    };
}
