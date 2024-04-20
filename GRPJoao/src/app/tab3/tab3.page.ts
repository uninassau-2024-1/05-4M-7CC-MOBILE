import { Component } from '@angular/core';
import { AgentService } from '../agenteSenhas/agent.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(public agentService: AgentService) {}

  // Métodos para calcular os relatórios
  calcularContadorGeralEmitidas(): number {
    return this.agentService.senhas.length;
  }

  calcularContadorGeralAtendidas(): number {
    return this.agentService.ultimasSenhasChamadas.length;
  }

  calcularContadorPrioridade(tipo: string): number {
    return this.agentService.senhas.filter(senha => senha.icon === this.agentService.pegarIcone(tipo)).length;
  }

  calcularContadorAtendidasPrioridade(tipo: string): number {
    return this.agentService.ultimasSenhasChamadas.filter(senha => senha.icon === this.agentService.pegarIcone(tipo)).length;
  }
}