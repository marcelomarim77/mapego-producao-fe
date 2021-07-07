import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../produtos/produto';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {

    produto: Produto;
    novoProduto: number;

    produtoForm = this.formBuilder.group({
        codigo: ['', Validators.required],
        descricao: ['', Validators.required],
        estoqueMinimo: [''],
        controlaEstoque: [''],
        custoProduto: [''],
        precoVenda: [''],
        margem: [''],
        tipoProduto: [''],
        unidadeMedida: [''],
    });

    constructor(private snackBar: MatSnackBar,
        private router: Router,
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private produtoService: ProdutoService) { }

    ngOnInit(): void {
        this.inicializaProduto();

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
        this.produtoForm.reset;
        this.router.navigateByUrl(`cadastros/produtos`);

        if (this.novoProduto == 0) { // novo produto
            this.openSnackBar('Produto inserido com sucesso', 'OK');
//            this.createCliente(this.cliente);
        }
        else {
            this.openSnackBar('Produto alterado com sucesso', 'OK');
//            this.updateCliente(this.cliente);
        };
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
            estoqueMinimo: 0,
            controlaEstoque: false,
            custoProduto: 0,
            precoVenda: 0,
            margem: 0,
            tipoProduto: {
                idTipoProduto: 0,
                descricao: ''
            },
            unidadeMedida: {
                idUnidade: 0,
                codigo: '',
                descricao: ''
            }
        };
    }
}
