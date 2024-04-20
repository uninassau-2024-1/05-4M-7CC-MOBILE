import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private lastTickets: string[] = [];

  gerarTicket(type: string) {
    const ticket = this.generateTicket(type);
    this.lastTickets.unshift(ticket);
    if (this.lastTickets.length > 5) {
      this.lastTickets.pop();
    }
    console.log('Gerando ticket:', ticket);
  }

  private generateTicket(type: string): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const sequence = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${year}${month}${day}-${type}${sequence}`;
  }

  getLastTickets(): string[] {
    return this.lastTickets;
  }
}
