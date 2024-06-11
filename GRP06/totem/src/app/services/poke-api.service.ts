import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) {}

  tab1Pokemon: any = {
    abilitiesCount: 0,
    frontDefaultURL: '',
    height: 0,
    name: '',
    svgURL: '',
    weight: 0,
    battleResults: {},
  };

  battledPokemons: any[] = [];

  getPokeAPIService(id: number = Math.floor(Math.random() * 100)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getPokemonSVGURL(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }
}
