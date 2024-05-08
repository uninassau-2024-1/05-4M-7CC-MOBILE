import { Component, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-ticket-panel',
  templateUrl: './ticket-panel.component.html',
  styleUrls: ['./ticket-panel.component.css']
})
export class TicketPanelComponent implements OnInit {
  lastTickets: string[];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.lastTickets = this.ticketService.getLastTickets();
  }
}
