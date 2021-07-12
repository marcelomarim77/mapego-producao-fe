import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorDetalheComponent } from './fornecedor-detalhe.component';

describe('FornecedorDetalheComponent', () => {
  let component: FornecedorDetalheComponent;
  let fixture: ComponentFixture<FornecedorDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
