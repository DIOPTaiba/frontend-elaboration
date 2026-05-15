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
import { SECTION_COURANTE } from 'src/app/dtos/global/section.dto';
import { SaisieMajProjetBudgetService } from 'src/app/services/pppb/fonctionnementInvestiss/saisie-maj-projet-budget.service';
import { ModalCollectifComponent } from './components/modal-collectif/modal-collectif.component';
import { GlobalService } from 'src/app/services/pppb/global/global.service';
import { ParametreRechercheDto } from 'src/app/dtos/global/parametreRecherche.dto';
import { ProgrammeDto } from 'src/app/dtos/global/programme.dto';
import { MajEmploisEffectifsService } from 'src/app/services/pppb/depensesPersonnelEmplois/majEmploisEffectifs.service';
import { ChapitreDto } from 'src/app/dtos/global/chapitre.dto';
import { DotationsTraitementsService } from 'src/app/services/pppb/depensesPersonnelEmplois/dotationsTraitements.service';
import { AgentDto } from 'src/app/dtos/global/agent.dto';
import { AgentService } from 'src/app/services/pppb/global/agent.service';
@Component({
  selector: 'app-traitement-agent',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatInputModule, MatSelectModule, MatIconModule, MatButtonModule,
    CommonModule,
    FormsModule,
    ModalCollectifComponent,

  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './traitement-agent.component.html',
  styleUrls: ['./traitement-agent.component.scss'],
})
export class TraitementAgentComponent implements OnInit {
  selectedProgramme: ProgrammeDto | null = null;
  exerciceCourant: string = '';
  projetBudgetLib: string = '';
  projetBudgetCode: string;
  parametreRecherche: ParametreRechercheDto = {};
  totalElements: number = 0;
  loading = false;
  listeProgrammes: any[] = [];
  listeChapitres: any[] = [];
  listeAgents: AgentDto[] = [];
  showFilter = true;

  // ── Paramètres de recherche ──
  exercice = '2027';
  budget = 'Projet LFI 2027';
  section = 'Ministère des finances et du Budget';
  programme = "Elaboration du budget et suivi de l'exécution des dépenses";
  action = 'Pilotage et coordination';
  activite = 'Gestion administrative du personnel';
  chapitre = 'Direction des Systèmes d’information';
  statut = 'agent';
  age = '0';

  @Input() agents: Agent[] = [];
  @Output() modifierAgentEvent = new EventEmitter<{ agent: Agent; index: number }>();
  @Output() ajouterAgentEvent = new EventEmitter<Agent>();

  // ── Options selects ──
  // gestionOptions = GESTION_OPTIONS;
  // budgetOptions = BUDGET_OPTIONS;
  // sectionOptions = SECTION_OPTIONS;
  // programmeOptions = PROGRAMME_OPTIONS;

  // ── Paragraphes & emplois ──
  paragraphes: Paragraphe[] = [];
  emplois: EmploiRef[] = [];
  agentsFiltres: Agent[] = [];
  tousLesParagraphes: Paragraphe[] = [];

  // ─────────────────────────────────────────────
  // Filtres
  // ─────────────────────────────────────────────
  // showFilter      = false;
  // filterEmploi    = '';
  // filterChapitre  = '';
  // filterMatricule = '';
  // filterAction    = '';
  // filterActivite  = '';
  // listeChapitres: any[] = [];
  // selectedProgramme: any = null;

  // filtreState: FiltreState = { emploi: '', chapitre: '', matricule: '', action: '', activite: '' };
  selectedChapitre: ChapitreDto;

  // get activeFilterCount(): number {
  //   return [this.filterEmploi, this.filterChapitre, this.filterMatricule,
  //           this.filterAction, this.filterActivite]
  //     .filter(v => v && v.trim() !== '').length;
  // }

  // ── État modales ──
  showModalCollectif = false;
  showModalIndividuel = false;
  isNewAgent = false;
  agentEdite: AgentDto | null = null;
  paragrapheSelectionne: Paragraphe | null = null;

  constructor(private traitementAgentService: TraitementAgentService,
    private globalService: GlobalService,
    private majEmploisEffectifsService: MajEmploisEffectifsService,
    private dotationsTraitementsService: DotationsTraitementsService,
    private agentService : AgentService
  ) { }

  showModalSelectionAgent = false;
  rechercheAgent          = '';

  // ─────────────────────────────────────────────
  // Modale INDIVIDUEL
  // ─────────────────────────────────────────────
  // showModalIndividuel      = false;
  lignesIndividuelles: LigneIndividuelle[] = [];
  ligneEnEditionIndividuel = -1;

  // ─────────────────────────────────────────────
  // Modale AJOUT PARAGRAPHE
  // ─────────────────────────────────────────────
  showModalAjoutParagraphe = false;


  // ═════════════════════════════════════════════
  // Initialisation
  // ═════════════════════════════════════════════
  ngOnInit(): void {

    this.globalService.getExerciceCourant().subscribe({
      next: (valeur) => {
        this.exerciceCourant = valeur;
        // this.parametreRecherche.exeCode = valeur - 1 + '_1';
        console.log('ExeCode ', this.parametreRecherche.exeCode);
        this.parametreRecherche.exeCode = '2025_1';
        this.parametreRecherche.exeCode1 = valeur + '_1';
        this.globalService.getProjetBudget(valeur).subscribe({
          next: (projet) => { this.projetBudgetLib = projet.expbLib; this.projetBudgetCode = projet.expbCode; },
          error: (err) => { console.error('Erreur projet budget:', err); }
        });
      },
      error: (err) => { console.error('Erreur exercice courant:', err); }
    });

    this.loadProgrammes();
    this.selectedProgramme = null;

    this.tousLesParagraphes = [...this.traitementAgentService.tousLesParagraphes]; 
    this.paragraphes        = [...this.traitementAgentService.paragraphes];
  //    const agentsSauvegardes = this.traitementAgentService.chargerAgents();
  //    if (agentsSauvegardes && agentsSauvegardes.length > 0) {
  //   this.agents = agentsSauvegardes;
  //   this.agents.forEach(a => { a.cumul = this.traitementAgentService.calculerCumul(a); });
  // } else if (!this.agents || this.agents.length === 0) {
  //   this.agents = this.traitementAgentService.getDemoAgents();
  // } else {
  //   this.agents.forEach(a => { a.cumul = this.traitementAgentService.calculerCumul(a); });
  // }

  // this.agentsFiltres = [...this.agents];
  // this.emplois       = this.traitementAgentService.buildEmploisRef(this.agents);

  }

  loadProgrammes() {
    this.loading = true;
    this.majEmploisEffectifsService.getProgrammes().subscribe({
      next: (data) => {
        this.listeProgrammes = data;
        console.log('PROGRAMMES:', this.listeProgrammes);
        // this.toastr.success('Blogs chargés avec succès');
        this.loading = false;
      },
      error: (error) => {
        // this.toastr.error('Erreur lors du chargement des blogs');
        this.loading = false;
      },
    });
  }

  onProgrammeChange(prog: ProgrammeDto) {
    this.selectedProgramme = prog;
    this.parametreRecherche.proId = prog.proId;
    this.getChapitres();
  }

  getChapitres() {
    if (!this.selectedProgramme) {
      console.warn('Aucun programme sélectionné');
      return;
    }
    this.majEmploisEffectifsService.getChapitres(this.parametreRecherche).subscribe({
      next: (data) => {
        this.listeChapitres = data;
        this.totalElements = data.length;
        console.log('CHAPITRE DATA:', this.totalElements, this.listeChapitres);
      },
      error: (err) => { console.error('Erreur chargement chapitre data:', err); }
    });
  }

  onChapitreChange(chapitre: ChapitreDto) {
    this.selectedChapitre = chapitre;
    this.parametreRecherche.chapId = chapitre.chapId;
    this.getAgents();
  }

  getAgents() {
    this.loading = true;
    this.agentService.getAgents(this.parametreRecherche).subscribe({
      next: (data) => {
        this.listeAgents = data;
        this.parametreRecherche.exeCode = this.exerciceCourant.toString() + '_1';
        console.log('AGENTS:', this.listeAgents);
        // this.toastr.success('Blogs chargés avec succès');
        this.loading = false;
      },
      error: (error) => {
        // this.toastr.error('Erreur lors du chargement des blogs');
        this.loading = false;
      },
    });
  }

    

  toggleFilter(event: Event): void {
    event.preventDefault();
    this.showFilter = !this.showFilter;
  }


  // ── Filtres ──────────────────────────────────────
  // onFiltreChange(state: FiltreState): void {
  //   this.filtreState = state;
  //   this.agentsFiltres = this.traitementAgentService.filtrer(this.agents, state);
  // }

  // onFiltreReset(): void {
  //   this.filtreState = { emploi: '', chapitre: '', matricule: '', action: '', activite: '' };
  //   this.agentsFiltres = [...this.agents];
  // }

  // clearField(field: string): void {
  //   if (field === 'emploi')    this.filterEmploi    = '';
  //   if (field === 'chapitre')  this.filterChapitre  = '';
  //   if (field === 'matricule') this.filterMatricule = '';
  //   if (field === 'action')    this.filterAction    = '';
  //   if (field === 'activite')  this.filterActivite  = '';
  //   this.appliquerFiltres();
  // }

  // ═════════════════════════════════════════════
  // Récapitulatif tableau principal
  // ═════════════════════════════════════════════
  getRecapitulatif(code: string): number {
    return this.traitementAgentService.getRecap(this.agentsFiltres, code);
  }

  getTotalCumul(): number {
    return this.traitementAgentService.getTotalCumul(this.agentsFiltres);
  }

  // ── Modale collectif ─────────────────────────────
  ouvrirModalAjout(): void {
    this.isNewAgent = true;
    this.agentEdite = null;
    this.showModalCollectif = true;
  }

  ouvrirModalModifier(para: Paragraphe): void {
    this.isNewAgent = false;
    this.paragrapheSelectionne = para;
    this.showModalCollectif = true;
  }

  fermerModalCollectif(): void {
    this.showModalCollectif = false;
  }

  onSauvegarderCollectif(lignes: Agent[]): void {
    if (this.isNewAgent) {
      // Ajout de nouveaux agents
      lignes.forEach(l => {
        this.agents.push({ ...l });
        this.ajouterAgentEvent.emit({ ...l });
      });
    } else {
      // Modification collective sur un paragraphe :
      // on met à jour les agents existants par matricule,
      // ou on les ajoute s'ils ne sont pas encore dans la liste
      lignes.forEach(ligne => {
        const idx = this.agents.findIndex(a => a.matricule === ligne.matricule);
        if (idx >= 0) {
          // Mettre à jour uniquement les valeurs du paragraphe concerné
          this.agents[idx] = { ...this.agents[idx], valeurs: { ...this.agents[idx].valeurs, ...ligne.valeurs } };
          this.agents[idx].cumul = this.traitementAgentService.calculerCumul(this.agents[idx]);
          this.modifierAgentEvent.emit({ agent: { ...this.agents[idx] }, index: idx });
        } else {
          // Agent sélectionné non présent → on l'ajoute
          this.agents.push({ ...ligne });
          this.ajouterAgentEvent.emit({ ...ligne });
        }
      });
    }

    this.emplois = this.traitementAgentService.buildEmploisRef(this.agents);
    // this.agentsFiltres = this.traitementAgentService.filtrer(this.agents, this.filtreState);

    // Persistance localStorage
    this.traitementAgentService.sauvegarderAgents(this.agents);

    this.fermerModalCollectif();
  }
  // ── Modale individuel ─────────────────────────────
  ouvrirModalIndividuel(agent: AgentDto, para: Paragraphe | null): void {
    this.agentEdite = agent;
    this.paragrapheSelectionne = para;
    this.showModalIndividuel = true;
  }
  fermerModalIndividuel(): void {
    this.showModalIndividuel = false;
  }

  ajouterLigneIndividuelle(): void {
    this.lignesIndividuelles.push({ depense: '', texte: '', observation: '', montant: 0 });
    this.ligneEnEditionIndividuel = this.lignesIndividuelles.length - 1;
  }
 
  // Ouvre la modale dédiée aux paragraphes (plus ouvrirModalAjout qui gérait les agents)
  ouvrirModalAjoutParagraphe(): void {
    this.showModalAjoutParagraphe = true;
  }

  fermerModalAjoutParagraphe(): void {
    this.showModalAjoutParagraphe = false;
  }

  onSauvegarderNouveauParagraphe(nouveau: Paragraphe): void {
    this.paragraphes = this.traitementAgentService.ajouterParagraphe(this.paragraphes, nouveau);
    // Initialiser la valeur du nouveau para à null pour chaque agent existant
    this.agents.forEach(agent => {
      if (agent.valeurs[nouveau.code] === undefined) {
        agent.valeurs[nouveau.code] = null;
      }
    });
    // this.agentsFiltres = this.traitementAgentService.filtrer(this.agents, this.filtreState);
    this.fermerModalAjoutParagraphe();
  }
  // ── Nouvelle ligne inline ─────────────────────────
  nouvelleLigne: Agent | null = null;

  ajouterLigneParagraphe(): void {
    if (this.nouvelleLigne) return; // déjà en cours
    const valeurs: Record<string, number | null> = {};
    this.paragraphes.forEach(p => valeurs[p.code] = null);
    this.nouvelleLigne = { emploi: '', matricule: '', nom: '', valeurs, cumul: null };
  }

  calculerCumulNouvelleLigne(): number {
    if (!this.nouvelleLigne) return 0;
    return this.paragraphes.reduce(
      (sum, p) => sum + (this.nouvelleLigne!.valeurs[p.code] ?? 0), 0
    );
  }

  confirmerNouvelleLigne(): void {
    if (!this.nouvelleLigne) return;
    this.nouvelleLigne.cumul = this.calculerCumulNouvelleLigne();
    this.agents.push({ ...this.nouvelleLigne });
    this.emplois = this.traitementAgentService.buildEmploisRef(this.agents);
    // this.agentsFiltres = this.traitementAgentService.filtrer(this.agents, this.filtreState);
    this.nouvelleLigne = null;
  }

  annulerNouvelleLigne(): void {
    this.nouvelleLigne = null;
  }
}