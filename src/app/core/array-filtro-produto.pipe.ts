import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFiltroProduto'
})
export class ArrayFiltroProdutoPipe implements PipeTransform {

    transform(value: Array<any>, filtro: string): any {
        const filterValue = filtro.toLowerCase();
        if (filterValue) {
            return value.filter(produto => produto.descricao.toLowerCase().includes(filterValue));
        }
        else {
            return value;
        }
    }
}
