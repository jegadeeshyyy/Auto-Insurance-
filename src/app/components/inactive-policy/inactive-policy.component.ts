import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-inactive-policy',
  imports: [CommonModule,FormsModule],
  templateUrl: './inactive-policy.component.html',
  styleUrls: ['./inactive-policy.component.scss'],
})
export class InactivePolicyComponent implements OnInit {
  inactivePolicies: Policy[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  selectedPolicy: Policy | null = null;
  renewalDuration: number | null = null;
  renewalModal: any;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.fetchInactivePolicies();
    this.renewalModal = new bootstrap.Modal(document.getElementById('renewalModal'));
  }

  fetchInactivePolicies(): void {
    this.isLoading = true;
    this.policyService.getInactivePolicies().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.inactivePolicies = response;
        } else {
          this.inactivePolicies = [response];
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load inactive policies.';
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  openRenewModal(policy: Policy): void {
    this.selectedPolicy = policy;
    this.renewalDuration = null;
    this.renewalModal.show();
  }

  confirmRenewal(): void {
    if (this.selectedPolicy && this.renewalDuration !== null && this.renewalDuration > 0) {
      this.policyService.renewPolicy(this.selectedPolicy._id, this.renewalDuration).subscribe({
        next: () => {
          alert(`Policy ${this.selectedPolicy!.policyNumber} has been successfully renewed for ${this.renewalDuration} months.`);
          this.fetchInactivePolicies();
          this.renewalModal.hide();
        },
        error: (error) => {
          alert(`Failed to renew policy ${this.selectedPolicy!.policyNumber}.`);
          console.error(error);
        },
      });
    } else {
      alert('Please enter a valid renewal duration.');
    }
  }
}