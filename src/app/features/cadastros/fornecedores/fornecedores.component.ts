import { OnInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

import { Fornecedor } from '../../../interfaces/fornecedor';
import { LoaderService } from './../../../services/loader.service';
import { FornecedorService } from "src/app/services/fornecedor.service";

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

    fornecedores: Fornecedor[];

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

    dataSource: MatTableDataSource<Fornecedor>;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private fornecedorService: FornecedorService,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        // Obtem a lista de fornecedores
        this.getFornecedores(1);
    }
    
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    
    btnIncluir() {
        this.router.navigate([`cadastros/fornecedor/0`]);
    }
    
    btnEdit(fornecedor: Fornecedor) {
        this.router.navigate([`cadastros/fornecedor/${fornecedor.idFornecedor}`]);
    }
    
    btnDelete(fornecedor: Fornecedor) {
        if (confirm(`Confirma a exclusão do fornecedor <id: ${fornecedor.idFornecedor}> [${fornecedor.razaoSocial}]`)) {
            this.deleteFornecedor(fornecedor);
        };
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getFornecedores(idEmpresa: number): void {
        this.loaderService.show("Carregando fornecedores");
        this.fornecedorService.getFornecedores(idEmpresa)
            .subscribe(
                response => {
                    this.fornecedores = response;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(response);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    deleteFornecedor(fornecedor: Fornecedor): void {
        this.fornecedorService.deleteFornecedor(fornecedor.idFornecedor)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Fornecedor excluído com sucesso', 'OK');
                        this.getFornecedores(1);
                    } else {
                        this.openSnackBar('Falha ao excluir o fornecedor', 'OK');
                    }
                },
                error => console.log(error.message)
            );
    }
}
