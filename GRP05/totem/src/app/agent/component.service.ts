import { Component, } from '@angular/core';
import { TicketService } from '../ticket.service';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})


export class ComponentService {
  constructor(private ticketService: TicketService) { }

  gerarTicket(type: string) {
    this.ticketService.gerarTicket(type);
  }

  
}
