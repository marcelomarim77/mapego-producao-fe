import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EstoqueComponent } from './estoque.component';

export const routes = [
    { path: '', component: EstoqueComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [EstoqueComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EstoqueModule { }
