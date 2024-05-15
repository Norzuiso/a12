import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductorConsumidorComponent } from './productor-consumidor.component';

describe('ProductorConsumidorComponent', () => {
  let component: ProductorConsumidorComponent;
  let fixture: ComponentFixture<ProductorConsumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductorConsumidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductorConsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
