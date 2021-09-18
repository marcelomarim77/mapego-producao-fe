import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { LoaderService } from 'src/app/services/loader.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/interfaces/produto';
import { ComposicaoProdutoService } from 'src/app/services/composicao-produto.service';
import { ComposicaoProduto } from 'src/app/interfaces/composicao-produto';

@Component({
  selector: 'app-produto-composicao',
  templateUrl: './produto-composicao.component.html',
  styleUrls: ['./produto-composicao.component.css']
})
export class ProdutoComposicaoComponent implements OnInit {

    pesquisaDisabled = true;

    produtos: Produto[] = [];
    materiaPrima: Produto[] = [];
    composicaoProduto: Produto[] = [];

    produtoCtrl = new FormControl();
    filteredProdutos: Observable<Produto[]>;
    value = '';

    pesqMatPrima = '';
    pesqComposicao = '';

    constructor(private produtoService: ProdutoService,
                private composicaoProdutoService: ComposicaoProdutoService,
                private loaderService: LoaderService,
                private snackBar: MatSnackBar) {
        this.filteredProdutos = this.produtoCtrl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(produto => produto ? this._filterProdutos(produto) : this.produtos.slice())
            );
    }

    ngOnInit(): void {
        this.getProdutos(1);
    }

    private _filterProdutos(value: string): Produto[] {
        const filterValue = value.toLowerCase();
        return this.produtos.filter(produto => produto.descricao.toLowerCase().includes(filterValue));
    }

    getProdutos(idEmpresa: number): void {
        this.loaderService.show('Carregando produtos');
        this.produtoService.getProdutos(idEmpresa)
            .subscribe(
                response => {
                    this.produtos = response;
                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    getCompostos(compostos: ComposicaoProduto[]): void {
        for(let produto of compostos) {
            this.produtoService.getProduto(produto.idMateriaPrima)
            .subscribe(
                response => {
                    this.composicaoProduto.push(response);
                },
                error => console.log(error.message)
            );
        } 
    }

    getComposicaoProduto(idEmpresa: number, idProduto: number): void {
        this.loaderService.show('Carregando composição do produto');
        this.composicaoProdutoService.getComposicaoProdutoByCodigo(idEmpresa, idProduto)
            .subscribe(
                response => {
                    this.getCompostos(response);
                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    getMateriaPrima(idEmpresa: number, idProduto: number): void {
        this.loaderService.show('Carregando matéria-prima');
        this.produtoService.getMateriaPrima(idEmpresa, idProduto)
            .subscribe(
                response => {
                    this.materiaPrima = response;
                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                              event.container.data,
                              event.previousIndex,
                              event.currentIndex);
        }
    }

    entered(event: CdkDragEnter<Produto>) {
        const composicao = {
            idEmpresa: event.item.data.idEmpresa,
            idProduto: this.produtoCtrl.value.idProduto,
            idMateriaPrima: event.item.data.idProduto,
            qtde: 0
        }
        this.composicaoProdutoService.createComposicaoProduto(composicao)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Composição realizada com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao realizar a composição', 'OK');
                    }
                },
                error => console.log(error.message)
            );
    }

    exited(event: CdkDragExit<Produto>) {
        this.composicaoProdutoService.deleteComposicaoProduto(event.item.data.idEmpresa, this.produtoCtrl.value.idProduto, event.item.data.idProduto)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Composição desfeita com sucesso com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao desfazer a composição', 'OK');
                    }
                },
                error => console.log(error.message)
            );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    displayFn(produto: Produto): string {
        return produto && produto.descricao ? produto.descricao : '';
    }

    onBlur() {
        const id = this.produtoCtrl.value.idProduto;
        if (id === 0 || id === undefined) { return };
        this.materiaPrima = [];
        this.composicaoProduto = [];
        this.getComposicaoProduto(1, id);
        this.getMateriaPrima(1, id);
        this.pesquisaDisabled = false;
    }

    limpar() {
        this.pesquisaDisabled = true;
        this.value = '';
        this.pesqMatPrima = '';
        this.materiaPrima = [];
        this.composicaoProduto = [];
        this.pesqComposicao = '';
    }

    limparPesqMatPrima() {
        this.pesqMatPrima = '';
        this.materiaPrima = [];
        const id = this.produtoCtrl.value.idProduto;
        this.getMateriaPrima(1, id);
    }

    limparPesqComposicao() {
        this.pesqComposicao = '';
        this.composicaoProduto = [];
        const id = this.produtoCtrl.value.idProduto;
        this.getComposicaoProduto(1, id);
    }

    filtrarMateriaPrima() {
        if (this.materiaPrima.length === 0 || this.pesqMatPrima === undefined || this.pesqMatPrima.length === 0) {
            return this.materiaPrima;
        }
        return this.materiaPrima.filter(materiaPrima => materiaPrima.descricao.toLowerCase().includes(this.pesqMatPrima));
    }

    filtrarComposicaoProduto() {
        if (this.composicaoProduto.length === 0 || this.pesqComposicao === undefined || this.pesqComposicao.length === 0) {
            return this.composicaoProduto;
        }
        return this.composicaoProduto.filter(composicaoProduto => composicaoProduto.descricao.toLowerCase().includes(this.pesqComposicao));
    }
}
