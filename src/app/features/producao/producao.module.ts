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

import { ProdutoComposicaoComponent } from './produto-composicao/produto-composicao.component';

export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'composicao' },
    { path: 'produto-composicao', component: ProdutoComposicaoComponent },
];

@NgModule({
  declarations: [
      ProdutoComposicaoComponent,
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
export class ProducaoModule { }
