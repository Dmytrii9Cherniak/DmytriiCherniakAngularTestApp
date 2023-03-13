import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CharactersModel } from '../models/charactersModel';
import { DifferentCharacterModel } from '../models/differentCharacterModel';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private httpClient: HttpClient) { }

  public getAllCharacters(): Observable<CharactersModel> {
    return this.httpClient.get<CharactersModel>(`${environment.apiUrl}/character`);
  }

  public getDifferentCharacter(id: number):Observable<DifferentCharacterModel> {
    return this.httpClient.get<DifferentCharacterModel>(`${environment.apiUrl}/character/${id}`);
  }



}