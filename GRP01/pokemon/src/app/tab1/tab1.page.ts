import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = ' ';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };

  pokemon: any;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private dataSharingService: DataSharingService 
  ) {}
  
  buscarPokemon() {
    const cep = this.areaBuscarPokemon.trim();
    if (cep.length !== 8) {
      alert('Por favor, insira um CEP válido com 8 números.');
      return;
    }

    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ',' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
      });

    this.pokeAPIService.getPokeAPIService()
      .subscribe((data: any) => {
        this.pokemon = {
          name: data.name,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
          sprites: data.sprites
        };
        this.dataSharingService.setPokemon(this.pokemon); 
      });
  }
}
