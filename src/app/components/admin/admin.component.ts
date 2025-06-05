import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PolicyService } from '../../services/policy.service';
import { AdminPolicy } from '../../models/admin-policy.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  policies: AdminPolicy[] = [];
  selectedPolicy: AdminPolicy = {
    policyNumber: '',
    policyName: '',
    policyType: 'two-wheeler',
    premiumAmount: 0,
    coverageAmount: 0,
    description: '',
    isActive: true,
  }; 
  isEditMode: boolean = false; 
  isLoading: boolean = false;
  errorMessage: string | null = null; 

  constructor(private policyService: PolicyService) {} 

  ngOnInit(): void {
    this.fetchPolicies();
  }

  fetchPolicies(): void {
    this.isLoading = true;
    this.policyService.getPolicies().subscribe({
      next: (policies) => {
        this.policies = policies;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load policies.';
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  createPolicy(policyData: AdminPolicy): void {
    this.policyService.createPolicy(policyData).subscribe({
      next: (newPolicy) => {
        this.policies.push(newPolicy); 
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Failed to create policy.';
        console.error(error);
      },
    });
  }
  
  
  editPolicy(policy: AdminPolicy): void {
    this.selectedPolicy = { ...policy }; 
    this.isEditMode = true;
  }

savePolicy(policyData: AdminPolicy): void {
  if (this.selectedPolicy?.policyNumber) { 
    this.policyService.updatePolicyByNumber(this.selectedPolicy.policyNumber, policyData).subscribe({
      next: (updatedPolicy) => {
        const index = this.policies.findIndex((p) => p.policyNumber === updatedPolicy.policyNumber);
        if (index !== -1) {
          this.policies[index] = updatedPolicy; 
        }
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Failed to update policy.';
        console.error(error);
      },
    });
  }
}

deletePolicy(policyNumber: string): void {
  this.policyService.deletePolicy(policyNumber).subscribe({
    next: () => {
      this.policies = this.policies.filter((p) => p.policyNumber !== policyNumber);
    },
    error: (error) => {
      this.errorMessage = 'Failed to delete policy.';
      console.error(error);
    },
  });
}
  resetForm(): void {
    this.selectedPolicy = {
      policyNumber: '',
      policyName: '',
      policyType: 'two-wheeler',
      premiumAmount: 0,
      coverageAmount: 0,
      description: '',
      isActive: true,
    }; 
    this.isEditMode = false;
    this.errorMessage = null;
  }

  onSubmit(): void {
    if (this.isEditMode && this.selectedPolicy) {
      this.savePolicy(this.selectedPolicy);
    } else if (this.selectedPolicy) {
      this.createPolicy(this.selectedPolicy);
    }
  }
}