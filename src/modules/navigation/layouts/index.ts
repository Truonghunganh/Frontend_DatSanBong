import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { LayoutErrorComponent } from './layout-error/layout-error.component';
import { LayoutInnkeeperComponent } from './layout-innkeeper/layout-innkeeper.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';

export const layouts = [LayoutDashboardComponent, LayoutAuthComponent, LayoutErrorComponent, LayoutInnkeeperComponent, LayoutAdminComponent];

export * from './layout-dashboard/layout-dashboard.component';
export * from './layout-auth/layout-auth.component';
export * from './layout-error/layout-error.component';
export * from './layout-innkeeper/layout-innkeeper.component';
export * from './layout-admin/layout-admin.component';
