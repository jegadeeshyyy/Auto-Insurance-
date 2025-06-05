import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-active-policy',
  imports: [CommonModule, FormsModule],
  templateUrl: './active-policy.component.html',
  styleUrls: ['./active-policy.component.scss'],
})
export class ActivePolicyComponent implements OnInit {
  activePolicies: Policy[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.fetchActivePolicies();
  }

  fetchActivePolicies(): void {
    this.isLoading = true;
    this.policyService.getactivePolicies().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.activePolicies = response;
        } else if (response) {
          this.activePolicies = [response]; 
        } else {
          this.activePolicies = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load active policies.';
        console.error(error);
        this.isLoading = false;
      },
    });
  }
}
