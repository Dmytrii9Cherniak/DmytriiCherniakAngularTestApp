import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCharactersRoutingModule } from './all-characters-routing.module';
import { AllCharactersComponent } from './all-characters.component';

@NgModule({
  declarations: [
    AllCharactersComponent
  ],
  exports: [
    AllCharactersComponent
  ],
  imports: [
    CommonModule,
    AllCharactersRoutingModule
  ]
})
export class AllCharactersModule { }
