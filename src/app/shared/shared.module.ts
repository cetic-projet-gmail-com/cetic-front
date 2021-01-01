import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, NavComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent],
})
export class SharedModule {}