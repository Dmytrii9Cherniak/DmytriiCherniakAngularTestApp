import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharactersModel } from '../../models/charactersModel';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
    this.form.controls['searchCharacterInput'].valueChanges
      .subscribe(item => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: item.length ? { name: item } : {},
          queryParamsHandling: 'merge'
        })
        console.log(item)
    })
  }

  public goToCharactersDetails(id: number): void {
    this.router.navigate([`characters/${id}`])
  }

}
