import { Component, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Agent, EmploiRef, FiltreState, Paragraphe } from '../../models/traitement-agent.models';
import { TraitementAgentService } from '../../services/traitement-agent.service';

@Component({
  selector: 'app-modal-collectif',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-collectif.component.html',
  styleUrls: ['./modal-collectif.component.scss'],
  encapsulation: ViewEncapsulation.None,   // ← styles globaux, pas d'encapsulation
})
export class ModalCollectifComponent implements OnChanges {

  @Input() visible       = false;
  @Input() isNewAgent    = false;
  @Input() agentEdite: Agent | null = null;
  @Input() paragraphes: Paragraphe[] = [];
  @Input() emplois: EmploiRef[] = [];
  @Input() filtreState!: FiltreState;
  @Input() activeFilterCount = 0;

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
  @Output() sauvegarder = new EventEmitter<Agent[]>();

  modalLignes: Agent[] = [];

  constructor(private svc: TraitementAgentService) {}

  ngOnChanges(): void {
    if (this.visible) {
      this.modalLignes = this.agentEdite
        ? [{ ...this.agentEdite, valeurs: { ...this.agentEdite.valeurs } }]
        : [];
    }
  }

  ajouterLigne(): void {
    this.modalLignes.push(this.svc.emptyAgent());
  }

  recalculerCumulLigne(i: number): void {
    this.modalLignes[i].cumul = this.svc.calculerCumulLigne(this.modalLignes[i]);
  }

  getModalRecap(code: string): number {
    return this.svc.getModalRecap(this.modalLignes, code);
  }

  getModalTotalCumul(): number {
    return this.svc.getModalTotalCumul(this.modalLignes);
  }

  onSauvegarder(): void {
    const lignesValides = this.modalLignes.filter(l => l.emploi || l.matricule || l.nom);
    if (lignesValides.length === 0) { this.fermer.emit(); return; }
    lignesValides.forEach(l => { l.cumul = this.svc.calculerCumulLigne(l); });
    this.sauvegarder.emit(lignesValides);
  }

  onFermer(): void {
    this.fermer.emit();
  }
}