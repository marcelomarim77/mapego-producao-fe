import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FinanceiroComponent } from './financeiro.component';

export const ROUTES: Routes = [
    { path: '', component: FinanceiroComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [FinanceiroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class FinanceiroModule { }
