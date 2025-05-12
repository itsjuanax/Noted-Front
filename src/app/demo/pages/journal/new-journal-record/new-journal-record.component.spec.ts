import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJournalRecordComponent } from './new-journal-record.component';

describe('NewJournalRecordComponent', () => {
  let component: NewJournalRecordComponent;
  let fixture: ComponentFixture<NewJournalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewJournalRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJournalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
