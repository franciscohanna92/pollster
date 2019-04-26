import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollBarChartComponent } from './poll-bar-chart.component';

describe('PollBarChartComponent', () => {
  let component: PollBarChartComponent;
  let fixture: ComponentFixture<PollBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
