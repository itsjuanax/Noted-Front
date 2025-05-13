import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSleepComponent } from './registro-sleep.component';

describe('RegistroSleepComponent', () => {
  let component: RegistroSleepComponent;
  let fixture: ComponentFixture<RegistroSleepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroSleepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroSleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
