import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { VendasComponent } from './vendas.component';

export const ROUTES: Routes = [
    { path: '', component: VendasComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [VendasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class VendasModule { }
