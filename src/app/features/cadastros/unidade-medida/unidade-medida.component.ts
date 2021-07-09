import { OnInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnidadeMedida } from '../../../interfaces/unidade-medida';
import { UnidadeMedidaService } from "src/app/services/unidade-medida.service";
import { LoaderService } from './../../../services/loader.service';

@Component({
  selector: 'app-unidade-medida',
  templateUrl: './unidade-medida.component.html',
  styleUrls: ['./unidade-medida.component.css']
})
export class UnidadeMedidaComponent implements OnInit {

    unidadesMedida: UnidadeMedida[];

    displayedColumns: string[] = [
        "codigo",
        "descricao",
        "botaoEditar",
        "botaoExcluir"
    ];

    dataSource: MatTableDataSource<UnidadeMedida>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackBar: MatSnackBar,
        private router: Router,
        private unidadeMedidaService: UnidadeMedidaService,
        private loaderService: LoaderService) {
    }

    ngOnInit(): void {
        this.getUnidadesMedida(1);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    btnIncluir() {
        this.router.navigate([`cadastros/unidade/0`]);
    }

    btnEdit(unidadeMedida: UnidadeMedida) {
        this.router.navigate([`cadastros/unidade/${unidadeMedida.idUnidade}`]);
    }
    
    btnDelete(unidadeMedida: UnidadeMedida) {
        if (confirm(`Confirma a exclusão da unidade de medida <id: ${unidadeMedida.idUnidade}> [${unidadeMedida.descricao}]`)) {
            this.deleteUnidadeMedida(unidadeMedida);
        };
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getUnidadesMedida(idEmpresa: number): void {
        this.loaderService.show("Carregando unidades de medida");
        this.unidadeMedidaService.getUnidadesMedida(idEmpresa)
            .subscribe(
                response => {
                    this.unidadesMedida = response;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(response);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    deleteUnidadeMedida(unidadeMedida: UnidadeMedida): void {
        this.unidadeMedidaService.deleteUnidadeMedida(unidadeMedida.idUnidade)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Unidade de medida excluída com sucesso', 'OK');
                        this.getUnidadesMedida(1);
                    } else {
                        this.openSnackBar('Falha ao excluir a unidade de medida', 'OK');
                    }
                },
                error => {
                    console.log(error.message);
                }
            );
    }
}
