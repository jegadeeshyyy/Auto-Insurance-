import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { AdminPolicy } from '../../models/admin-policy.model';
import { Policy } from '../../models/policy.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule,RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  policies: AdminPolicy[] = [];
  pendingApplications: Policy[] = [];
  approvedPolicies: Policy[] = [];
  rejectedPolicies: Policy[] = [];
  selectedFilter: string = 'pending';
  filteredApplications: Policy[] = [];
  policy: Policy[] = [];
  filteredPolicies: Policy[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private policyService: PolicyService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPolicies();
  }

  fetchPolicies(): void {
    this.isLoading = true;
    this.policyService.getAllPolicies().subscribe({
      next: (policies) => {
        this.policies = policies.map(policy => ({
          ...policy,
          membershipLevel: this.determineMembershipLevel(policy)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load policies.';
        console.error(error);
        this.isLoading = false;
      },
    });
  }
  private determineMembershipLevel(policy: AdminPolicy): string {
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