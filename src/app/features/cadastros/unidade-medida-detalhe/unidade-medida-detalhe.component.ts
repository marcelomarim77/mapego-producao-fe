import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnidadeMedida } from 'src/app/interfaces/unidade-medida';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
  selector: 'app-unidade-medida-detalhe',
  templateUrl: './unidade-medida-detalhe.component.html',
  styleUrls: ['./unidade-medida-detalhe.component.css']
})
export class UnidadeMedidaDetalheComponent implements OnInit {

    unidade: UnidadeMedida;
    novaUnidade: number;

    unidadeForm = this.formBuilder.group({
        codigo: ['', Validators.required],
        descricao: ['', Validators.required],
    });

    constructor(private snackBar: MatSnackBar,
        private router: Router,
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private unidadeMedidaService: UnidadeMedidaService) { }

    ngOnInit(): void {
        this.inicializaUnidade();

        this.route.params.forEach((params: Params) => {
            const id: number = params['id'];
            this.novaUnidade = id;

            if (id != 0) {
                this.getUnidade(id);
            }
        });
    }

    validationMessages = {
        'codigo': [
            { type: 'required', message: 'Informe o código da unidade de medida' },
        ],
        'descricao': [
            { type: 'required', message: 'Informe a descrição da unidade de medida' },
        ],
    };

    onSubmit() {
        if (this.novaUnidade == 0) { // novo unidade
            this.createUnidade(this.unidade);
        }
        else {
            this.updateUnidade(this.unidade);
        };

        this.unidadeForm.reset;
        this.router.navigateByUrl(`cadastros/unidades`);
    };

    cancelar() {
        this.unidadeForm.reset;
        this.router.navigateByUrl(`cadastros/unidades`);
    };

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getUnidade(id: number): void {
        this.unidadeMedidaService.getUnidadeMedida(id)
            .subscribe(
                response => this.unidade = response,
                error => console.log(error.message)
            );
    }

    inicializaUnidade() {
        this.unidade = {
            idEmpresa: 0,
            idUnidade: 0,
            codigo: '',
            descricao: ''
        };
    }

    updateUnidade(unidade: UnidadeMedida) {
        this.unidadeMedidaService.updateUnidade(unidade)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Unidade de medida alterada com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao alterar a unidade de medida', 'OK');
                    }
                },
                error => console.log(error.message)
            );
    }

    createUnidade(unidade: UnidadeMedida) {
        unidade.idEmpresa = 1;
        this.unidadeMedidaService.createUnidade(unidade)
            .subscribe(
                response => {
                    if (response) {
                        this.openSnackBar('Unidade de medida inserida com sucesso', 'OK');
                    } else {
                        this.openSnackBar('Falha ao incluir a unidade de medida', 'OK');
                    }
                },
                error => console.log(error.message)
            );
    }
}
