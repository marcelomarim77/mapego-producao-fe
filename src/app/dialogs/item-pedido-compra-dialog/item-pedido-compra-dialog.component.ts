import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    filteredProdutos: Observable<Produto[]>;

    itemPedidoCompra: ItemPedidoCompra;

    itemPedidoCompraForm: FormGroup = this.formBuilder.group({
        idItemPedidoCompra: [0],
        idProduto: [0],
        quantidade: [0],
        precoUnitario: [0],
        total: [0],
        codigo: [''],
        descricao: [''],
        tipoProduto: [''],
        unidadeMedida: ['']
    });

    constructor(
        public formBuilder: FormBuilder,
        private produtoService: ProdutoService,
        private loaderService: LoaderService,
        @Optional() public dialogRef: MatDialogRef<ItemPedidoCompraDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ItemPedidoCompra) {}

    ngOnInit(): void {
        this.inicializaItemPedidoCompra();

        this.getProdutos(1);

        this.filteredProdutos = this.itemPedidoCompraForm.get('codigo').valueChanges
            .pipe(
                startWith(''),
                map(produto => produto ? this._filterProdutos(produto) : this.produtos.slice())
        );        
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

    onSubmit() {
        console.log(this.data);
        this.dialogRef.close();
    };

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
}
