import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LigneIndividuelle, Paragraphe } from '../../models/traitement-agent.models';

@Component({
  selector: 'app-modal-individuel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-individuel.component.html',
  styleUrls: ['./modal-individuel.component.scss'],
  encapsulation: ViewEncapsulation.None,   // ← styles globaux, pas d'encapsulation
})
export class ModalIndividuelComponent {

  @Input() visible = false;
  @Input() paragrapheSelectionne: Paragraphe | null = null;

  @Input() gestion   = '';
  @Input() budget    = '';
  @Input() section   = '';
  @Input() programme = '';
  @Input() action    = '';
  @Input() activite  = '';
  @Input() chapitre  = '';
  @Input() statut    = '';
  @Input() age       = '';

  @Output() fermer      = new EventEmitter<void>();
  @Output() enregistrer = new EventEmitter<LigneIndividuelle[]>();

  lignes: LigneIndividuelle[] = [
    { depense: '', texte: '', observation: '', montant: 0 }
  ];

  ajouterLigne(): void {
    this.lignes.push({ depense: '', texte: '', observation: '', montant: 0 });
  }

  getTotal(): number {
    return this.lignes.reduce((sum, l) => sum + (Number(l.montant) || 0), 0);
  }

  onEnregistrer(): void {
    this.enregistrer.emit([...this.lignes]);
    this.onFermer();
  }

  onFermer(): void {
    this.fermer.emit();
  }
}