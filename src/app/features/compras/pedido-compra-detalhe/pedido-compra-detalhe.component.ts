import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';

import { PedidoCompraService } from 'src/app/services/pedido-compra.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { PedidoCompra } from 'src/app/interfaces/pedido-compra';
import { Fornecedor } from 'src/app/interfaces/fornecedor';
import { ItemPedidoCompra } from './../../../interfaces/item-pedido-compra';
import { ItemPedidoCompraService } from 'src/app/services/item-pedido-compra.service';
import { LoaderService } from "src/app/services/loader.service";
import { ItemPedidoCompraDialogComponent } from 'src/app/dialogs/item-pedido-compra-dialog/item-pedido-compra-dialog.component';

@Component({
  selector: 'app-pedido-compra-detalhe',
  templateUrl: './pedido-compra-detalhe.component.html',
  styleUrls: ['./pedido-compra-detalhe.component.css']
})
export class PedidoCompraDetalheComponent implements OnInit {

    isDisabled: true;

    pedidoCompra: PedidoCompra;
    itensPedidoCompra: ItemPedidoCompra[] = [];
    novoPedido: number;

    fornecedores: Fornecedor[];

    pedidoCompraForm = this.formBuilder.group({
        idPedidoCompra: [0, {disabled: true}],
        nomeUsuario: [''],
        status: [''],
        dataPedido: [''],
        dataPrevisaoEntrega: [''],
        nomeFornecedor: [''],
        observacao: ['',
            Validators.maxLength(255),
        ],
    });

    displayedColumns: string[] = [
        "idItemPedidoCompra",
        "tipoProduto",
        "codigo",
        "descricao",
        "unidadeMedida",
        "quantidade",
        "precoUnitario",
        "total",
        "botaoEditar",
        "botaoExcluir"
    ];

    dataSource: MatTableDataSource<ItemPedidoCompra>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackBar: MatSnackBar,
        private router: Router,
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private pedidoCompraService: PedidoCompraService,
        private itemPedidoCompraService: ItemPedidoCompraService,
        private fornecedorService: FornecedorService,
        private loaderService: LoaderService,
        public dialog: MatDialog) { }

    ngOnInit(): void {

        this.getFornecedores(1);

        this.inicializaPedidoCompra();

        this.route.params.forEach((params: Params) => {
            const id: number = params['id'];
            this.novoPedido = id;

            if (id != 0) { // novo pedido de compra
                this.getPedidoCompra(id);
                this.getItensPedidoCompra(id);
            }
        });
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

    getItensPedidoCompra(idPedido: number): void {
        this.loaderService.show("Carregando itens do pedidos de compra");
        this.itemPedidoCompraService.getItemPedidoCompra(idPedido)
            .subscribe(
                response => {
                    this.itensPedidoCompra = response;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(response);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.loaderService.hide();
                    
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

    onSubmit() {
        if (this.novoPedido == 0) {
            this.createPedidoCompra(this.pedidoCompra);
        }
        else {
            this.updatePedidoCompra(this.pedidoCompra);
        };

        this.pedidoCompraForm.reset;
        this.router.navigateByUrl(`compras/pedido-compra`);
    };

    cancelar() {
        this.pedidoCompraForm.reset;
        this.router.navigateByUrl(`compras/pedido-compra`);
    };

    updatePedidoCompra(pedidoCompra: PedidoCompra) {
        this.pedidoCompraService.updatePedidoCompra(pedidoCompra)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Pedido de compra alterado com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao alterar o pedido de compra', 'OK');
                    }
            },
                error => console.log(error.message)
            );
    }

    createPedidoCompra(pedidoCompra: PedidoCompra) {
/*
        cliente.idEmpresa = 1;
        this.clienteService.createCliente(cliente)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Cliente inserido com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao incluir o cliente', 'OK');
                    }
                },
                error => console.log(error.message)
            );
*/
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    btnEditItem(itemPedidoCompra: ItemPedidoCompra) {
        const dialogRef = this.dialog.open(ItemPedidoCompraDialogComponent, {
            width: '1500px',
            height: '150px',
            data: {
                idItemPedidoCompra: itemPedidoCompra.idItemPedidoCompra,
                idProduto: itemPedidoCompra.idProduto,
                quantidade: itemPedidoCompra.quantidade,
                precoUnitario: itemPedidoCompra.precoUnitario,
                total: itemPedidoCompra.total,
                codigo: itemPedidoCompra.codigo,
                descricao: itemPedidoCompra.descricao,
                tipoProduto: itemPedidoCompra.tipoProduto,
                unidadeMedida: itemPedidoCompra.unidadeMedida,
            }
        });
      
        dialogRef.afterClosed().subscribe(
            result => {
                this.getItensPedidoCompra(this.pedidoCompra.idPedidoCompra);
            }
        );        
    }
}
