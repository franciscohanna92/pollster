import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPieChartComponent } from './poll-pie-chart.component';

describe('PollPieChartComponent', () => {
  let component: PollPieChartComponent;
  let fixture: ComponentFixture<PollPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
