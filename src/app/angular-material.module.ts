import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule

} from '@angular/material';

@NgModule({
    imports: [MatAutocompleteModule,MatInputModule, MatExpansionModule],
    exports: [MatAutocompleteModule,MatInputModule, MatExpansionModule]
})

export class AngularMaterialModule{}