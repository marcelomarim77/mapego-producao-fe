import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TipoPessoa } from '../../../interfaces/tipo-pessoa';
import { Cliente } from '../../../interfaces/cliente';
import { Cep } from '../../../interfaces/cep';
import { CepService } from 'src/app/services/cep.service';
import { Uf } from '../../../interfaces/uf';
import { UfService } from 'src/app/services/uf.service';
import { CnpjService } from 'src/app/services/cnpj.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

    cep: Cep;
    ufS: Uf[];

    cliente: Cliente;
    novoCliente: number;

    tiposPessoa: TipoPessoa[] = [
        { value: 'F', viewValue: 'Física' },
        { value: 'J', viewValue: 'Jurídica' },
    ];

    clienteForm = this.formBuilder.group({
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
        private clienteService: ClienteService,
        private cepService: CepService,
        private ufService: UfService,
        private cnpjService: CnpjService) { }

    ngOnInit(): void {

        this.inicializaCliente();

        this.getUf();

        this.route.params.forEach((params: Params) => {
            const id: number = params['id'];
            this.novoCliente = id;

            this.cliente.pessoa = 'J';
            if (id != 0) { // novo cliente
                this.getCliente(id);
            }
        });
    };

    validationMessages = {
        'pessoa': [
            { type: 'required', message: 'Informe Pessoa Física ou Jurídica' },
        ],
        'cpfCnpj': [
            { type: 'required', message: 'Informe o CPF ou CNPJ' },
            { type: 'pattern', message: 'Informe somente números' },
        ],
        'razaoSocial': [
          { type: 'required', message: 'Informe o nome ou razão social' },
        ],
        'email': [
          { type: 'required', message: 'E-mail é obrigatório' },
          { type: 'email', message: 'Informe um e-mail válido' }
        ],
    };

    pesquisaCnpj() {
        if (this.cliente.pessoa !== 'J') {
            alert('Pesquisa disponível apenas para Pessoa Jurídica');
            return;
        }

        if (this.cliente.cpfCnpj.length === 0) {
            alert('Informe o CNPJ para efetuar a busca');
            return;
        }

        this.cnpjService.getCnpj(this.cliente.cpfCnpj)
            .subscribe(
                response => {
                    console.log(response)
                },
                error => console.log(error.message)
        );
    };

    pesquisaCep() {
        if (this.cliente.cep.length === 0) {
            alert('Informe o CEP para efetuar a busca');
            return;
        }

        this.cepService.getCep(this.cliente.cep)
            .subscribe(
                response => {
                    this.cep = response;
                    this.atualizaCep();
                },
                error => {
                    alert(error.message);
                }
        );
    };

    atualizaCep() {
        this.cliente.endereco = this.cep.endereco,
        this.cliente.bairro = this.cep.bairro,
        this.cliente.cidade = this.cep.cidade,
        this.cliente.uf = this.cep.uf,
        this.cliente.ibge = this.cep.ibge
    }

    onSubmit() {
        this.clienteForm.reset;
        this.router.navigateByUrl(`cadastros/clientes`);

        if (this.novoCliente == 0) { // novo cliente
            this.createCliente(this.cliente);
        }
        else {
            this.updateCliente(this.cliente);
        };
    };

    cancelar() {
        this.clienteForm.reset;
        this.router.navigateByUrl(`cadastros/clientes`);
    };

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    }

    getCliente(idCliente: number): void {
        this.clienteService.getCliente(idCliente)
            .subscribe(
                response => this.cliente = response,
                error => console.log(error.message)
            );
    }

    updateCliente(cliente: Cliente) {
        this.clienteService.updateCliente(cliente)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Cliente alterado com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao alterar o cliente', 'OK');
                    }
            },
                error => console.log(error.message)
            );
    }

    createCliente(cliente: Cliente) {
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
    }

    getUf() {
        this.ufService.getUf()
            .subscribe(
                response => {
                    this.ufS = response,
                    this.ufS.sort(function(a,b) {
                        return a.descricao < b.descricao ? -1 : a.descricao > b.descricao ? 1 : 0;
                    });
                },
                error => console.log(error.message)
        );
    }

    inicializaCliente() {
        this.cliente = {
            idEmpresa: 0,
            idCliente: 0,
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
        };
    }
}
