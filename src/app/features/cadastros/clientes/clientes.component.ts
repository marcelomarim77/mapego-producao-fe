import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    constructor(public formBuilder: FormBuilder) { }

    clienteForm = this.formBuilder.group({
        razaoSocial: ['',
            Validators.required
        ],
        email: ['',
            Validators.email
        ],
    });

    ngOnInit(): void {
    }

    validationMessages = {
        'razaoSocial': [
          { type: 'required', message: 'Informe o nome ou razão social' },
          { type: 'maxlength', message: 'Nome ou razão social não pode ter mais que 60 caracteres' },
        ],
        'email': [
          { type: 'required', message: 'E-mail é obrigatório' },
          { type: 'email', message: 'Informe um e-mail válido' }
        ],
    }    

    onSubmitUserDetails() {
        console.warn(this.clienteForm.value)
    }
}
