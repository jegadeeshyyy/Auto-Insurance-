import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivePolicyComponent } from './inactive-policy.component';

describe('InactivePolicyComponent', () => {
  let component: InactivePolicyComponent;
  let fixture: ComponentFixture<InactivePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactivePolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
