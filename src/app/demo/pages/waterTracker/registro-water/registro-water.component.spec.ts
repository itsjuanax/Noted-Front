import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroWaterComponent } from './registro-water.component';

describe('RegistroWaterComponent', () => {
  let component: RegistroWaterComponent;
  let fixture: ComponentFixture<RegistroWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroWaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
