import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AgentComponent } from './components/agent/agent.component';
import { AdminComponent } from './components/admin/admin.component';
import { ActivePolicyComponent } from './components/active-policy/active-policy.component';
import { InactivePolicyComponent } from './components/inactive-policy/inactive-policy.component';
import { ApplyPolicyComponent } from './components/apply-policy/apply-policy.component';
import { TwoWheelerComponent } from './two-wheeler/two-wheeler.component';
import { FourWheelerComponent } from './four-wheeler/four-wheeler.component';
import { HeavyVehicleComponent } from './heavy-vehicle/heavy-vehicle.component';
import { ViewPolicyComponent } from './view-policy/view-policy.component';
import { AppliedPoliciesComponent } from './components/applied-policies/applied-policies.component';
export const routes: Routes = [ { path: '', redirectTo: '/user', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'agent', component: AgentComponent },
    { path: 'admin', component: AdminComponent },
    { path:'applied-policies',component:AppliedPoliciesComponent},
    { path: 'active-policies', component: ActivePolicyComponent },
    { path: 'inactive-policies', component: InactivePolicyComponent },
    { path: 'apply-policy/:policyNumber', component: ApplyPolicyComponent },
    { path: 'two-wheeler', component: TwoWheelerComponent },
    { path: 'four-wheeler', component: FourWheelerComponent},
    { path: 'heavy-vehicle', component: HeavyVehicleComponent},
    { path: 'view-policy', component: ViewPolicyComponent},
    { path: '**', redirectTo: '/user' },
  ];
