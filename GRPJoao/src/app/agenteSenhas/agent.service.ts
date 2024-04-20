import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  senhas:any[]=[]; 

  sequenciaSP:number=0; 
  sequenciaSE:number=0; 
  sequenciaSG:number=0; 

  ultimasSenhasChamadas: any[]=[]; 

  totalSenhasGeradas: number = 0; 
  totalSenhasAtendidas: number = 0;
   

  contadorPrioridade:{[key: string]: number}={}; // Quantitativo das senhas emitidas por prioridade
  atendimentoPrioridade:{[key: string]: number}={}; // Quantitativo das senhas atendidas por prioridade
  historico:any[]=[]; // Relatório detalhado das senhas

  constructor() {}

  
  gerarNovaSenha(tipo: string): string {
    let senha: string = '';
    const now: Date = new Date();
    const DD: string = ('0' + now.getDate()).slice(-2);
    const MM: string = ('0' + (now.getMonth() + 1)).slice(-2);
    const YY: string = now.getFullYear().toString().slice(-2);
    let PP: string = '';

    if (tipo==='SP') {
      PP = tipo + ('0' + (this.sequenciaSP + 1)).slice(-2);
      this.sequenciaSP++;
    } else if (tipo === 'SE') {
      PP = tipo + ('0' + (this.sequenciaSE + 1)).slice(-2);
      this.sequenciaSE++;
    } else if (tipo === 'SG') {
      PP = tipo + ('0' + (this.sequenciaSG + 1)).slice(-2);
      this.sequenciaSG++;
    }

    senha = YY + MM + DD + '-' + PP;

    this.senhas.push({
      senha,
      tipo,
      dataEmissao: now,
      dataAtendimento: null,
      guicheAtendimento: null
    });

    this.totalSenhasGeradas++;
    this.contadorPrioridade[tipo] = (this.contadorPrioridade[tipo] || 0) + 1;

    return senha;
  }
  pegarIcone(tipo: string): string {
    let icone: string = '';
    return icone;
  }
  chamarSenha(): void {
    const senha: any = this.proximaSenha();
    if (senha !== null) {
      this.ultimasSenhasChamadas.unshift(senha);
      this.atendimentoPrioridade[senha.tipo] = (this.atendimentoPrioridade[senha.tipo] || 0) + 1;

      const now: Date = new Date();
      senha.dataAtendimento = now;
      senha.guicheAtendimento = 'guiche_exemplo';

      this.totalSenhasAtendidas++;

      const index: number = this.senhas.findIndex(s => s.senha === senha.senha);
      if (index !== -1) {
        this.senhas[index] = senha;
      }

      this.historico.unshift({
        senha: senha.senha,
        tipo: senha.tipo,
        dataEmissao: senha.dataEmissao,
        dataAtendimento: senha.dataAtendimento,
        guicheAtendimento: senha.guicheAtendimento
      });
    }
  }
  private proximaSenha(): any | null {
    let senha: any = null;

    if (this.senhas.length > 0) {
      if (this.senhas[0].tipo === 'SP') {
        senha = this.senhas.shift();
      } else {
        const prioridades: string[] = ['SP', 'SE', 'SG'];
        for (let prioridade of prioridades) {
          const index: number = this.senhas.findIndex(s => s.tipo === prioridade);
          if (index !== -1) {
            senha = this.senhas.splice(index, 1)[0];
            break;
          }
        }
      }
    }

    return senha;
  }

  calcularTempoMedioAtendimento(tipo: string): number {
    let tempoMedio: number = 0;
    if (tipo === 'SP') {
      tempoMedio = 15; 
    } else if (tipo === 'SE') {
      tempoMedio = 1; 
    } else if (tipo === 'SG') {
      tempoMedio = 5; 
    }
    return tempoMedio;
  }

  gerarHistorico(): any {
    const historico: any = {
      totalSenhasGeradas: this.totalSenhasGeradas,
      totalSenhasAtendidas: this.totalSenhasAtendidas,
      contadorPrioridade: this.contadorPrioridade,
      atendimentoPrioridade: this.atendimentoPrioridade,
      historico: this.historico
    };
    return historico;
  }

  reiniciarSequenciasDiarias(): void {
    this.sequenciaSP = 0;
    this.sequenciaSE = 0;
    this.sequenciaSG = 0;
  }

}

