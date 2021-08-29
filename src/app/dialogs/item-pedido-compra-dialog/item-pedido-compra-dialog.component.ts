import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ItemPedidoCompra } from 'src/app/interfaces/item-pedido-compra';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-item-pedido-compra-dialog',
  templateUrl: './item-pedido-compra-dialog.component.html',
  styleUrls: ['./item-pedido-compra-dialog.component.css']
})
export class ItemPedidoCompraDialogComponent implements OnInit {

    produtos: Produto[] = [];

    produtoCtrl = new FormControl();
    filteredProdutos: Observable<Produto[]>;

    itemPedidoCompra: ItemPedidoCompra;

    itemPedidoCompraForm: FormGroup = this.formBuilder.group({
        idItemPedidoCompra: [0],
        idProduto: [0],
        quantidade: [0],
        precoUnitario: [0],
        total: [{value: 0, disabled: true}],
        codigo: [''],
        descricao: [{value: '', disabled: true}],
        tipoProduto: [{value: '', disabled: true}],
        unidadeMedida: [{value: '', disabled: true}]
    });

    constructor(
        public formBuilder: FormBuilder,
        private produtoService: ProdutoService,
        private loaderService: LoaderService,
        @Optional() public dialogRef: MatDialogRef<ItemPedidoCompraDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ItemPedidoCompra) {

        this.getProdutos(1);

        this.filteredProdutos = this.produtoCtrl.valueChanges
            .pipe(
                startWith(''),
                map(produto => produto ? this._filterProdutos(produto) : this.produtos.slice())
        );
    }

    ngOnInit(): void {
        this.inicializaItemPedidoCompra();
    }

    private _filterProdutos(value: string): Produto[] {
        const filterValue = value.toLowerCase();
        return this.produtos.filter(produto => produto.codigo.toLowerCase().includes(filterValue));
    }

    inicializaItemPedidoCompra() {
        this.itemPedidoCompra = {
            idEmpresa: 0,
            idPedidoCompra: 0,
            idItemPedidoCompra: 0,
            idProduto: 0,
            quantidade: 0,
            precoUnitario: 0,
            total: 0,
            codigo: '',
            descricao: '',
            tipoProduto: '',
            unidadeMedida: ''
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getProdutos(idEmpresa: number): void {
        this.loaderService.show("Carregando produtos");
        this.produtoService.getProdutos(idEmpresa)
            .subscribe(
                response => {
                    this.produtos = response;
                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    onBlurCodigo() {
        if (this.data.codigo === '') { return };

        let idProduto = 0;
        idProduto = this.produtos.find(produto => produto.codigo === this.data.codigo).idProduto;
        if (idProduto === undefined) { return }
        this.produtoService.getProduto(idProduto)
            .subscribe(
                response => {
                    this.data.idProduto = response.idProduto;
                    this.data.descricao = response.descricao;
                    this.data.tipoProduto = response.tipoProduto.descricao;
                    this.data.unidadeMedida = response.unidadeMedida.descricao;
                    this.data.precoUnitario = response.custoProduto;
                },
                error => console.log(error.message)
            );
    }

    onBlurQtdePrecoUnitario() {
        const quantidade = this.data.quantidade;
        const precoUnitario = this.data.precoUnitario;

        if (quantidade === undefined || precoUnitario === undefined) { return };

        this.data.total = quantidade * precoUnitario;
    }
}
