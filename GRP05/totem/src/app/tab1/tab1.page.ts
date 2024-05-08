import { Component } from '@angular/core';
import { AgentService } from '../agenteSenhas/agent.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ultimaSenhaGerada: { senha: string, tipo: string, icon: string } = { senha: '', tipo: '', icon: '' };

  constructor(public agentService: AgentService) {}
  gerarNovaSenha(tipo: string) {

    
    const senha = this.agentService.gerarNovaSenha(tipo);
    const senhaDoc = {senha, tipo, icon: this.agentService.pegarIcone(tipo) };
    
    this.ultimaSenhaGerada = senhaDoc;
  }

}
