import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCompraComponent } from './pedido-compra.component';

describe('PedidoCompraComponent', () => {
  let component: PedidoCompraComponent;
  let fixture: ComponentFixture<PedidoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
