import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharactersModel } from '../../models/charactersModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss']
})
export class AllCharactersComponent implements OnInit {

  public characters: CharactersModel

  constructor(private charactersService: CharactersService, private router: Router) {}

  ngOnInit() {
    this.charactersService.getAllCharacters().subscribe(value => {
      this.characters = value;
    })
    this.sort();
  }

  public sort() {
    this.characters?.results.sort((a,b) => a.name.localeCompare(b.name));
    setTimeout(() => {
      console.log(this.characters?.results)
    }, 1500)
  }

  public goToCharactersDetails(id: number): void {
    console.log(id)
    this.router.navigate([`characters/${id}`])
  }

}
