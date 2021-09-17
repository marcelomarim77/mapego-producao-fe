import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataCep'
})
export class FormataCepPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return null;
        }
        const identificacao = value.replace(/[^0-9]/g, '');
    
        if (identificacao.length === 8) {
            return identificacao.replace(/(\d{5})(\d{3})/g, "\$1\-\$2");
        }

        return value;
    }
}
