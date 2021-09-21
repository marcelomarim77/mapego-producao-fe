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
import { LoaderService } from 'src/app/services/loader.service';
import { ComposicaoProdutoService } from 'src/app/services/composicao-produto.service';
import { ComposicaoProduto } from 'src/app/interfaces/composicao-produto';

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
    composicaoProduto: Produto[] = [];

    produtoForm = this.formBuilder.group({
        codigo: [''],
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
        private composicaoProdutoService: ComposicaoProdutoService,
        private loaderService: LoaderService,
        private router: Router,
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private produtoService: ProdutoService,
        private unidadeMedidaService: UnidadeMedidaService,
        private tipoProdutoService: TipoProdutoService) { }

    ngOnInit(): void {
        this.inicializaProduto();

        this.getUnidadesMedida(1);
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
                response => {
                    this.produto = response,
                    this.getComposicaoProduto(this.produto)
                },
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
            tipoProduto: {
                idEmpresa: 0,
                idTipo: 0,
                descricao: '',
                produtoAcabado: false
            },
            unidadeMedida: {
                idEmpresa: 0,
                idUnidade: 0,
                codigo: '',
                descricao: ''
            }
        };
    }

    getUnidadesMedida(idEmpresa: number) {
        this.unidadeMedidaService.getUnidadesMedida(idEmpresa)
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
                    if (response) {
                        this.openSnackBar('Produto alterado com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao alterar o produto', 'OK');
                    }
                },
                error => console.log(error.message)
            );
    }

    createProduto(produto: Produto) {
        produto.idEmpresa = 1;
        this.produtoService.createProduto(produto)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Produto inserido com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao incluir o produto', 'OK');
                    }
            },
                error => console.log(error.message)
            );
    }

    getComposicaoProduto(produto: Produto) {
        this.composicaoProdutoService.getComposicaoProdutoByCodigo(produto.idEmpresa, produto.idProduto)
            .subscribe(
                response => {
                    this.getCompostos(response);
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

    calcularPercentual() {
        const valorMargem = Number(this.produto.precoVenda) - Number(this.produto.custoProduto);
        this.produto.margem = valorMargem / Number(this.produto.custoProduto) * 100;
    }

    calcularValorVenda() {
        this.produto.precoVenda = Number(this.produto.custoProduto) + ((Number(this.produto.custoProduto) * Number(this.produto.margem) / 100));
    }

    somenteNumeros(event: KeyboardEvent) {
        return event.charCode >= 48 && event.charCode <= 57;
    }

}
