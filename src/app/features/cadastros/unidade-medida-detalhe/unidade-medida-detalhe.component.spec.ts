import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedidaDetalheComponent } from './unidade-medida-detalhe.component';

describe('UnidadeMedidaDetalheComponent', () => {
  let component: UnidadeMedidaDetalheComponent;
  let fixture: ComponentFixture<UnidadeMedidaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadeMedidaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeMedidaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
