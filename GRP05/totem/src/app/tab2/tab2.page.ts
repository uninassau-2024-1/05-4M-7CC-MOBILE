import { Component } from '@angular/core';
import { AgentService } from '../agenteSenhas/agent.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public agentService: AgentService) {}

  chamarProximaSenha() {
    this.agentService.chamarSenha();
  }
}
