import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPriceListModalComponent } from './stock-price-list-modal.component';

describe('StockPriceListModalComponent', () => {
  let component: StockPriceListModalComponent;
  let fixture: ComponentFixture<StockPriceListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPriceListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPriceListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
