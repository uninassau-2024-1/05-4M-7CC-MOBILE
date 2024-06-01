import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  senhas: any[] = []; // Array para armazenar as senhas emitidas
  ultimasSenhasChamadas: any[] = []; // Array para armazenar as últimas senhas chamadas
  sequenciaSP: number = 0; // Sequência para senhas SP
  sequenciaSE: number = 0; // Sequência para senhas SE
  sequenciaSG: number = 0; // Sequência para senhas SG
  totalSenhasEmitidas: number = 0; // Total de senhas emitidas
  totalSenhasAtendidas: number = 0; // Total de senhas atendidas
  quantitativoPorPrioridade: { [key: string]: number } = {}; // Quantitativo das senhas emitidas por prioridade
  atendimentoPorPrioridade: { [key: string]: number } = {}; // Quantitativo das senhas atendidas por prioridade
  relatorioDetalhado: any[] = []; // Relatório detalhado das senhas

  constructor() { }

  getIcon(tipo: string): string {
    let icon: string = '';
    return icon;
  }

  gerarSenha(tipo: string): string {
    let senha: string = '';
    const now: Date = new Date();
    const YY: string = now.getFullYear().toString().slice(-2);
    const MM: string = ('0' + (now.getMonth() + 1)).slice(-2);
    const DD: string = ('0' + now.getDate()).slice(-2);
    let PP: string = '';

    if (tipo === 'SP') {
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

    this.totalSenhasEmitidas++;
    this.quantitativoPorPrioridade[tipo] = (this.quantitativoPorPrioridade[tipo] || 0) + 1;

    return senha;
  }

  chamarSenha(): void {
    const senha: any = this.obterProximaSenha();
    if (senha !== null) {
      this.ultimasSenhasChamadas.unshift(senha);
      this.atendimentoPorPrioridade[senha.tipo] = (this.atendimentoPorPrioridade[senha.tipo] || 0) + 1;

      const now: Date = new Date();
      senha.dataAtendimento = now;
      senha.guicheAtendimento = 'guiche_exemplo';

      this.totalSenhasAtendidas++;

      const index: number = this.senhas.findIndex(s => s.senha === senha.senha);
      if (index !== -1) {
        this.senhas[index] = senha;
      }

      this.relatorioDetalhado.unshift({
        senha: senha.senha,
        tipo: senha.tipo,
        dataEmissao: senha.dataEmissao,
        dataAtendimento: senha.dataAtendimento,
        guicheAtendimento: senha.guicheAtendimento
      });
    }
  }

  private obterProximaSenha(): any | null {
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

  gerarRelatorioDiario(): any {
    const relatorioDiario: any = {
      totalSenhasEmitidas: this.totalSenhasEmitidas,
      totalSenhasAtendidas: this.totalSenhasAtendidas,
      quantitativoPorPrioridade: this.quantitativoPorPrioridade,
      atendimentoPorPrioridade: this.atendimentoPorPrioridade,
      relatorioDetalhado: this.relatorioDetalhado
    };
    return relatorioDiario;
  }

  reiniciarSequenciasDiarias(): void {
    this.sequenciaSP = 0;
    this.sequenciaSE = 0;
    this.sequenciaSG = 0;
  }
}
