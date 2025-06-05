import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../services/policy.service';
import { AdminPolicy } from '../models/admin-policy.model';
import { Router } from '@angular/router';

interface PolicyWithMembership extends AdminPolicy {
  membershipLevel: string;
}

@Component({
  selector: 'app-heavy-vehicle',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './heavy-vehicle.component.html',
  styleUrls: ['./heavy-vehicle.component.scss'],
})
export class HeavyVehicleComponent implements OnInit {
  heavyVehiclePolicies: PolicyWithMembership[] = []; 
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
    this.fetchHeavyVehiclePolicies();
  }

  fetchHeavyVehiclePolicies(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.policyService.getHeavyVehiclePolicies().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.heavyVehiclePolicies = response.data.map(policy => ({
            ...policy,
            membershipLevel: this.calculateMembershipLevel(policy)
          }));
        } else {
          this.errorMessage = 'Unexpected API response format.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load heavy vehicle policies.';
        console.error('Error fetching heavy vehicle policies:', error);
        this.isLoading = false;
      },
    });
  }

  private calculateMembershipLevel(policy: AdminPolicy): string {
    const { premiumAmount, coverageAmount } = policy;
    const valueRatio = coverageAmount / (premiumAmount || 1);
   
    if (premiumAmount > 100000 || coverageAmount > 10000000) return 'Elite';
    if (valueRatio > 120 || premiumAmount > 50000) return 'Gold';
    if (valueRatio > 90 || premiumAmount > 25000) return 'Premium';
    return 'Basic';
  }

  applyForPolicy(policyNumber: string): void {
    this.router.navigate(['/apply-policy', policyNumber]);
  }
}