import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCEPService {
  constructor(private httpClient: HttpClient) {}

  getViaCEPService(cep: string = '52011210'): Observable<any> {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
