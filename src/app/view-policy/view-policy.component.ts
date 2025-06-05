import { Component } from '@angular/core';
import { AdminPolicy } from '../models/admin-policy.model';
import { PolicyService } from '../services/policy.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-policy',
  imports: [CommonModule],
  templateUrl: './view-policy.component.html',
  styleUrl: './view-policy.component.scss'
})
export class ViewPolicyComponent {

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
  
    constructor(private policyService: PolicyService, private router: Router) {}
  
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

    applyForPolicy(policyNumber: string): void {
      this.router.navigate(['/apply-policy', policyNumber]);
    }
  

}
