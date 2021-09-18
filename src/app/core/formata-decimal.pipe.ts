import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataDecimal'
})
export class FormataDecimalPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return null;
        }
        const numero = value.replace(/[^0-9]/g, '');
    
        if (numero.length === 11) {
            return numero.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
        } else if (numero.length === 14) {
            return numero.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
        }
    
//        return value;
        return numero
    }

}
