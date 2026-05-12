import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Paragraphe } from '../../models/traitement-agent.models';

@Component({
  selector: 'app-modal-ajout-paragraphe',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './modal-ajout-paragraphe.component.html',
  styleUrls: ['./modal-ajout-paragraphe.component.scss'],
})
export class ModalAjoutParagrapheComponent implements OnChanges {
  @Input()  visible             = false;
  @Input()  tousLesParagraphes: Paragraphe[] = [];  // tous les paragraphes disponibles
  @Input()  paragraphesActifs:  Paragraphe[] = [];  // déjà présents dans le tableau

  @Output() fermer      = new EventEmitter<void>();
  @Output() sauvegarder = new EventEmitter<Paragraphe>();

  paragrapheChoisi: Paragraphe | null = null;
  erreur = '';

  // Paragraphes disponibles = tous moins ceux déjà actifs
  get paragraphesDisponibles(): Paragraphe[] {
    const codesActifs = new Set(this.paragraphesActifs.map(p => p.code));
    return this.tousLesParagraphes.filter(p => !codesActifs.has(p.code));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.paragrapheChoisi = null;
      this.erreur           = '';
    }
  }

  confirmer(): void {
    if (!this.paragrapheChoisi) {
      this.erreur = 'Veuillez sélectionner un paragraphe.';
      return;
    }
    this.sauvegarder.emit(this.paragrapheChoisi);
  }

  annuler(): void {
    this.fermer.emit();
  }
}