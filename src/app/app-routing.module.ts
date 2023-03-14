import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCharactersModule } from './components/all-characters/all-characters.module';
import { DifferentCharacterModule } from './components/different-character/different-character.module';

const routes: Routes = [
  { path: 'characters', loadChildren: () => AllCharactersModule },
  { path: '', redirectTo: 'characters', pathMatch: 'full'},
  { path: 'characters/:id', loadChildren:  () => DifferentCharacterModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
