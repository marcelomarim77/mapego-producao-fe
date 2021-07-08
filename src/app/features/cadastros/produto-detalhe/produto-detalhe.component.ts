import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../../interfaces/produto';
import { UnidadeMedida } from 'src/app/interfaces/unidade-medida';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';
import { TipoProduto } from 'src/app/interfaces/tipo-produto';
import { TipoProdutoService } from 'src/app/services/tipo-produto.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {

    produto: Produto;
    novoProduto: number;

    unidadesMedida: UnidadeMedida[];
    tiposProduto: TipoProduto[];

    produtoForm = this.formBuilder.group({
        codigo: ['', Validators.required],
        descricao: ['', Validators.required],
        estoqueMinimo: [''],
        controlaEstoque: [''],
        custoProduto: [''],
        precoVenda: [''],
        margem: [''],
        tipoProduto: [0, Validators.required],
        unidadeMedida: [0, Validators.required],
    });

    constructor(private snackBar: MatSnackBar,
        private router: Router,
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private produtoService: ProdutoService,
        private unidadeMedidaService: UnidadeMedidaService,
        private tipoProdutoService: TipoProdutoService) { }

    ngOnInit(): void {
        this.inicializaProduto();

        this.getUnidadeMedida(1);
        this.getTipoProduto(1);
    
        this.route.params.forEach((params: Params) => {
            const id: number = params['id'];
            this.novoProduto = id;

            if (id != 0) { // novo cliente
                this.getProduto(id);
            }
        });
    }

    validationMessages = {
        'codigo': [
            { type: 'required', message: 'Informe o código do produto' },
        ],
        'descricao': [
            { type: 'required', message: 'Informe a descrição do produto' },
        ],
    };

    onSubmit() {
        if (this.novoProduto == 0) { // novo produto
            this.createProduto(this.produto);
        }
        else {
            this.updateProduto(this.produto);
        };

        this.produtoForm.reset;
        this.router.navigateByUrl(`cadastros/produtos`);
    };

    cancelar() {
        this.produtoForm.reset;
        this.router.navigateByUrl(`cadastros/produtos`);
    };

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getProduto(idProduto: number): void {
        this.produtoService.getProduto(idProduto)
            .subscribe(
                response => this.produto = response,
                error => console.log(error.message)
            );
    }

    inicializaProduto() {
        this.produto = {
            idEmpresa: 0,
            idProduto: 0,
            codigo: '',
            descricao: '',
            idTipoProduto: 0,
            idUnidadeMedida: 0,
            estoqueMinimo: 0,
            controlaEstoque: false,
            custoProduto: 0,
            precoVenda: 0,
            margem: 0,
        };
    }

    getUnidadeMedida(idEmpresa: number) {
        this.unidadeMedidaService.getUnidadeMedida(idEmpresa)
            .subscribe(
                response => {
                    this.unidadesMedida = response;
                    this.unidadesMedida.sort(function(a,b) {
                        return a.descricao < b.descricao ? -1 : a.descricao > b.descricao ? 1 : 0;
                    });
                },
                error => console.log(error.message)
        );
    }

    getTipoProduto(idEmpresa: number) {
        this.tipoProdutoService.getTipoProduto(idEmpresa)
            .subscribe(
                response => {
                    this.tiposProduto = response;
                    this.tiposProduto.sort(function(a,b) {
                        return a.descricao < b.descricao ? -1 : a.descricao > b.descricao ? 1 : 0;
                    });
                },
                error => console.log(error.message)
        );
    }

    updateProduto(produto: Produto) {
        this.produtoService.updateProduto(produto)
            .subscribe(
                response => {
                    this.openSnackBar('Produto alterado com sucesso', 'OK');
                },
                error => console.log(error.message)
            );
    }

    createProduto(produto: Produto) {
        produto.idEmpresa = 1;
        this.produtoService.createProduto(produto)
            .subscribe(
                response => {
                    this.openSnackBar('Produto inserido com sucesso', 'OK');
                },
                error => console.log(error.message)
            );
    }
}
