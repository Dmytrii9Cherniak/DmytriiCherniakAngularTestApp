import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCharactersRoutingModule } from './all-characters-routing.module';
import { AllCharactersComponent } from './all-characters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllCharactersComponent
  ],
  exports: [
    AllCharactersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AllCharactersRoutingModule
  ]
})
export class AllCharactersModule { }
