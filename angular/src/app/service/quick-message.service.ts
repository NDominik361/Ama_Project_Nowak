import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class QuickMessageService {

  constructor(private messageService: MessageService) {
  }

  warningFormErrors(): void {
    this.createWarningMessage("Fehlende/ungültige Werte im Formular.");
  }

  createSuccessMessage(detail: string): void {
    this.messageService.add({severity: 'success', summary: 'Erfolg', detail, life: 1000});
  }

  createInfoMessage(detail: string): void {
    this.messageService.add({severity: 'info', summary: 'Info', detail});
  }

  createWarningMessage(detail: string): void {
    this.messageService.add({severity: 'warn', summary: 'Warnung', detail});
  }

  createErrorMessage(detail: string): void {
    this.messageService.add({severity: 'error', summary: 'Fehler', detail, sticky: true});
  }

  createErrorMessageWithSummaryAndDetail(summary: string, detail: string){
    this.messageService.add({severity: 'error', summary, detail, sticky: true})
  }

  clearMessages(): void {
    this.messageService.clear();
  }
}
