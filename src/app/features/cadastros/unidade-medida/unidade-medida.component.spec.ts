import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedidaComponent } from './unidade-medida.component';

describe('UnidadeMedidaComponent', () => {
  let component: UnidadeMedidaComponent;
  let fixture: ComponentFixture<UnidadeMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadeMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
