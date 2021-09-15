import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from "@angular/material/paginator";
import { TableMaterialModule } from './../../core/material-module';

import { ProdutoComposicaoComponent } from './produto-composicao/produto-composicao.component';
import { ArrayFiltroProdutoPipe } from 'src/app/core/array-filtro-produto.pipe';

export const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'composicao' },
    { path: 'produto-composicao', component: ProdutoComposicaoComponent },
];

@NgModule({
  declarations: [
      ProdutoComposicaoComponent,
      ArrayFiltroProdutoPipe,
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
export class ProducaoModule { }
