import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharactersModel } from '../../models/charactersModel';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { DifferentCharacter } from '../../models/differentCharacter';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss']
})
export class AllCharactersComponent implements OnInit {

  public form: FormGroup;
  public characters: Observable<DifferentCharacter[]>;

  constructor(
    private charactersService: CharactersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchCharacterInput: ['']
    })
    this.getAllCharacters();
    this.detectInputChange();
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

  public detectInputChange(): void {
    const inputSearchItem = localStorage.getItem('inputCharacterValue') || '';

    const filterCharacters = (value: string) => {
      return this.charactersService.getAllCharacters(value).pipe(
        map((response) => {
          const characters = response.results.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          return value ? characters.filter((character: DifferentCharacter) => {
            const name = character.name.trim().toLowerCase();
            const searchInputItem = value.trim().toLowerCase();
            return name.startsWith(searchInputItem) ||
              searchInputItem.split('').every((char: string, index: number) => char === name.charAt(index));
          }) : characters;
        })
      );
    };

    this.form.controls['searchCharacterInput'].setValue(inputSearchItem);

    this.form.controls['searchCharacterInput'].valueChanges.subscribe(value => {
      localStorage.setItem('inputCharacterValue', value);
      this.characters = filterCharacters(value);
    });

    this.characters = filterCharacters(inputSearchItem);
  }

  public goToCharactersDetails(id: number): void {
    this.router.navigate([`characters/${id}`])
  }

}
