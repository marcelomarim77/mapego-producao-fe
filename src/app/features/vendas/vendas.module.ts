import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { VendasComponent } from './vendas.component';

export const routes = [
    { path: '', component: VendasComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [VendasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class VendasModule { }
