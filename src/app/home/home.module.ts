import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [IndexComponent, ProfileComponent],
  imports: [CommonModule],
})
export class HomeModule {}
