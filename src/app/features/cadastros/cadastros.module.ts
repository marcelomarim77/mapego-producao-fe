import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from "@angular/material/paginator";

import { ClientesComponent } from './clientes/clientes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { TransportadorasComponent } from './transportadoras/transportadoras.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { TableMaterialModule } from './../../core/material-module';

export const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clientes' },
    { path: 'clientes', component: ClientesComponent },
    { path: 'cliente/:id', component: ClienteDetalheComponent },
    { path: 'fornecedores', component: FornecedoresComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'transportadoras', component: TransportadorasComponent },
];

@NgModule({
    declarations: [
        ClientesComponent,
        FornecedoresComponent,
        ProdutosComponent,
        TransportadorasComponent,
        ClienteDetalheComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        TableMaterialModule,
        RouterModule.forChild(routes)
    ]
})
export class CadastrosModule { }
