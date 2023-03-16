import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
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
  public loading: boolean = false;
  public response: DifferentCharacter[] = [];

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
    this.gettingAndInputCharacters();
    this.loading = true;
  }

  public gettingAndInputCharacters(): void {
    const inputSearchItem = localStorage.getItem('inputCharacterValue') || '';
    const filterCharacters = (value: string) =>
      this.charactersService.getAllCharacters(value).pipe(
        map(response =>
          response.results
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter(character => {
              const name = character.name.trim().toLowerCase();
              const searchInputItem = value.trim().toLowerCase();
              return (
                !searchInputItem ||
                name.startsWith(searchInputItem) ||
                searchInputItem.split('').every((char, index) => char === name.charAt(index))
              );
            })
        ),
        catchError(() => of([]))
      );
    const setCharacters = (value: string) => {
      this.loading = true;
      localStorage.setItem('inputCharacterValue', value);
      this.characters = filterCharacters(value).pipe(finalize(() => this.loading = false));
      this.characters.subscribe(response => this.response = response);
    };
    this.form.controls['searchCharacterInput'].setValue(inputSearchItem);
    setCharacters(inputSearchItem);
    this.form.controls['searchCharacterInput'].valueChanges.subscribe(setCharacters);
  }

  public goToCharactersDetails(id: number): void {
    this.router.navigate([`characters/${id}`])
  }

}
