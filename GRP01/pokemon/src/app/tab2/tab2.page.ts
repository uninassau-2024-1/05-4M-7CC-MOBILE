import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { DataSharingService } from '../services/data-sharing.service';
import { PhotoService } from '../services/photo.service';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  pokemon1: Pokemon = {
    name: '',
    sprites: {
      front_default: ''
    },
    abilities: [],
    height: 0,
    weight: 0
  };
  pokemon2: Pokemon = {
    name: '',
    sprites: {
      front_default: ''
    },
    abilities: [],
    height: 0,
    weight: 0
  };
  resultadoBatalha: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.currentPokemon.subscribe(pokemon => {
      if (pokemon) {
        this.pokemon1 = pokemon;
      }
    });
  }
  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }
  batalhar() {
    this.pokeAPIService.getPokeAPIService()
      .subscribe((pokemon: any) => {
        this.pokemon2 = pokemon;
        this.resultadoBatalha = this.calcularResultado(this.pokemon1, this.pokemon2);
        this.dataSharingService.recordBattle(
          this.pokemon1.name,
          this.pokemon1.sprites.front_default,
          this.getResultType(this.pokemon1, this.pokemon2)
        );
      });
  }

  calcularResultado(pokemon1: Pokemon, pokemon2: Pokemon): string {
    const peso1 = pokemon1.abilities;
    const peso2 = pokemon2.abilities;

    if (peso1 > peso2) {
      return `${pokemon1.name} venceu!`;
    } else if (peso2 > peso1) {
      return `${pokemon2.name} venceu!`;
    } else {
      return 'Empate!';
    }
  }

  getResultType(pokemon1: Pokemon, pokemon2: Pokemon): 'victory' | 'defeat' | 'tie' {
    const peso1 = pokemon1.abilities;
    const peso2 = pokemon2.abilities;

    if (peso1 > peso2) {
      return 'victory';
    } else if (peso2 == peso1) {
      return 'tie';
    } else {
      return 'defeat';
    }
  }
}
