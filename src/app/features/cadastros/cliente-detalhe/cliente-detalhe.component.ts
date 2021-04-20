import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TipoPessoa } from './../../../core/tipo-pessoa';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

    constructor(private snackBar: MatSnackBar,
                private router: Router,
                public formBuilder: FormBuilder) { }

    tipoPessoa: TipoPessoa[] = [
        {value: 0, viewValue: 'Física'},
        {value: 1, viewValue: 'Jurídica'},
    ];

    clienteForm = this.formBuilder.group({
        tipoPessoa: ['',
            Validators.required
        ],
        cpfCnpj: ['',
            Validators.required,
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

    ngOnInit(): void {
    };

    validationMessages = {
        'tipoPessoa': [
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
        alert('Chamar API de consulta CEP');
    };

    onSubmit() {
        this.clienteForm.reset;
        this.router.navigateByUrl(`cadastros/clientes`);
        this.openSnackBar('Cliente inserido com sucesso', 'OK');
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
}
