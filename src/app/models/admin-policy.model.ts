export interface AdminPolicy {
    _id?: string;
    policyNumber: string;
    policyName: string;
    policyType: 'two-wheeler' | 'four-wheeler' | 'heavy-vehicle';
    premiumAmount: number;
    coverageAmount: number;
    description?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    membershipLevel?: string;
  }