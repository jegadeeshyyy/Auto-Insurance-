import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourWheelerComponent } from './four-wheeler.component';

describe('FourWheelerComponent', () => {
  let component: FourWheelerComponent;
  let fixture: ComponentFixture<FourWheelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourWheelerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourWheelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
