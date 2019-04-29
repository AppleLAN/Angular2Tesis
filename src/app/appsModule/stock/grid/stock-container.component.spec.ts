import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockContainerComponent } from './stock-container.component';

describe('StockContainerComponent', () => {
  let component: StockContainerComponent;
  let fixture: ComponentFixture<StockContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
