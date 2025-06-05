import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AdminPolicy } from '../models/admin-policy.model';
import { Policy } from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private adminApiUrl = 'http://localhost:5000/api/admin';
  private userApiUrl = 'http://localhost:5000/api/user';
  private baseUrl = 'http://localhost:5000/api/agent';

  constructor(private http: HttpClient) {}

  createPolicy(policyData: AdminPolicy): Observable<AdminPolicy> {
    return this.http.post<AdminPolicy>(`${this.adminApiUrl}/create`, policyData);
  }

  getPolicies(): Observable<AdminPolicy[]> {
    return this.http.get<AdminPolicy[]>(`${this.adminApiUrl}`);
  }

  getPolicyById(policyId: string): Observable<AdminPolicy> {
    return this.http.get<AdminPolicy>(`${this.adminApiUrl}/${policyId}`);
  }

  updatePolicyByNumber(policyNumber: string, policyData: AdminPolicy): Observable<AdminPolicy> {
    return this.http.put<AdminPolicy>(`${this.adminApiUrl}/update/${policyNumber}`, policyData);
  }

  deletePolicy(policyNumber: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.adminApiUrl}/delete/${policyNumber}`);
  }



  getAllPolicies(): Observable<AdminPolicy[]> {
    return this.http.get<AdminPolicy[]>(`${this.userApiUrl}/policies`);
  }

  applyForPolicy(applicationData: any): Observable<any> {
    return this.http.post<any>(`${this.userApiUrl}/apply`, applicationData);
  }

  getAppliedPolicies(filter: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.userApiUrl}/applied-policies?filter=${filter}`);
  }

  getTwoWheelerPolicies(): Observable<{ message: string; data: AdminPolicy[] }> {
    return this.http.get<{ message: string; data: AdminPolicy[] }>(`${this.userApiUrl}/policies/two-wheeler`);
  }

  getFourWheelerPolicies(): Observable<{ message: string; data: AdminPolicy[] }> {
    return this.http.get<{ message: string; data: AdminPolicy[] }>(`${this.userApiUrl}/policies/four-wheeler`);
  }

  getHeavyVehiclePolicies(): Observable<{ message: string; data: AdminPolicy[] }> {
    return this.http.get<{ message: string; data: AdminPolicy[] }>(`${this.userApiUrl}/policies/heavy-vehicle`);
  }

  renewPolicy(applicationId: string, durationInMonths: number): Observable<any> {
    return this.http.put<any>(`${this.userApiUrl}/renew/${applicationId}`, { durationInMonths });
  }

  


  getPendingApplications(): Observable<{ message: string; data: Policy[] }> {
    return this.http.get<{ message: string; data: Policy[] }>(
      `${this.baseUrl}/applications/pending`
    );
  }

  approvePolicy(applicationId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/applications/${applicationId}/approve`, {});
  }

  rejectPolicy(applicationId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/applications/${applicationId}/reject`, {});
  }

  getApprovedPolicies(): Observable<Policy[]> {
    return this.http
      .get<{ message: string; data: Policy[] }>(`${this.baseUrl}/applications/approved`)
      .pipe(map((response) => response.data));
  }

  getRejectedPolicies(): Observable<Policy[]> {
    return this.http
      .get<{ message: string; data: Policy[] }>(`${this.baseUrl}/applications/rejected`)
      .pipe(map((response) => response.data));
  }

  getInactivePolicies(): Observable<Policy | Policy[]> {
    return this.http.get<Policy | Policy[]>(`${this.userApiUrl}/inactive-policies`);
  }
  getactivePolicies(): Observable<Policy | Policy[]> {
    return this.http.get<Policy | Policy[]>(`${this.userApiUrl}/active-policies`);
  }
}