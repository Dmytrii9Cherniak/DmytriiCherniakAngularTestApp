import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DifferentCharacterRoutingModule } from './different-character-routing.module';
import { DifferentCharacterComponent } from './different-character.component';


@NgModule({
  declarations: [
    DifferentCharacterComponent
  ],
  imports: [
    CommonModule,
    DifferentCharacterRoutingModule
  ]
})
export class DifferentCharacterModule { }
