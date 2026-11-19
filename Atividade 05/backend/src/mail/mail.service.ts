import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

// Envia e-mails pelo Resend (serviço externo, via API HTTP).
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private cliente?: Resend;

  // Cliente criado sob demanda. Sem RESEND_API_KEY, só avisa no log e segue.
  private getCliente(): Resend | null {
    const chave = process.env.RESEND_API_KEY;
    if (!chave) return null;
    if (!this.cliente) this.cliente = new Resend(chave);
    return this.cliente;
  }

  async tarefaCriada(para: string, titulo: string): Promise<void> {
    const cliente = this.getCliente();
    if (!cliente) {
      this.logger.warn('RESEND_API_KEY ausente: e-mail não enviado.');
      return;
    }

    const { error } = await cliente.emails.send({
      from: process.env.MAIL_FROM || 'Tarefas <onboarding@resend.dev>',
      to: para,
      subject: 'Nova tarefa criada',
      html: `<p>Sua tarefa <b>${escaparHtml(titulo)}</b> foi criada.</p>`,
    });
    // O SDK do Resend devolve { error } em vez de lançar exceção.
    if (error) throw new Error(error.message);
  }
}

// O título vem do usuário: escapamos antes de colocar dentro do HTML.
function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
