import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-apply-policy',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apply-policy.component.html',
  styleUrls: ['./apply-policy.component.scss'],
})
export class ApplyPolicyComponent implements OnInit {
  applyForm!: FormGroup;
  policyNumber: string = '';
  uploadedFiles: { [key in 'drivingLicense' | 'idProof']: File | null } = {
    drivingLicense: null,
    idProof: null,
  };
  fileErrors: { [key in 'drivingLicense' | 'idProof']: string | null } = {
    drivingLicense: null,
    idProof: null,
  };

  noWhitespaceValidator(control: import('@angular/forms').AbstractControl): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService
  ) {}

      ngOnInit(): void {
    this.policyNumber = this.route.snapshot.paramMap.get('policyNumber') || '';

    this.applyForm = this.fb.group({
      userName: ['', [Validators.required, this.noWhitespaceValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      durationInMonths: [0, [Validators.required, Validators.min(1)]],
    });
  }

  handleFileInput(event: Event, field: 'drivingLicense' | 'idProof'): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0] || null;

    if (file) {
      if (file.type !== 'application/pdf') {
        this.fileErrors[field] = 'Only PDF files are allowed.';
        this.uploadedFiles[field] = null;
      } else if (file.size > 5 * 1024 * 1024) {
        this.fileErrors[field] = 'File size must not exceed 5MB.';
        this.uploadedFiles[field] = null;
      } else {
        this.fileErrors[field] = null;
        this.uploadedFiles[field] = file;
      }
    } else {
      this.fileErrors[field] = 'File is required.';
      this.uploadedFiles[field] = null;
    }
  }

  hasFileErrors(): boolean {
    return Object.values(this.fileErrors).some((error) => error !== null);
  }

  submitApplication(): void {
    if (this.applyForm.valid && !this.hasFileErrors()) {
      const formData = new FormData();
      formData.append('policyNumber', this.policyNumber);
      formData.append('userName', this.applyForm.get('userName')?.value);
      formData.append('email', this.applyForm.get('email')?.value);
      formData.append('durationInMonths', this.applyForm.get('durationInMonths')?.value);
      if (this.uploadedFiles.drivingLicense) {
        formData.append('drivingLicense', this.uploadedFiles.drivingLicense);
      }
      if (this.uploadedFiles.idProof) {
        formData.append('idProof', this.uploadedFiles.idProof);
      }

      this.policyService.applyForPolicy(formData).subscribe({
        next: (response) => {
          console.log('Application submitted successfully:', response);
          alert('Policy application submitted successfully!');
          this.router.navigate(['/applied-policies']); 
        },
        error: (error) => {
          console.error('Error submitting application:', error);
          alert('Failed to submit policy application. Please try again.');
        },
      });
    } else {
      alert('Please fill in all required fields and fix file errors.');
    }
  }
}