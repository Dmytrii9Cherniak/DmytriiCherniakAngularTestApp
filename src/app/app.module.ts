import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AllCharactersModule } from './components/all-characters/all-characters.module';
import { DifferentCharacterModule } from './components/different-character/different-character.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AllCharactersModule,
    DifferentCharacterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
