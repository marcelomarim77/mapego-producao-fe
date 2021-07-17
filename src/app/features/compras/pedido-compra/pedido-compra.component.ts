import { OnInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

import { PedidoCompra } from './../../../interfaces/pedido-compra';
import { LoaderService } from "src/app/services/loader.service";
import { PedidoCompraService } from './../../../services/pedido-compra.service';

@Component({
  selector: 'app-pedido-compra',
  templateUrl: './pedido-compra.component.html',
  styleUrls: ['./pedido-compra.component.css']
})
export class PedidoCompraComponent implements OnInit {

    pedidosCompra: PedidoCompra[];

    displayedColumns: string[] = [
        "idPedido",
        "dataPedido",
        "dataPrevisaoEntrega",
        "fornecedor",
        "status",
        "botaoEditar"
    ];

    dataSource: MatTableDataSource<PedidoCompra>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private pedidoCompraService: PedidoCompraService,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        // Obtem a lista de clientes
        this.getPedidosCompra(1);
    }
    
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    btnIncluir() {
    }

    btnEdit(pedidoCompra: PedidoCompra) {
        this.router.navigate([`compras/pedido-compra/${pedidoCompra.idPedidoCompra}`]);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getPedidosCompra(idEmpresa: number): void {
        this.loaderService.show("Carregando pedidos de compra");
        this.pedidoCompraService.getPedidosCompraByEmpresa(idEmpresa)
            .subscribe(
                response => {
                    this.pedidosCompra = response;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(response);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.loaderService.hide();
                },
                error => console.log(error.message)
            );
    }
}
