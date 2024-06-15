import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PokeApiService {
    constructor(private httpClient: HttpClient) {}
    getPokeAPIService(id: number = Math.floor(Math.random() * 100)) {
        return this.httpClient.get(`http://pokeapi.co/api/v2/pokemon/${id}`)
    }
  }
