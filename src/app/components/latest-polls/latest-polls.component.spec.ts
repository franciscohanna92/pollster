import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPollsComponent } from './latest-polls.component';

describe('LatestPollsComponent', () => {
  let component: LatestPollsComponent;
  let fixture: ComponentFixture<LatestPollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestPollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
