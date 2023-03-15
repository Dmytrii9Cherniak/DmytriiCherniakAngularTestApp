import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CharactersModel } from '../models/charactersModel';
import { DifferentCharacter } from '../models/differentCharacter';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private httpClient: HttpClient) { }

  public getAllCharacters(name?: string): Observable<CharactersModel> {
    const params = new HttpParams();
    name ? params.set('name', name) : {};
    return this.httpClient.get<CharactersModel>(`${environment.apiUrl}/character`, { params });
  }

  public getDifferentCharacter(id: number): Observable<DifferentCharacter> {
    return this.httpClient.get<DifferentCharacter>(`${environment.apiUrl}/character/${id}`);
  }



}
