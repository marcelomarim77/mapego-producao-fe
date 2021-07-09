import { OnInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

import { Produto } from '../../../interfaces/produto';
import { ProdutoService } from "src/app/services/produto.service";
import { LoaderService } from './../../../services/loader.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

    produtos: Produto[];

    displayedColumns: string[] = [
        "codigo",
        "descricao",
        "descricaoTipoProduto",
        "descricaoUnidadeMedida",
        "custoProduto",
        "precoVenda",
        "controlaEstoque",
        "estoqueMinimo",
        "botaoEditar",
        "botaoExcluir"
    ];

    dataSource: MatTableDataSource<Produto>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private produtoService: ProdutoService,
                private loaderService: LoaderService) {
    }

    ngOnInit(): void {
        // Obtem a lista de produtos
        this.getProdutos(1);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    btnIncluir() {
        this.router.navigate([`cadastros/produto/0`]);
    }

    btnEdit(produto: Produto) {
        this.router.navigate([`cadastros/produto/${produto.idProduto}`]);
    }
    
    btnDelete(produto: Produto) {
        if (confirm(`Confirma a exclusão do produto <id: ${produto.idProduto}> [${produto.descricao}]`)) {
            this.deleteProduto(produto);
        };
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getProdutos(idEmpresa: number): void {
        this.loaderService.show("Carregando produtos");
        this.produtoService.getProdutos(idEmpresa)
            .subscribe(
                response => {
                    this.produtos = response;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(response);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    deleteProduto(produto: Produto): void {
        this.produtoService.deleteProduto(produto.idProduto)
            .subscribe(
                response => {
                    console.log(response);
                    if (response) {
                        this.openSnackBar('Produto excluído com sucesso', 'OK');
                        this.getProdutos(1);
                    } else {
                        this.openSnackBar('Falha ao excluir o produto', 'OK');
                    }
                },
                error => console.log(error.message)
            );
    }
}
