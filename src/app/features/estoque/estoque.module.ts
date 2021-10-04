import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EstoqueComponent } from './estoque.component';

export const ROUTES: Routes = [
    { path: '', component: EstoqueComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [EstoqueComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class EstoqueModule { }
