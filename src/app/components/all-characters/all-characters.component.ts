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
    const nameParam = this.activatedRoute.snapshot.queryParams['name'] || '';
    this.form.controls['searchCharacterInput'].setValue(nameParam, { emitEvent: false });
    let searchTerm = nameParam;

    this.characters = this.form.controls['searchCharacterInput'].valueChanges.pipe(
      startWith(searchTerm),
      map((value: string) => value.trim()),
      distinctUntilChanged(),
      switchMap((value: string) => {
        searchTerm = value;
        const nameQueryParam = searchTerm.length ? { name: searchTerm } : undefined;
        return this.charactersService.getAllCharacters(searchTerm).pipe(
          map((response: CharactersModel) => {
            const characters = response.results.sort((a, b) => a.name.localeCompare(b.name));
            return searchTerm.length ? characters.filter((character: DifferentCharacter) => {
              const name = character.name.trim().toLowerCase();
              const searchTermLower = searchTerm.trim().toLowerCase();
              return name.startsWith(searchTermLower) ||
                searchTermLower.split('').every((char: string, index: number) => char === name.charAt(index));
            }) : characters;
          }),
          tap(() => {
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: nameQueryParam,
            });
          })
        );
      })
    );

    this.form.controls['searchCharacterInput'].valueChanges.pipe(
      map((value: string) => value.trim()),
      distinctUntilChanged(),
      filter((value: string) => value === ''),
      tap(() => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: undefined,
        });
      })
    ).subscribe();
  }



  public goToCharactersDetails(id: number): void {
    this.router.navigate([`characters/${id}`])
  }

}
