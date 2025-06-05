import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applied-policies',
  imports: [CommonModule, FormsModule],
  templateUrl: './applied-policies.component.html',
  styleUrls: ['./applied-policies.component.scss'],
})
export class AppliedPoliciesComponent implements OnInit {
  pendingApplications: Policy[] = []; 
  approvedPolicies: Policy[] = [];
  rejectedPolicies: Policy[] = [];
  selectedApplication: Policy | null = null;
  isPopupOpen: boolean = false; 

  selectedFilter: string = 'pending';
  filteredApplications: Policy[] = [];

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.fetchPendingApplications();
    this.fetchApprovedPolicies();
    this.fetchRejectedPolicies();
    this.applyFilter();
  }

  fetchPendingApplications(): void {
    this.policyService.getPendingApplications().subscribe({
      next: (response: { message: string; data: Policy[] }) => {
        console.log('Fetched pending applications:', response);
        this.pendingApplications = response.data || [];
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to fetch pending applications:', error);
      },
    });
  }

  fetchApprovedPolicies(): void {
    this.policyService.getApprovedPolicies().subscribe({
      next: (policies) => {
        console.log('Fetched approved policies:', policies);
        this.approvedPolicies = policies;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to fetch approved policies:', error);
      },
    });
  }

  fetchRejectedPolicies(): void {
    this.policyService.getRejectedPolicies().subscribe({
      next: (policies) => {
        console.log('Fetched rejected policies:', policies);
        this.rejectedPolicies = policies;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to fetch rejected policies:', error);
      },
    });
  }

  applyFilter(): void {
    if (this.selectedFilter === 'pending') {
      this.filteredApplications = this.pendingApplications;
    } else if (this.selectedFilter === 'approved') {
      this.filteredApplications = this.approvedPolicies;
    } else if (this.selectedFilter === 'rejected') {
      this.filteredApplications = this.rejectedPolicies;
    }
  }

  onFilterChange(event: Event): void {
    console.log('Filter changed to:', this.selectedFilter);
    this.applyFilter();
  }

  openPopup(application: Policy): void {
    this.selectedApplication = application;
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.selectedApplication = null;
    this.isPopupOpen = false;
  }


}