import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [IndexComponent, ProfileComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  exports: [],
})
export class HomeModule {}
