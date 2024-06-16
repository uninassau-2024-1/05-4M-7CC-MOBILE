import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

import { OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pokemon: any = { name: '', abilities: [] }; // Pokémon inicial vazio
  comparisonColor: string = '';
  statusText: string = '';

  constructor(private pokemonService: PokeApiService, private tab1: Tab1Page, public photoService: PhotoService) {}

  ngOnInit() {
    this.loadEmptyPokemon();
  }

  loadEmptyPokemon() {
    this.pokemonService.getEmptyPokemon().subscribe(data => {
      this.pokemon = { name: '', abilities: [] }; // Garantindo que inicialize vazio
    });
  }

  fetchPokemon() {
    this.pokemonService.getRandomPokemon().subscribe(data => {
      this.pokemon = data;
      this.compareAbilities();
    });
  }

  compareAbilities() {
    const pokemon1Abilities = this.tab1.pokemon.abilities.length;
    const pokemon2Abilities = this.pokemon.abilities.length;

    if (pokemon1Abilities === pokemon2Abilities) {
      this.comparisonColor = 'yellow';
      this.statusText = 'Empate';
    } else if (pokemon2Abilities > pokemon1Abilities) {
      this.comparisonColor = 'red';
      this.statusText = 'Ganhou';
    } else {
      this.comparisonColor = 'green';
      this.statusText = 'Perdeu';
    }
  }

  addPhotoToGallery(){
  this.photoService.addNewToGallery();

}
}
