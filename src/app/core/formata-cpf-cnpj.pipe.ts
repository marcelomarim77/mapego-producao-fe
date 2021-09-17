import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataCpfCnpj'
})
export class FormataCpfCnpjPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return null;
        }
        const identificacao = value.replace(/[^0-9]/g, '');
    
        if (identificacao.length === 11) {
            return identificacao.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
        } else if (identificacao.length === 14) {
            return identificacao.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
        }
    
        return value;
    }
}
