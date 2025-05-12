import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalHistorialComponent } from './journal-historial.component';

describe('JournalHistorialComponent', () => {
  let component: JournalHistorialComponent;
  let fixture: ComponentFixture<JournalHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
