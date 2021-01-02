import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatProgressBarModule, MatIconModule, MatMenuModule],
  exports: [
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
