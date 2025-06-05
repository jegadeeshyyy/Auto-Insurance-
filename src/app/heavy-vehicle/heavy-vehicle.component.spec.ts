import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyVehicleComponent } from './heavy-vehicle.component';

describe('HeavyVehicleComponent', () => {
  let component: HeavyVehicleComponent;
  let fixture: ComponentFixture<HeavyVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeavyVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeavyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
