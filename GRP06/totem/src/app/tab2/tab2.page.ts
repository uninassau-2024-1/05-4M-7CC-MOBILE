import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService
  ) {}

  pokemonAtual: any = {
    abilitiesCount: 0,
    height: 0,
    name: '',
    svgURL: '',
    weight: 0,
    battleResult: '',
    nameColor: '',
  };

  ionViewDidEnter() {
    this.buscarPokemon();
  }

  buscarPokemon() {
    this.pokemonAtual = this.pokeAPIService
      .getPokeAPIService()
      .subscribe((value) => {
        this.pokemonAtual.abilitiesCount = JSON.parse(JSON.stringify(value))[
          'abilities'
        ].length;
        this.pokemonAtual.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonAtual.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonAtual.svgURL = this.pokeAPIService.getPokemonSVGURL(
          JSON.parse(JSON.stringify(value))['id']
        );
        this.pokemonAtual.weight = JSON.parse(JSON.stringify(value))['weight'];

        const pokemon1Abilities =
          this.pokeAPIService.tab1Pokemon.abilitiesCount;
        const pokemon2Abilities = this.pokemonAtual.abilitiesCount;

        if (pokemon2Abilities > pokemon1Abilities) {
          this.pokemonAtual.battleResult = 'Ganhou';
          this.pokemonAtual.nameColor = 'Green';

          // tab 2 ganhou, tab1 perdeu
          this.pokeAPIService.tab1Pokemon.battleResults['derrotas']++;

          this.pokeAPIService.battledPokemons.push({
            ...this.pokeAPIService.tab1Pokemon,
          });

          this.pokeAPIService.tab1Pokemon.battleResults = {
            vitorias: 0,
            derrotas: 0,
            empates: 0,
          };
        } else if (pokemon2Abilities < pokemon1Abilities) {
          this.pokemonAtual.battleResult = 'Perdeu';
          this.pokemonAtual.nameColor = 'Red';

          // tab 2 perdeu, tab1 ganhou
          this.pokeAPIService.tab1Pokemon.battleResults['vitorias']++;
        } else {
          this.pokemonAtual.battleResult = 'Empate';
          this.pokemonAtual.nameColor = 'Yellow';

          // empate
          this.pokeAPIService.tab1Pokemon.battleResults['empates']++;
        }
      });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
