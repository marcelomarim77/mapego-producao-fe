import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TipoPessoa } from '../../../interfaces/tipo-pessoa';
import { Fornecedor } from '../../../interfaces/fornecedor';
import { Cep } from '../../../interfaces/cep';
import { CepService } from 'src/app/services/cep.service';
import { Uf } from '../../../interfaces/uf';
import { UfService } from 'src/app/services/uf.service';
import { CnpjService } from 'src/app/services/cnpj.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-detalhe',
  templateUrl: './fornecedor-detalhe.component.html',
  styleUrls: ['./fornecedor-detalhe.component.css']
})
export class FornecedorDetalheComponent implements OnInit {

    cep: Cep;
    ufS: Uf[];

    fornecedor: Fornecedor;
    novoFornecedor: number;

    tiposPessoa: TipoPessoa[] = [
        { value: 'F', viewValue: 'Física' },
        { value: 'J', viewValue: 'Jurídica' },
    ];

    fornecedorForm = this.formBuilder.group({
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
        private fornecedorService: FornecedorService,
        private cepService: CepService,
        private ufService: UfService,
        private cnpjService: CnpjService) { }

    ngOnInit(): void {

        this.inicializaFornecedor();

        this.getUf();

        this.route.params.forEach((params: Params) => {
            const id: number = params['id'];
            this.novoFornecedor = id;

            if (id != 0) { // novo fornecedor
                this.getFornecedor(id);
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
        if (this.fornecedor.pessoa !== 'J') {
            alert('Pesquisa disponível apenas para Pessoa Jurídica');
            return;
        }

        if (this.fornecedor.cpfCnpj.length === 0) {
            alert('Informe o CNPJ para efetuar a busca');
            return;
        }

        this.cnpjService.getCnpj(this.fornecedor.cpfCnpj)
            .subscribe(
                response => { console.log(response)
                },
                error => console.log(error.message)
        );
    };

    pesquisaCep() {
        if (this.fornecedor.cep.length === 0) {
            alert('Informe o CEP para efetuar a busca');
            return;
        }

        this.cepService.getCep(this.fornecedor.cep)
            .subscribe(
                response => {
                    this.cep = response;
                    if (this.novoFornecedor == 0) { // novo fornecedor
                        this.fornecedor.endereco = this.cep.endereco,
                        this.fornecedor.bairro = this.cep.bairro,
                        this.fornecedor.cidade = this.cep.cidade,
                        this.fornecedor.uf = this.cep.uf,
                        this.fornecedor.cep = this.cep.cep,
                        this.fornecedor.ibge = this.cep.ibge
                    }
                },
                error => console.log(error.message)
        );
    };

    onSubmit() {
        this.fornecedorForm.reset;
        this.router.navigateByUrl(`cadastros/fornecedores`);

        if (this.novoFornecedor == 0) { // novo fornecedor
            this.createFornecedor(this.fornecedor);
        }
        else {
            this.updateFornecedor(this.fornecedor);
        };
    };

    cancelar() {
        this.fornecedorForm.reset;
        this.router.navigateByUrl(`cadastros/fornecedores`);
    };

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    }

    getFornecedor(idFornecedor: number): void {
        this.fornecedorService.getFornecedor(idFornecedor)
            .subscribe(
                response => this.fornecedor = response,
                error => console.log(error.message)
            );
    }

    updateFornecedor(fornecedor: Fornecedor) {
        this.fornecedorService.updateFornecedor(fornecedor)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Fornecedor alterado com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao alterar o fornecedor', 'OK');
                    }
            },
                error => console.log(error.message)
            );
    }

    createFornecedor(fornecedor: Fornecedor) {
        fornecedor.idEmpresa = 1;
        this.fornecedorService.createFornecedor(fornecedor)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Fornecedor inserido com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao incluir o fornecedor', 'OK');
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

    inicializaFornecedor() {
        this.fornecedor = {
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
        };
    }
}
