import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FinanceiroComponent } from './financeiro.component';

export const routes = [
    { path: '', component: FinanceiroComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [FinanceiroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FinanceiroModule { }
