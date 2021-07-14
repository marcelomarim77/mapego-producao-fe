import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { PedidoCompraService } from 'src/app/services/pedido-compra.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { PedidoCompra } from 'src/app/interfaces/pedido-compra';
import { Fornecedor } from 'src/app/interfaces/fornecedor';

@Component({
  selector: 'app-pedido-compra-detalhe',
  templateUrl: './pedido-compra-detalhe.component.html',
  styleUrls: ['./pedido-compra-detalhe.component.css']
})
export class PedidoCompraDetalheComponent implements OnInit {

    pedidoCompra: PedidoCompra;
    novoPedido: number;

    fornecedores: Fornecedor[];

    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;


    pedidoCompraForm = this.formBuilder.group({
        pessoa: ['',
            Validators.required
        ],
        cpfCnpj: ['',
            Validators.required
        ],
        rgIe: [''],
        razaoSocial: ['',
            Validators.required,
        ],
        nomeFantasia: [''],
        apelido: [''],
        cep: [''],
        endereco: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        uf: [''],
        contato: [''],
        telefone: [''],
        celular: [''],
        email: ['',
            Validators.email
        ],
        dadosAdicionais: ['',
            Validators.maxLength(255),
        ],
    });

    constructor(private snackBar: MatSnackBar,
        private router: Router,
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private pedidoCompraService: PedidoCompraService,
        private fornecedorService: FornecedorService) { }

    ngOnInit(): void {

        this.getFornecedores(1);

//        this.filteredOptions = this.myControl.valueChanges.pipe(
        this.filteredOptions = this.pedidoCompraForm.valueChanges.pipe(
                startWith(''),
            map(value => this._filter(value))
        );

        this.inicializaPedidoCompra();

        this.route.params.forEach((params: Params) => {
            const id: number = params['id'];
            this.novoPedido = id;

            if (id != 0) { // novo pedido de compra
                this.getPedidoCompra(id);
            }
        });
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
    
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    getPedidoCompra(idPedido: number): void {
        this.pedidoCompraService.getPedidoCompra(idPedido)
            .subscribe(
                response => {
                    this.pedidoCompra = response;
                },
                error => console.log(error.message)
            );
    }

    inicializaPedidoCompra() {
        this.pedidoCompra = {
            idEmpresa: 0,
            idPedidoCompra: 0,
            idUsuario: 0,
            idFornecedor: 0,
            idAprovador: 0,
            idCancelamento: 0,
            dataPedido: '',
            dataPrevisaoEntrega: '',
            dataAprovacao: '',
            dataCancelamento: '',
            dataRecebimento: '',
            statusPedido: '',
            observacao: '',
            fornecedor: {
                idEmpresa: 0,
                idFornecedor: 0,
                pessoa: '',
                cpfCnpj: '',
                rgIe: '',
                razaoSocial: '',
                nomeFantasia: '',
                apelido: '',
                cep: '',
                endereco: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                uf: '',
                ibge: '',
                contato: '',
                telefone: '',
                celular: '',
                email: '',
                dadosAdicionais: ''
            },
            usuario:  {
                idUsuario: 0,
                nomeUsuario: ''
            },
            aprovador:  {
                idUsuario: 0,
                nomeUsuario: ''
            },
            cancelamento:  {
                idUsuario: 0,
                nomeUsuario: ''
            },
        };
    }

    getFornecedores(idEmpresa: number) {
        this.fornecedorService.getFornecedores(idEmpresa)
            .subscribe(
                response => {
                    this.fornecedores = response;
                    this.fornecedores.sort(function(a,b) {
                        return a.razaoSocial < b.razaoSocial ? -1 : a.razaoSocial > b.razaoSocial ? 1 : 0;
                    });
                },
                error => console.log(error.message)
        );
    }
}
