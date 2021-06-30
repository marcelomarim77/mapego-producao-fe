import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TipoPessoa } from './../../../core/tipo-pessoa';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { Cep } from './../../../core/cep';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

    cep: Cep;

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
        private cepService: CepService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const id: number = params['id'];
            this.novoCliente = id;

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
        alert('Chamar API de consulta CNPJ');
    };

    pesquisaCep() {
        if (this.cliente.cep.length === 0) {
            alert('Informe o CEP para efetuar a busca');
            return;
        }

        this.cepService.getCep(this.cliente.cep)
            .subscribe(
                response => {
                    this.cep = response,
                    this.cliente.endereco = this.cep.endereco,
                    this.cliente.bairro = this.cep.bairro,
                    this.cliente.cidade = this.cep.cidade,
                    this.cliente.uf = this.cep.uf,
                    this.cliente.cep = this.cep.cep,
                    this.cliente.ibge = this.cep.ibge
                },
                error => console.log(error.message)
        );
    };

    onSubmit() {
        this.clienteForm.reset;
        this.router.navigateByUrl(`cadastros/clientes`);

        if (this.novoCliente === 0) { // novo cliente
            this.openSnackBar('Cliente inserido com sucesso', 'OK');
        }
        else {
            this.openSnackBar('Cliente alterado com sucesso', 'OK');
            this.updateCliente(this.cliente);
        };
    };

    cancelar() {
        this.clienteForm.reset;
        this.router.navigateByUrl(`cadastros/clientes`);
    };

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getCliente(idCliente: number): void {
        this.clienteService.getCliente(idCliente)
            .subscribe(
                response => {this.cliente = response, console.log(this.cliente)},
                error => console.log(error.message)
            );
    }

    updateCliente(cliente: Cliente) {
        this.clienteService.updateCliente(cliente)
        .subscribe(
            response => {
            },
            error => console.log(error.message)
        );
    }
}
