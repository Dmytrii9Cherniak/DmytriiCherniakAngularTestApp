import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharactersModel } from '../../models/charactersModel';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DifferentCharacter } from '../../models/differentCharacter';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss']
})
export class AllCharactersComponent implements OnInit {

  public characters: Observable<DifferentCharacter[]>

  constructor(private charactersService: CharactersService, private router: Router) {}

  ngOnInit() {
    this.getAllCharacters();
  }

  public getAllCharacters(): void {
    this.characters = this.charactersService
      .getAllCharacters()
      .pipe(map((response: CharactersModel) => {
      return response.results.sort((a,b) => {
        return a.name.localeCompare(b.name);
      })
    }));
  }


  public goToCharactersDetails(id: number): void {
    this.router.navigate([`characters/${id}`])
  }

}
