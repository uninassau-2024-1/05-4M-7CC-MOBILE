import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };

  pokemonAtual: any = {
    abilitiesCount: 0,
    frontDefaultURL: '',
    height: 0,
    name: '',
    svgURL: '',
    weight: 0,
    battleResults: {},
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService
  ) {
    this.buscarPokemon();
  }

  buscarPokemon() {
    this.viaCEPService
      .getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))[
          'logradouro'
        ];
        this.areaBusca.bairro = JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = JSON.parse(JSON.stringify(value))[
          'localidade'
        ];
        this.areaBusca.uf = JSON.parse(JSON.stringify(value))['uf'];
      });

    this.pokemonAtual = this.pokeAPIService
      .getPokeAPIService()
      .subscribe((value) => {
        this.pokemonAtual.abilitiesCount = JSON.parse(JSON.stringify(value))[
          'abilities'
        ].length;
        this.pokemonAtual.frontDefaultURL = JSON.parse(JSON.stringify(value))[
          'sprites'
        ]['front_default'];
        this.pokemonAtual.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonAtual.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonAtual.svgURL = this.pokeAPIService.getPokemonSVGURL(
          JSON.parse(JSON.stringify(value))['id']
        );
        this.pokemonAtual.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemonAtual.battleResults = {
          vitorias: 0,
          derrotas: 0,
          empates: 0,
        };
      });

    this.pokeAPIService.tab1Pokemon = this.pokemonAtual;
  }
}
