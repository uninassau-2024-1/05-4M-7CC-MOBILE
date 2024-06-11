import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

interface BattleRecord {
  pokemonName: string;
  pokemonSprite: string;
  victories: number;
  defeats: number;
  ties: number;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  battleRecords: BattleRecord[] = [];

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit() {
    this.dataSharingService.currentBattleRecords.subscribe((records: BattleRecord[]) => {
      this.battleRecords = records;
    });
  }
}
