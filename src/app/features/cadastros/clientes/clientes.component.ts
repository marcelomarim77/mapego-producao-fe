import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { TipoPessoa } from './../../../core/tipo-pessoa';

interface Animal {
    name: string;
    sound: string;
}
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    constructor(public formBuilder: FormBuilder) { }

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
    }

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
    }    

    pesquisaCnpj() {
        alert('Chamar API de consulta CNPJ')
    }

    pesquisaCep() {
        alert('Chamar API de consulta CEP')
    }

    onSubmitUserDetails() {
        alert('Salvar o cliente')
    }

    cancelar() {
        this.clienteForm.reset
        alert('Cancelar')
    }
}
