import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedPoliciesComponent } from './applied-policies.component';

describe('AppliedPoliciesComponent', () => {
  let component: AppliedPoliciesComponent;
  let fixture: ComponentFixture<AppliedPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliedPoliciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
