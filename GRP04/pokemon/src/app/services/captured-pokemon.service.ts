import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapturedPokemonService {
  capturedPokemons: any[] = [];

  constructor() { }

  addCapturedPokemon(pokemon: any) {
    this.capturedPokemons.push(pokemon);
  }

  getCapturedPokemons() {
    return this.capturedPokemons;
  }
}
