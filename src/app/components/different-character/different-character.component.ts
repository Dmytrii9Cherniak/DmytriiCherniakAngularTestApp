import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { DifferentCharacter } from '../../models/differentCharacter';

@Component({
  selector: 'app-different-character',
  templateUrl: './different-character.component.html',
  styleUrls: ['./different-character.component.scss']
})
export class DifferentCharacterComponent implements OnInit {

 public characterDetails: DifferentCharacter;

 constructor(private activatedRoute: ActivatedRoute, private charactersService: CharactersService) {}

 ngOnInit() {
   this.activatedRoute.params.subscribe(params => {
     this.charactersService
       .getDifferentCharacter(params['id'])
       .subscribe(value => this.characterDetails = value)
   })
 }

 public goBack(): void {
   history.back();
 }

}
