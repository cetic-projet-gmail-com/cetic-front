import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule
    
} from '@angular/material';

@NgModule({
    imports: [MatAutocompleteModule,MatInputModule, MatExpansionModule, MatTooltipModule, MatSnackBarModule ],
    exports: [MatAutocompleteModule,MatInputModule, MatExpansionModule, MatTooltipModule, MatSnackBarModule]
})

export class AngularMaterialModule{}