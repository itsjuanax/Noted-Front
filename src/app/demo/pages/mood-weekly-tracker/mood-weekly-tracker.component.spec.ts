import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodWeeklyTrackerComponent } from './mood-weekly-tracker.component';

describe('MoodWeeklyTrackerComponent', () => {
  let component: MoodWeeklyTrackerComponent;
  let fixture: ComponentFixture<MoodWeeklyTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodWeeklyTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodWeeklyTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
