import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features/features.component';

const routes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        children: [
            { path: 'cadastros', loadChildren: () => import('./features/cadastros/cadastros.module').then(m => m.CadastrosModule) },
            { path: 'compras', loadChildren: () => import('./features/compras/compras.module').then(m => m.ComprasModule) }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
