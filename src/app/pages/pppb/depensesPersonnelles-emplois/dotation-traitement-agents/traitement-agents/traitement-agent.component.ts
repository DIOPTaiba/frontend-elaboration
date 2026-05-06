import { Component, Input, Output, EventEmitter, OnInit,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Agent, EmploiRef, FiltreState, Paragraphe,
  GESTION_OPTIONS, BUDGET_OPTIONS, SECTION_OPTIONS, PROGRAMME_OPTIONS,
} from './models/traitement-agent.models';
import { TraitementAgentService } from './services/traitement-agent.service';
import { FiltreComponent } from './components/filtre/filtre.component';
import { ModalCollectifComponent } from './components/modal-collectif/modal-collectif.component';
import { ModalIndividuelComponent } from './components/modal-individuel/modal-individuel.component';

@Component({
  selector: 'app-traitement-agent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FiltreComponent,
    ModalCollectifComponent,
    ModalIndividuelComponent,  
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './traitement-agent.component.html',
  styleUrls: ['./traitement-agent.component.scss'],
})
export class TraitementAgentComponent implements OnInit {

  // ── Paramètres de recherche ──
  gestion   = '2027';
  budget    = 'Projet LFI 2027';
  section   = 'Ministère des finances et du Budget';
  programme = "Elaboration du budget et suivi de l'exécution des dépenses";
  action    = 'Pilotage et coordination';
  activite  = 'Gestion administrative du personnel';
  chapitre  = '660';
  statut    = 'En cours';
  age       = 'Tout âge';

  @Input() agents: Agent[] = [];
  @Output() modifierAgentEvent = new EventEmitter<{ agent: Agent; index: number }>();
  @Output() ajouterAgentEvent  = new EventEmitter<Agent>();

  // ── Options selects ──
  gestionOptions  = GESTION_OPTIONS;
  budgetOptions   = BUDGET_OPTIONS;
  sectionOptions  = SECTION_OPTIONS;
  programmeOptions = PROGRAMME_OPTIONS;

  // ── Paragraphes & emplois ──
  paragraphes: Paragraphe[] = [];
  emplois: EmploiRef[] = [];
  agentsFiltres: Agent[] = [];

  // ── État filtres ──
  filtreState: FiltreState = { emploi: '', chapitre: '', matricule: '', action: '', activite: '' };

  get activeFilterCount(): number {
    return Object.values(this.filtreState).filter(v => v && v.trim() !== '').length;
  }

  // ── État modales ──
  showModalCollectif   = false;
  showModalIndividuel  = false;
  isNewAgent           = false;
  agentEdite: Agent | null = null;
  paragrapheSelectionne: Paragraphe | null = null;

  constructor(private svc: TraitementAgentService) {}

  ngOnInit(): void {
    this.paragraphes = this.svc.paragraphes;
    if (!this.agents || this.agents.length === 0) {
      this.agents = this.svc.getDemoAgents();
    } else {
      this.agents.forEach(a => { a.cumul = this.svc.calculerCumul(a); });
    }
    this.agentsFiltres = [...this.agents];
    this.emplois = this.svc.buildEmploisRef(this.agents);
  }

  // ── Filtres ──────────────────────────────────────
  onFiltreChange(state: FiltreState): void {
    this.filtreState   = state;
    this.agentsFiltres = this.svc.filtrer(this.agents, state);
  }

  onFiltreReset(): void {
    this.filtreState   = { emploi: '', chapitre: '', matricule: '', action: '', activite: '' };
    this.agentsFiltres = [...this.agents];
  }

  // ── Récapitulatif ─────────────────────────────────
  getRecapitulatif(code: string): number {
    return this.svc.getRecap(this.agentsFiltres, code);
  }

  getTotalCumul(): number {
    return this.svc.getTotalCumul(this.agentsFiltres);
  }

  // ── Modale collectif ─────────────────────────────
  ouvrirModalAjout(): void {
    this.isNewAgent  = true;
    this.agentEdite  = null;
    this.showModalCollectif = true;
  }

  ouvrirModalModifier(agent: Agent): void {
    this.isNewAgent  = false;
    this.agentEdite  = agent;
    this.showModalCollectif = true;
  }

  fermerModalCollectif(): void {
    this.showModalCollectif = false;
  }

  onSauvegarderCollectif(lignes: Agent[]): void {
    if (this.isNewAgent) {
      lignes.forEach(l => {
        this.agents.push({ ...l });
        this.ajouterAgentEvent.emit({ ...l });
      });
    } else {
      const idx = this.agentEdite ? this.agents.indexOf(this.agentEdite) : -1;
      if (idx >= 0) {
        this.agents[idx] = { ...lignes[0] };
        this.modifierAgentEvent.emit({ agent: { ...lignes[0] }, index: idx });
        for (let i = 1; i < lignes.length; i++) {
          this.agents.push({ ...lignes[i] });
        }
      }
    }
    this.emplois       = this.svc.buildEmploisRef(this.agents);
    this.agentsFiltres = this.svc.filtrer(this.agents, this.filtreState);
    this.fermerModalCollectif();
  }

  // ── Modale individuel ─────────────────────────────
  ouvrirModalIndividuel(para: Paragraphe): void {
    this.paragrapheSelectionne = para;
    this.showModalIndividuel   = true;
  }

  fermerModalIndividuel(): void {
    this.showModalIndividuel = false;
  }

  onEnregistrerIndividuel(lignes: any[]): void {
    console.log('Lignes individuelles enregistrées :', lignes);
  }
}