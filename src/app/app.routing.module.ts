import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features/features.component';

const ROUTES: Routes = [
    {
        path: '', component: FeaturesComponent,
        children: [
            { path: 'cadastros', loadChildren: () => import('./features/cadastros/cadastros.module').then(m => m.CadastrosModule) },
            { path: 'producao', loadChildren: () => import('./features/producao/producao.module').then(m => m.ProducaoModule) },
            { path: 'compras', loadChildren: () => import('./features/compras/compras.module').then(m => m.ComprasModule) },
            { path: 'vendas', loadChildren: () => import('./features/vendas/vendas.module').then(m => m.VendasModule) },
            { path: 'estoque', loadChildren: () => import('./features/estoque/estoque.module').then(m => m.EstoqueModule) },
            { path: 'financeiro', loadChildren: () => import('./features/financeiro/financeiro.module').then(m => m.FinanceiroModule) },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
