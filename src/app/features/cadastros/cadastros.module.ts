import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientesComponent } from './clientes/clientes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { TransportadorasComponent } from './transportadoras/transportadoras.component';

export const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clientes' },
    { path: 'clientes', component: ClientesComponent },
    { path: 'fornecedores', component: FornecedoresComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'transportadoras', component: TransportadorasComponent },
];

@NgModule({
    declarations: [
        ClientesComponent,
        FornecedoresComponent,
        ProdutosComponent,
        TransportadorasComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class CadastrosModule { }
