import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Registros por página';
  customPaginatorIntl.firstPageLabel = 'Primeira';
  customPaginatorIntl.previousPageLabel = 'Anterior';
  customPaginatorIntl.nextPageLabel = 'Próxima';
  customPaginatorIntl.lastPageLabel = 'Última';

  return customPaginatorIntl;
}
