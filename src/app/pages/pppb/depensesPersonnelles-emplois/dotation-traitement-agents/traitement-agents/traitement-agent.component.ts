import { GlobalService } from 'src/app/services/pppb/global/global.service';
import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  Agent, EmploiRef, FiltreState, Paragraphe,
  LigneIndividuelle,
} from './models/traitement-agent.models';
import { TraitementAgentService } from './services/traitement-agent.service';
import { ProgrammeDto } from 'src/app/dtos/global/programme.dto';
import { SECTION_COURANTE } from 'src/app/dtos/global/section.dto';
import { SaisieMajProjetBudgetService } from 'src/app/services/pppb/fonctionnementInvestiss/saisie-maj-projet-budget.service';

@Component({
  selector: 'app-traitement-agent',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatInputModule, MatSelectModule, MatIconModule, MatButtonModule,
  
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './traitement-agent.component.html',
  styleUrls: ['./traitement-agent.component.scss'],
})
export class TraitementAgentComponent implements OnInit {

  // ─────────────────────────────────────────────
  // Paramètres contextuels (lecture seule / select)
  // ─────────────────────────────────────────────
  exerciceCourant  = '';
  projetBudgetLib  = '';
  projetBudgetCode = '';
  sectionLabel     = `${SECTION_COURANTE.sec_code} - ${SECTION_COURANTE.sec_libelle}`;
  listeProgrammes: ProgrammeDto[] = [];

  exercice  = '2027';
  budget    = 'Projet LFI 2027';
  section   = 'Ministère des finances et du Budget';
  programme = '';
  action    = 'Pilotage et coordination';
  activite  = 'Gestion administrative du personnel';
  chapitre  = 'Direction des Systèmes d\'information';
  statut    = 'agent';
  age       = '0';

  @Input() agents: Agent[] = [];
  @Output() modifierAgentEvent = new EventEmitter<{ agent: Agent; index: number }>();
  @Output() ajouterAgentEvent  = new EventEmitter<Agent>();

  // ─────────────────────────────────────────────
  // Paragraphes & emplois
  // ─────────────────────────────────────────────
  paragraphes: Paragraphe[]      = [];
  emplois: EmploiRef[]           = [];
  agentsFiltres: Agent[]         = [];
  tousLesParagraphes: Paragraphe[] = [];

  // ─────────────────────────────────────────────
  // Filtres
  // ─────────────────────────────────────────────
  showFilter      = false;
  filterEmploi    = '';
  filterChapitre  = '';
  filterMatricule = '';
  filterAction    = '';
  filterActivite  = '';
  listeChapitres: any[] = [];
  selectedProgramme: any = null;

  filtreState: FiltreState = { emploi: '', chapitre: '', matricule: '', action: '', activite: '' };

  get activeFilterCount(): number {
    return [this.filterEmploi, this.filterChapitre, this.filterMatricule,
            this.filterAction, this.filterActivite]
      .filter(v => v && v.trim() !== '').length;
  }

  // ─────────────────────────────────────────────
  // Modale COLLECTIF
  // ─────────────────────────────────────────────
  showModalCollectif      = false;
  isNewAgent              = false;
  agentEdite: Agent | null = null;
  paragrapheSelectionne: Paragraphe | null = null;

  modalLignes: Agent[] = [];
  colonnesDepenses: { code: string; label: string }[] = [];
  ligneEnEditionCollectif = -1;

  showModalSelectionAgent = false;
  rechercheAgent          = '';

  // ─────────────────────────────────────────────
  // Modale INDIVIDUEL
  // ─────────────────────────────────────────────
  showModalIndividuel      = false;
  lignesIndividuelles: LigneIndividuelle[] = [];
  ligneEnEditionIndividuel = -1;

  // ─────────────────────────────────────────────
  // Modale AJOUT PARAGRAPHE
  // ─────────────────────────────────────────────
  showModalAjoutParagraphe = false;

  constructor(
    private traitementAgentService: TraitementAgentService,
    private globalService: GlobalService,
    private saisieMajService: SaisieMajProjetBudgetService,
  ) {}

  // ═════════════════════════════════════════════
  // Initialisation
  // ═════════════════════════════════════════════
  ngOnInit(): void {
    this.globalService.getExerciceCourant().subscribe({
      next: (exercice) => {
        this.exerciceCourant = exercice;
        this.globalService.getProjetBudget(exercice).subscribe({
          next: (projet) => { this.projetBudgetLib = projet.expbLib; this.projetBudgetCode = projet.expbCode; },
          error: (err)   => console.error('Erreur projet budget:', err),
        });
        this.globalService.getProgrammes(exercice).subscribe({
          next: (progs)  => { this.listeProgrammes = progs; },
          error: (err)   => console.error('Erreur programmes:', err),
        });
      },
      error: (err) => console.error('Erreur exercice courant:', err),
    });

    this.saisieMajService.getChapitresFonctionnement('MIN0001', 'TRE', 149).subscribe({
      next:  (data) => { this.listeChapitres = data; },
      error: (err)  => console.error('Erreur chapitres:', err),
    });

    this.tousLesParagraphes = [...this.traitementAgentService.tousLesParagraphes];
    this.paragraphes        = [...this.traitementAgentService.paragraphes];

    const agentsSauvegardes = this.traitementAgentService.chargerAgents();
    if (agentsSauvegardes?.length) {
      this.agents = agentsSauvegardes;
      this.agents.forEach(a => { a.cumul = this.traitementAgentService.calculerCumul(a); });
    } else if (!this.agents?.length) {
      this.agents = this.traitementAgentService.getDemoAgents();
    } else {
      this.agents.forEach(a => { a.cumul = this.traitementAgentService.calculerCumul(a); });
    }

    this.agentsFiltres = [...this.agents];
    this.emplois       = this.traitementAgentService.buildEmploisRef(this.agents);
  }

  // ═════════════════════════════════════════════
  // Paramètres — selects
  // ═════════════════════════════════════════════
  onProgrammeChange(proCode: string): void {
    this.listeChapitres = [];
    this.saisieMajService.getChapitresFonctionnement('MIN0001', 'TRE', 149).subscribe({
      next:  (data) => { this.listeChapitres = data; },
      error: (err)  => console.error('Erreur chapitres fonctionnement:', err),
    });
  }

  // ═════════════════════════════════════════════
  // Filtres
  // ═════════════════════════════════════════════
  toggleFilter(event: Event): void {
    event.preventDefault();
    this.showFilter = !this.showFilter;
  }

  private appliquerFiltres(): void {
    this.filtreState = {
      emploi:    this.filterEmploi,
      chapitre:  this.filterChapitre,
      matricule: this.filterMatricule,
      action:    this.filterAction,
      activite:  this.filterActivite,
    };
    this.agentsFiltres = this.traitementAgentService.filtrer(this.agents, this.filtreState);
  }

  onFilterChange(): void  { this.appliquerFiltres(); }
  applyFilter(): void     { this.appliquerFiltres(); }

  onChapitreChange(chapitre: string): void {
    this.filterChapitre = chapitre;
    this.appliquerFiltres();
  }

  resetFilter(): void {
    this.filterEmploi = this.filterChapitre = this.filterMatricule =
    this.filterAction = this.filterActivite = '';
    this.filtreState  = { emploi: '', chapitre: '', matricule: '', action: '', activite: '' };
    this.agentsFiltres = [...this.agents];
  }

  clearField(field: string): void {
    if (field === 'emploi')    this.filterEmploi    = '';
    if (field === 'chapitre')  this.filterChapitre  = '';
    if (field === 'matricule') this.filterMatricule = '';
    if (field === 'action')    this.filterAction    = '';
    if (field === 'activite')  this.filterActivite  = '';
    this.appliquerFiltres();
  }

  // ═════════════════════════════════════════════
  // Récapitulatif tableau principal
  // ═════════════════════════════════════════════
  getRecapitulatif(code: string): number {
    return this.traitementAgentService.getRecap(this.agentsFiltres, code);
  }

  getTotalCumul(): number {
    return this.traitementAgentService.getTotalCumul(this.agentsFiltres);
  }

  // ═════════════════════════════════════════════
  // Modale COLLECTIF
  // ═════════════════════════════════════════════
  ouvrirModalModifier(para: Paragraphe): void {
    this.paragrapheSelectionne  = para;
    this.isNewAgent             = false;
    this.agentEdite             = null;
    this.ligneEnEditionCollectif = -1;
    this.modalLignes            = [];
    this.colonnesDepenses       = para
      ? [{ code: `${para.code}_1`, label: para.label }]
      : [];
    this.showModalCollectif = true;
  }

  ouvrirModalAjoutParagraphe(): void {
    this.showModalAjoutParagraphe = true;
  }

  fermerModalCollectif(): void {
    this.showModalCollectif = false;
  }

  // ── Colonnes de dépenses ──
  ajouterColonneDepense(): void {
    if (!this.paragrapheSelectionne) return;
    const num    = this.colonnesDepenses.length + 1;
    const code   = `${this.paragrapheSelectionne.code}_${num}`;
    this.colonnesDepenses.push({ code, label: `Ligne ${num}` });
    this.modalLignes.forEach(l => { l.valeurs[code] = null; });
  }

  recalculerCumulLigneCollectif(i: number): void {
    this.modalLignes[i].cumul = this.colonnesDepenses.reduce(
      (s, col) => s + (this.modalLignes[i].valeurs[col.code] ?? 0), 0
    );
  }

  getModalRecap(code: string): number {
    return this.modalLignes.reduce((s, l) => s + (l.valeurs[code] ?? 0), 0);
  }

  getModalTotalCumul(): number {
    return this.modalLignes.reduce((s, l) => s + (l.cumul ?? 0), 0);
  }

  modifierLigneCollectif(i: number): void {
    this.ligneEnEditionCollectif = this.ligneEnEditionCollectif === i ? -1 : i;
  }

  supprimerLigneCollectif(i: number): void {
    if (!confirm(`Supprimer la ligne de ${this.modalLignes[i].nom || 'cet agent'} ?`)) return;
    this.modalLignes.splice(i, 1);
    if (this.ligneEnEditionCollectif === i) this.ligneEnEditionCollectif = -1;
  }

  onSauvegarderCollectif(): void {
    const lignesValides = this.modalLignes.filter(l => l.emploi || l.matricule || l.nom);
    if (!lignesValides.length) { this.fermerModalCollectif(); return; }

    lignesValides.forEach(ligne => {
      ligne.cumul = this.colonnesDepenses.reduce(
        (s, col) => s + (ligne.valeurs[col.code] ?? 0), 0
      );
      const idx = this.agents.findIndex(a => a.matricule === ligne.matricule);
      if (idx >= 0) {
        this.agents[idx] = {
          ...this.agents[idx],
          valeurs: { ...this.agents[idx].valeurs, ...ligne.valeurs },
        };
        this.agents[idx].cumul = this.traitementAgentService.calculerCumul(this.agents[idx]);
        this.modifierAgentEvent.emit({ agent: { ...this.agents[idx] }, index: idx });
      } else {
        this.agents.push({ ...ligne });
        this.ajouterAgentEvent.emit({ ...ligne });
      }
    });

    this.emplois       = this.traitementAgentService.buildEmploisRef(this.agents);
    this.agentsFiltres = this.traitementAgentService.filtrer(this.agents, this.filtreState);
    this.traitementAgentService.sauvegarderAgents(this.agents);
    this.fermerModalCollectif();
  }

  // ── Sélection agent dans modale ──
  get agentsFiltresSelection(): Agent[] {
    const presents = new Set(this.modalLignes.map(l => l.matricule));
    let liste = this.agents.filter(ag => !presents.has(ag.matricule));
    const q   = this.rechercheAgent.toLowerCase().trim();
    if (!q) return liste;
    return liste.filter(a =>
      a.nom.toLowerCase().includes(q) ||
      a.matricule.toLowerCase().includes(q) ||
      a.emploi.toLowerCase().includes(q)
    );
  }

  ouvrirSelectionAgent(): void {
    this.rechercheAgent = '';
    this.showModalSelectionAgent = true;
  }

  fermerSelectionAgent(): void {
    this.showModalSelectionAgent = false;
  }

  estDejaAjoute(agent: Agent): boolean {
    return this.modalLignes.some(l => l.matricule === agent.matricule);
  }

  selectionnerAgent(agent: Agent): void {
    if (this.estDejaAjoute(agent)) return;
    const valeurs: { [code: string]: number | null } = {};
    this.colonnesDepenses.forEach(col => { valeurs[col.code] = agent.valeurs[col.code] ?? null; });
    this.modalLignes.push({ ...agent, valeurs, cumul: 0 });
    this.showModalSelectionAgent = false;
  }

  // ═════════════════════════════════════════════
  // Modale INDIVIDUEL
  // ═════════════════════════════════════════════
  ouvrirModalIndividuel(agent: Agent, para: Paragraphe | null): void {
    this.agentEdite              = agent;
    this.paragrapheSelectionne   = para;
    this.ligneEnEditionIndividuel = -1;
    this.lignesIndividuelles     = agent.lignesIndividuelles?.length
      ? agent.lignesIndividuelles.map((l: LigneIndividuelle) => ({ ...l }))
      : [{ depense: '', texte: '', observation: '', montant: 0 }];
    this.showModalIndividuel = true;
  }

  fermerModalIndividuel(): void {
    this.showModalIndividuel = false;
  }

  ajouterLigneIndividuelle(): void {
    this.lignesIndividuelles.push({ depense: '', texte: '', observation: '', montant: 0 });
    this.ligneEnEditionIndividuel = this.lignesIndividuelles.length - 1;
  }

  modifierLigneIndividuelle(i: number): void {
    this.ligneEnEditionIndividuel = this.ligneEnEditionIndividuel === i ? -1 : i;
  }

  supprimerLigneIndividuelle(i: number): void {
    const nom = this.lignesIndividuelles[i].depense || `ligne ${i + 1}`;
    if (!confirm(`Supprimer "${nom}" ?`)) return;
    this.lignesIndividuelles.splice(i, 1);
    if (this.ligneEnEditionIndividuel === i) this.ligneEnEditionIndividuel = -1;
  }

  getTotalIndividuel(): number {
    return this.lignesIndividuelles.reduce((s, l) => s + (Number(l.montant) || 0), 0);
  }

  onEnregistrerIndividuel(): void {
    if (this.agentEdite) {
      this.agentEdite.lignesIndividuelles = [...this.lignesIndividuelles];
    }
    this.fermerModalIndividuel();
  }

  // ═════════════════════════════════════════════
  // Modale AJOUT PARAGRAPHE
  // ═════════════════════════════════════════════
  fermerModalAjoutParagraphe(): void {
    this.showModalAjoutParagraphe = false;
  }

  onSauvegarderNouveauParagraphe(nouveau: Paragraphe): void {
    this.paragraphes = this.traitementAgentService.ajouterParagraphe(this.paragraphes, nouveau);
    this.agents.forEach(agent => {
      if (agent.valeurs[nouveau.code] === undefined) agent.valeurs[nouveau.code] = null;
    });
    this.agentsFiltres = this.traitementAgentService.filtrer(this.agents, this.filtreState);
    this.fermerModalAjoutParagraphe();
  }
}