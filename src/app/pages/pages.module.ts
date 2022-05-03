import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [DashboardComponent, UserDetailComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
