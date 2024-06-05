import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  numeroGuiche: string = '';

  constructor(public senhasService: SenhasService) {}

  chamarProximaSenha() { 
    if (this.senhasService.listaSenhas.ST.length > 0) {
      this.senhasService.listaSenhas.ST.sort((a: string, b: string) => {
        const priorityMap: { [key: string]: number } = { 'SP': 1, 'SE': 2, 'SG': 3 };
        return priorityMap[a.substring(9, 11)] - priorityMap[b.substring(9, 11)];
      });
      const proximaSenha = this.senhasService.listaSenhas.ST[0];
      this.senhasService.senhaRemovida = proximaSenha;
      this.senhasService.guicheAtual = this.numeroGuiche; // Define o guichê atual
      this.senhasService.listaSenhas.ST.shift();
      return proximaSenha;
    } else {
      console.log('Não há mais senhas na fila.');
      return null;
    }
  }
}
