import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from "@angular/material/paginator";
import { TableMaterialModule } from './../../core/material-module';

import { PedidoCompraComponent } from './pedido-compra/pedido-compra.component';
import { PedidoCompraDetalheComponent } from './pedido-compra-detalhe/pedido-compra-detalhe.component';

export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'pedido-compra' },
    { path: 'pedido-compra', component: PedidoCompraComponent },
    { path: 'pedido-compra/:id', component: PedidoCompraDetalheComponent },
];

@NgModule({
    declarations: [
        PedidoCompraComponent,
        PedidoCompraDetalheComponent
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
        RouterModule.forChild(ROUTES)
      ]
})
export class ComprasModule { }
