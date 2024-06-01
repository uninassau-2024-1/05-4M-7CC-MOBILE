import { Component } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent {

  constructor(private ticketService: TicketService) { }

  emitTicket(type: string) {
    this.ticketService.emitTicket(type);
  }
}
