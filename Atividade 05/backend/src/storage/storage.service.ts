import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { extname } from 'path';

// Guarda os anexos no Supabase Storage (bucket). O arquivo chega em memória
// (file.buffer) porque o FileInterceptor da rota não define "storage".
@Injectable()
export class StorageService {
  private cliente?: SupabaseClient;

  // O cliente é criado só quando o primeiro upload acontece. Assim a API sobe
  // mesmo sem o .env do Supabase, e o erro aparece apenas ao anexar.
  private getCliente(): SupabaseClient {
    if (!this.cliente) {
      const url = process.env.SUPABASE_URL;
      const chave = process.env.SUPABASE_SERVICE_KEY;
      if (!url || !chave) {
        throw new InternalServerErrorException(
          'Storage não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_KEY no .env.',
        );
      }
      this.cliente = createClient(url, chave, {
        auth: { persistSession: false },
      });
    }
    return this.cliente;
  }

  private get bucket(): string {
    return process.env.SUPABASE_BUCKET || 'anexos';
  }

  // Envia o arquivo e devolve a URL pública. O nome gravado no bucket é um
  // UUID: não confiamos no nome original (colisão, "../", caracteres estranhos).
  async enviar(arquivo: Express.Multer.File): Promise<string> {
    const cliente = this.getCliente();
    const caminho = `tarefas/${randomUUID()}${extname(arquivo.originalname).toLowerCase()}`;

    const { error } = await cliente.storage
      .from(this.bucket)
      .upload(caminho, arquivo.buffer, { contentType: arquivo.mimetype });
    if (error) {
      throw new InternalServerErrorException(
        `Falha ao enviar o arquivo ao bucket: ${error.message}`,
      );
    }

    const { data } = cliente.storage.from(this.bucket).getPublicUrl(caminho);
    return data.publicUrl;
  }
}
