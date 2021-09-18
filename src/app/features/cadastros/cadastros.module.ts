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

import { ClientesComponent } from './clientes/clientes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { TransportadorasComponent } from './transportadoras/transportadoras.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { UnidadeMedidaComponent } from './unidade-medida/unidade-medida.component';
import { UnidadeMedidaDetalheComponent } from './unidade-medida-detalhe/unidade-medida-detalhe.component';
import { FornecedorDetalheComponent } from './fornecedor-detalhe/fornecedor-detalhe.component';
import { TipoProdutoComponent } from './tipo-produto/tipo-produto.component';
import { FormataCpfCnpjPipe } from 'src/app/core/formata-cpf-cnpj.pipe';
import { FormataFonePipe } from 'src/app/core/formata-fone.pipe';
import { FormataCepPipe } from 'src/app/core/formata-cep.pipe';
import { FormataDecimalPipe } from 'src/app/core/formata-decimal.pipe';

export const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clientes' },
    { path: 'clientes', component: ClientesComponent },
    { path: 'cliente/:id', component: ClienteDetalheComponent },
    { path: 'fornecedores', component: FornecedoresComponent },
    { path: 'fornecedor/:id', component: FornecedorDetalheComponent },
    { path: 'tipos-produto', component: TipoProdutoComponent },
    { path: 'unidades', component: UnidadeMedidaComponent },
    { path: 'unidade/:id', component: UnidadeMedidaDetalheComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'produto/:id', component: ProdutoDetalheComponent },
    { path: 'transportadoras', component: TransportadorasComponent },
];

@NgModule({
    declarations: [
        ClientesComponent,
        FornecedoresComponent,
        TipoProdutoComponent,
        ProdutosComponent,
        TransportadorasComponent,
        ClienteDetalheComponent,
        ProdutoDetalheComponent,
        UnidadeMedidaComponent,
        UnidadeMedidaDetalheComponent,
        FornecedorDetalheComponent,
        FormataCpfCnpjPipe,
        FormataFonePipe,
        FormataCepPipe,
        FormataDecimalPipe,
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
export class CadastrosModule { }
