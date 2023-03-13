import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DifferentCharacterComponent } from './different-character.component';

const routes: Routes = [
  { path: '', component: DifferentCharacterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DifferentCharacterRoutingModule { }
