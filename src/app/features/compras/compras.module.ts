import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComprasComponent } from './compras.component';

export const routes = [
    { path: '', component: ComprasComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ComprasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ComprasModule { }
