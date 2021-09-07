import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';

import { LoaderService } from 'src/app/services/loader.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/interfaces/produto';

@Component({
  selector: 'app-produto-composicao',
  templateUrl: './produto-composicao.component.html',
  styleUrls: ['./produto-composicao.component.css']
})
export class ProdutoComposicaoComponent implements OnInit {

    materiaPrima: Produto[] = [];
    composicaoProduto: Produto[] = [];
    produto = "Pantaneiro Rubi";

    constructor(private produtoService: ProdutoService,
                private loaderService: LoaderService) { }

    ngOnInit(): void {
        this.getMateriaPrima(1);
    }

    getMateriaPrima(idEmpresa: number): void {
        this.loaderService.show("Carregando matéria-prima");
        this.produtoService.getMateriaPrima(idEmpresa)
            .subscribe(
                response => {
                    this.materiaPrima = response;
                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                              event.container.data,
                              event.previousIndex,
                              event.currentIndex);
        }
    }

    entered(event: CdkDragEnter<string[]>) {
        console.log('inserir na tabela', event.item.data);
    }
       
    exited(event: CdkDragExit<string[]>) {
        console.log('excluir da tabela', event.item.data);
    }
}
