import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paragraphe } from '../../models/traitement-agent.models';

@Component({
  selector: 'app-modal-ajout-paragraphe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-ajout-paragraphe.component.html',
})
export class ModalAjoutParagrapheComponent implements OnChanges {

  @Input() visible = false;
  @Input() paragraphesExistants: Paragraphe[] = [];

  @Output() fermer     = new EventEmitter<void>();
  @Output() sauvegarder = new EventEmitter<Paragraphe>();

  code  = '';
  label = '';
  erreur = '';

  ngOnChanges(): void {
    if (this.visible) {
      // Réinitialiser le formulaire à chaque ouverture
      this.code   = '';
      this.label  = '';
      this.erreur = '';
    }
  }

  onSauvegarder(): void {
    this.erreur = '';

    if (!this.code.trim()) {
      this.erreur = 'Le code du paragraphe est obligatoire.';
      return;
    }
    if (!this.label.trim()) {
      this.erreur = 'Le libellé du paragraphe est obligatoire.';
      return;
    }
    if (this.paragraphesExistants.find(p => p.code === this.code.trim())) {
      this.erreur = `Un paragraphe avec le code "${this.code.trim()}" existe déjà.`;
      return;
    }

    this.sauvegarder.emit({ code: this.code.trim(), label: this.label.trim() });
  }

  onFermer(): void {
    this.fermer.emit();
  }
}