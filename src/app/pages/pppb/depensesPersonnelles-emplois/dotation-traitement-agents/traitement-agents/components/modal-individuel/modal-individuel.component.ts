import {
  Component, Input, Output, EventEmitter,
  OnChanges, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LigneIndividuelle, Paragraphe, Agent } from '../../models/traitement-agent.models';

@Component({
  selector: 'app-modal-individuel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-individuel.component.html',
  styleUrls: ['./modal-individuel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalIndividuelComponent implements OnChanges {

  @Input() visible = false;
  @Input() paragrapheSelectionne: Paragraphe | null = null;
  @Input() agentEdite: Agent | null = null;

  @Input() exercice   = '';
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

  lignes: LigneIndividuelle[] = [];
  ligneEnEdition = -1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.ligneEnEdition = -1;

      // Charger les lignes existantes de l'agent, sinon démarrer avec une ligne vide
      this.lignes = this.agentEdite?.lignesIndividuelles?.length
        ? this.agentEdite.lignesIndividuelles.map((l: LigneIndividuelle) => ({ ...l }))
        : [{ depense: '', texte: '', observation: '', montant: 0 }];
    }
  }

  // ── Ajoute une nouvelle ligne de dépense pour l'agent courant ──
  ajouterLigne(): void {
    this.lignes.push({ depense: '', texte: '', observation: '', montant: 0 });
    // Met automatiquement la nouvelle ligne en mode édition
    this.ligneEnEdition = this.lignes.length - 1;
  }

  // ── Bascule le highlight d'édition sur la ligne i ──
  modifierLigne(i: number): void {
    this.ligneEnEdition = this.ligneEnEdition === i ? -1 : i;
  }

  // ── Supprime la ligne i après confirmation ──
  supprimerLigne(i: number): void {
    const nom = this.lignes[i].depense || `ligne ${i + 1}`;
    if (!confirm(`Supprimer "${nom}" ?`)) return;
    this.lignes.splice(i, 1);
    if (this.ligneEnEdition === i) this.ligneEnEdition = -1;
  }

  getTotal(): number {
    return this.lignes.reduce((sum, l) => sum + (Number(l.montant) || 0), 0);
  }

  onEnregistrer(): void {
    // Sauvegarder les lignes sur l'agent courant pour les recharger à la prochaine ouverture
    if (this.agentEdite) {
      this.agentEdite.lignesIndividuelles = [...this.lignes];
    }
    this.enregistrer.emit([...this.lignes]);
    this.onFermer();
  }

  onFermer(): void {
    this.ligneEnEdition = -1;
    this.fermer.emit();
  }
}