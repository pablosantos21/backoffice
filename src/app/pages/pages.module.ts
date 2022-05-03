import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, UserDetailComponent],
  imports: [CommonModule, PagesRoutingModule, FormsModule],
})
export class PagesModule {}
