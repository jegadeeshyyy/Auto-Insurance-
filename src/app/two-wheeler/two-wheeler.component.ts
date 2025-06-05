import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../services/policy.service';
import { AdminPolicy } from '../models/admin-policy.model';
import { Router } from '@angular/router';

interface PolicyWithMembership extends AdminPolicy {
  membershipLevel: string;
}

@Component({
  selector: 'app-two-wheeler',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './two-wheeler.component.html',
  styleUrls: ['./two-wheeler.component.scss'],
})
export class TwoWheelerComponent implements OnInit {
  twoWheelerPolicies: PolicyWithMembership[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  membershipLevelColors: { [key: string]: string } = {
    'Basic': 'bg-primary',
    'Premium': 'bg-success',
    'Elite': 'bg-purple',
    'Gold': 'bg-gold'
  };

  constructor(private policyService: PolicyService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTwoWheelerPolicies();
  }

  fetchTwoWheelerPolicies(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.policyService.getTwoWheelerPolicies().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.twoWheelerPolicies = response.data.map(policy => ({
            ...policy,
            membershipLevel: this.calculateMembershipLevel(policy)
          }));
        } else {
          this.errorMessage = 'Unexpected API response format.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load two-wheeler policies.';
        console.error('Error fetching two-wheeler policies:', error);
        this.isLoading = false;
      },
    });
  }

  private calculateMembershipLevel(policy: AdminPolicy): string {
    const { premiumAmount, coverageAmount } = policy;
    const valueRatio = coverageAmount / (premiumAmount || 1);
   
    if (premiumAmount > 20000 || coverageAmount > 1000000) return 'Elite';
    if (valueRatio > 80 || premiumAmount > 10000) return 'Gold';
    if (valueRatio > 50 || premiumAmount > 5000) return 'Premium';
    return 'Basic';
  }

  applyForPolicy(policyNumber: string): void {
    this.router.navigate(['/apply-policy', policyNumber]);
  }
}