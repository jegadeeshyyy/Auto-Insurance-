export interface Policy {
  _id: string;
  policyNumber:string;
  userName: string;
  email: string;
  durationInMonths: number;
  drivingLicense?: File;
  idProof?: File;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  policyStatus: 'active' | 'inactive';
  policyStartDate?: string;
  policyEndDate?: string;
}