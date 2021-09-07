import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoComposicaoComponent } from './produto-composicao.component';

describe('ProdutoComposicaoComponent', () => {
  let component: ProdutoComposicaoComponent;
  let fixture: ComponentFixture<ProdutoComposicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoComposicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoComposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
