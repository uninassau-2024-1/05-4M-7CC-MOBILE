import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface BattleRecord {
  pokemonName: string;
  pokemonSprite: string;
  victories: number;
  defeats: number;
  ties: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private pokemonSource = new BehaviorSubject<any>(null);
  currentPokemon = this.pokemonSource.asObservable();


  private battleRecordsSource = new BehaviorSubject<BattleRecord[]>([]);
  currentBattleRecords = this.battleRecordsSource.asObservable();

  setPokemon(pokemon: any) {
    this.pokemonSource.next(pokemon);
  }
 constructor() {}

  updatePokemon(pokemon: any) {
    this.pokemonSource.next(pokemon);
  }

  recordBattle(pokemonName: string, pokemonSprite: string, result: 'victory' | 'defeat' | 'tie') {
    const records = this.battleRecordsSource.getValue();
    let record = records.find(r => r.pokemonName === pokemonName);

    if (!record) {  
      record = { pokemonName, pokemonSprite, victories: 0, defeats: 0, ties: 0 };
      records.push(record);
    }

    if (result === 'victory') {
      record.victories++;
    } else if (result === 'defeat') {
      record.defeats++;
    } else {
      record.ties++;
    }

    this.battleRecordsSource.next(records);
  }
}