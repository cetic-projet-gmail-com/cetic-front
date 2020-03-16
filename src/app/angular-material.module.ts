import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule
    
} from '@angular/material';

@NgModule({
    imports: [MatAutocompleteModule,MatInputModule, MatExpansionModule, MatTooltipModule],
    exports: [MatAutocompleteModule,MatInputModule, MatExpansionModule, MatTooltipModule]
})

export class AngularMaterialModule{}