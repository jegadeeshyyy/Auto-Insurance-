import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../services/policy.service';
import { AdminPolicy } from '../models/admin-policy.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-four-wheeler',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './four-wheeler.component.html',
  styleUrls: ['./four-wheeler.component.scss'],
})
export class FourWheelerComponent implements OnInit {
  fourWheelerPolicies: AdminPolicy[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private policyService: PolicyService, private router: Router) {}

  ngOnInit(): void {
    this.fetchFourWheelerPolicies(); 
  }
  fetchFourWheelerPolicies(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.policyService.getFourWheelerPolicies().subscribe({
      next: (response) => {
        console.log('API Response:', response);

        if (response && Array.isArray(response.data)) {
          this.fourWheelerPolicies = response.data.map(policy => ({
            ...policy,
            membershipLevel: this.getMembershipLevel(policy)
          }));
        } else {
          this.errorMessage = 'Unexpected API response format.';
        }

        this.isLoading = false; 
      },
      error: (error) => {
        this.errorMessage = 'Failed to load four-wheeler policies.';
        console.error('Error fetching four-wheeler policies:', error);
        this.isLoading = false; 
      },
    });
  }

  public getMembershipLevel(policy: AdminPolicy): string {
    const { premiumAmount, coverageAmount } = policy;
   
    const valueRatio = coverageAmount / (premiumAmount || 1);
   
    if (premiumAmount > 50000 || coverageAmount > 5000000) {
      return 'Elite';
    } else if (valueRatio > 100 || premiumAmount > 25000) {
      return 'Gold';
    } else if (valueRatio > 75 || premiumAmount > 10000) {
      return 'Premium';
    } else {
      return 'Basic';
    }
  }

  applyForPolicy(policyNumber: string): void {
    this.router.navigate(['/apply-policy', policyNumber]);
  }
}