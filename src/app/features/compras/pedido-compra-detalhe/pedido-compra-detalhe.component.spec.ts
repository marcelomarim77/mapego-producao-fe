import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCompraDetalheComponent } from './pedido-compra-detalhe.component';

describe('PedidoCompraDetalheComponent', () => {
  let component: PedidoCompraDetalheComponent;
  let fixture: ComponentFixture<PedidoCompraDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoCompraDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCompraDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
