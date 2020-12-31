import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatProgressBarModule, MatIconModule, MatMenuModule],
  exports: [MatIconModule, MatMenuModule],
})
export class MaterialModule {}
