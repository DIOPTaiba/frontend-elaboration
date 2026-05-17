import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  Agent, EmploiRef, Paragraphe, LigneIndividuelle,
  FiltreState,
} from './models/traitement-agent.models';
import { TraitementAgentService } from './services/traitement-agent.service';
import { GlobalService } from 'src/app/services/pppb/global/global.service';
import { ParametreRechercheDto } from 'src/app/dtos/global/parametreRecherche.dto';
import { ProgrammeDto } from 'src/app/dtos/global/programme.dto';
import { ActiviteDto } from 'src/app/dtos/global/activite.dto';
import { MajEmploisEffectifsService } from 'src/app/services/pppb/depensesPersonnelEmplois/majEmploisEffectifs.service';
import { ChapitreDto } from 'src/app/dtos/global/chapitre.dto';
import { DotationsTraitementsService } from 'src/app/services/pppb/depensesPersonnelEmplois/dotationsTraitements.service';
import { AgentDto } from 'src/app/dtos/global/agent.dto';
import { AgentService } from 'src/app/services/pppb/global/agent.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-traitement-agent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgSelectModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './traitement-agent.component.html',
  styleUrls: ['./traitement-agent.component.scss'],
})
export class TraitementAgentComponent implements OnInit {

  // ── Paramètres de recherche ──
  selectedProgramme: ProgrammeDto | null = null;
  selectedChapitre: ChapitreDto | null   = null;
  exerciceCourant: string  = '';
  projetBudgetLib: string  = '';
  projetBudgetCode: string = '';
  parametreRecherche: ParametreRechercheDto = {};
  totalElements = 0;
  loading       = false;
  listeProgrammes: any[]   = [];
  listeChapitresFiltres: ChapitreDto[] = [];
  listeAgents: AgentDto[]  = [];
  showFilter = true;


  // ── Infos footer ──
  exercice  = '2027';
  budget    = 'Projet LFI 2027';
  section   = 'Ministère des finances et du Budget';
  programme = "Elaboration du budget et suivi de l'exécution des dépenses";
  action    = 'Pilotage et coordination';
  activite  = 'Gestion administrative du personnel';
  chapitre  = 'Direction des Systèmes d\'information';
  statut    = 'agent';
  age       = '0';

  @Input() agents: Agent[] = [];
  @Output() modifierAgentEvent = new EventEmitter<{ agent: Agent; index: number }>();
  @Output() ajouterAgentEvent  = new EventEmitter<Agent>();

  // ── Paragraphes & emplois ──
  paragraphes: Paragraphe[]        = [];
  emplois: EmploiRef[]             = [];
  agentsFiltres: Agent[]           = [];
  tousLesParagraphes: Paragraphe[] = [];

  // ── Filtres ──
  filterEmploi    = '';
  filterChapitre: ChapitreDto | null = null;
  filterMatricule = '';
  filterAction    = '';

  // ── Activité au-dessus du tableau ──
  selectedActivite: string = '';

  // ── Listes filtres ──
  listeActions:   any[] = [];
  listeActivites: any[] = [];

  // ── searchFn ──
  searchActivite = (term: string, item: any): boolean => {
    const t = term.toLowerCase();
    return item.codeActivite?.toLowerCase().includes(t)
        || item.libActivite?.toLowerCase().includes(t);
  };

  searchAction = (term: string, item: any): boolean => {
    const t = term.toLowerCase();
    return item.codeAction?.toLowerCase().includes(t)
        || item.libAction?.toLowerCase().includes(t);
  };

  // ── État modales ──
  showModalCollectif       = false;
  showModalIndividuel      = false;
  showModalAjoutParagraphe = false;
  isNewAgent               = false;
  agentEdite: AgentDto | null           = null;
  paragrapheSelectionne: Paragraphe | null = null;
  ligneBudgetPage = 0;
  ligneBudgetPageSize = 5;
  rechercheAgent = '';

  lignesIndividuelles: LigneIndividuelle[] = [];
  ligneEnEditionIndividuel = -1;
  nouvelleLigne: Agent | null = null;
  
// ── Modal collectif  ──
modalLignes: AgentDto[]                              = [];
colonnesDepenses: { code: string; label: string }[] = [];
ligneEnEditionModal                                  = -1;
showModalSelectionAgent                              = false;
filtreState: FiltreState = {
  emploi:    '',
  chapitre:  '',
  matricule: '',
  action:    '',
  activite:  '',
};
ouvrirModalModifier(para: Paragraphe): void {
  this.isNewAgent            = false;
  this.paragrapheSelectionne = para;
  this.agentEdite            = null;
  this.modalLignes           = [];
  this.colonnesDepenses      = para
    ? [{ code: `${para.code}_1`, label: para.label }]
    : [];
  this.ligneEnEditionModal   = -1;
  this.showModalCollectif    = true;
}

ajouterLigneModal(): void {
  if (!this.paragrapheSelectionne) return;
  const numLigne = this.colonnesDepenses.length + 1;
  this.colonnesDepenses.push({
    code:  `${this.paragrapheSelectionne.code}_${numLigne}`,
    label: `Ligne ${numLigne}`,
  });
}

modifierLigneModal(i: number): void {
  this.ligneEnEditionModal = this.ligneEnEditionModal === i ? -1 : i;
}

supprimerLigneModal(i: number): void {
  if (!confirm(`Supprimer cette ligne ?`)) return;
  this.modalLignes.splice(i, 1);
  if (this.ligneEnEditionModal === i) this.ligneEnEditionModal = -1;
}

ouvrirSelectionAgent(): void {
  this.rechercheAgent = '';
  this.showModalSelectionAgent = true;
}

fermerSelectionAgent(): void {
  this.showModalSelectionAgent = false;
}

get agentsFiltresSelection(): Agent[] {
  const q = this.rechercheAgent.toLowerCase().trim();
  const matriculesPresents = new Set(this.modalLignes.map(l => l.matricule));
  return this.agents.filter(ag =>
    !matriculesPresents.has(ag.matricule) &&
    (!q || ag.nom.toLowerCase().includes(q) ||
           ag.matricule.toLowerCase().includes(q) ||
           ag.emploi.toLowerCase().includes(q))
  );
}

selectionnerAgentModal(agent: Agent): void {
  this.modalLignes.push({
    emploi:    agent.emploi,
    matricule: agent.matricule,
    nom:       agent.nom,
  } as AgentDto);
  this.showModalSelectionAgent = false;
}
sauvegarderModal(): void {
  const lignesValides = this.modalLignes.filter(
    l => l.emploi || l.matricule || l.nom
  );
  if (lignesValides.length === 0) return;
  this.showModalCollectif = false;
}
get activeFilterCount(): number {
  return [
    this.filtreState.emploi,
    this.filtreState.chapitre,
    this.filtreState.matricule,
    this.filtreState.action,
    this.filtreState.activite,
  ].filter(v => !!v).length;
}
  constructor(
    private traitementAgentService: TraitementAgentService,
    private globalService: GlobalService,
    private majEmploisEffectifsService: MajEmploisEffectifsService,
    private dotationsTraitementsService: DotationsTraitementsService,
    private agentService: AgentService,
  ) {}

  // ═══════════════════════════════════════════════
  // Initialisation
  // ═══════════════════════════════════════════════
  ngOnInit(): void {
    this.globalService.getExerciceCourant().subscribe({
      next: (valeur) => {
        this.exerciceCourant = valeur;
        this.parametreRecherche.exeCode  = '2025_1';
        this.parametreRecherche.exeCode1 = valeur + '_1';
        this.globalService.getProjetBudget(valeur).subscribe({
          next: (projet) => {
            this.projetBudgetLib  = projet.expbLib;
            this.projetBudgetCode = projet.expbCode;
          },
          error: (err) => console.error('Erreur projet budget:', err),
        });
      },
      error: (err) => console.error('Erreur exercice courant:', err),
    });

    this.loadProgrammes();
    this.selectedProgramme  = null;
    this.tousLesParagraphes = [...this.traitementAgentService.tousLesParagraphes];
    this.paragraphes        = [...this.traitementAgentService.paragraphes];
  }

  // ── Chargement ──
  loadProgrammes(): void {
    this.loading = true;
    this.majEmploisEffectifsService.getProgrammes().subscribe({
      next:  (data) => { this.listeProgrammes = data; this.loading = false; },
      error: ()     => { this.loading = false; },
    });
  }

onProgrammeChange(prog: ProgrammeDto | null): void {
  if (!prog) return;
  this.selectedProgramme = prog;
  this.selectedChapitre  = null;
  this.filterChapitre    = null;
   this.listeChapitresFiltres = [];
  this.listeAgents       = [];
  this.parametreRecherche.proId = prog.proId;
  this.getChapitres();
}

getChapitres(): void {
  if (!this.selectedProgramme) return;
  this.majEmploisEffectifsService.getChapitres(this.parametreRecherche).subscribe({
    next: (data) => { 
      this.listeChapitresFiltres = data;
      this.totalElements = data.length; 
    },
    error: (err) => console.error('Erreur chargement chapitres:', err),
  });
}

  onChapitreChange(chapitre: ChapitreDto | null): void {
    if (!chapitre) { this.listeAgents = []; return; }
    this.selectedChapitre = chapitre;
    this.parametreRecherche.chapId = chapitre.chapId;
    this.getAgents();
  }
  onActiviteChange(activite: ActiviteDto | null): void {
  this.ligneBudgetPage = 0;
  if (!activite) {
    // réinitialiser le filtre activité
    this.selectedActivite = '';
  } else {
    this.selectedActivite = activite.codeActivite;
  }
}

  getAgents(): void {
    this.loading = true;
    this.parametreRecherche.exeCode = this.exerciceCourant.toString() + '_1';
    this.agentService.getAgents(this.parametreRecherche).subscribe({
      next:  (data) => { this.listeAgents = data; this.loading = false; },
      error: ()     => { this.loading = false; },
    });
  }

  toggleFilter(event: Event): void {
    event.preventDefault();
    this.showFilter = !this.showFilter;
  }

  // ── Récapitulatif ──
  getRecapitulatif(code: string): number {
    return this.traitementAgentService.getRecap(this.agentsFiltres, code);
  }

  getTotalCumul(): number {
    return this.traitementAgentService.getTotalCumul(this.agentsFiltres);
  }

  // ── Modales collectif ──
  ouvrirModalAjout(): void {
    this.isNewAgent = true;
    this.agentEdite = null;
    this.showModalCollectif = true;
  }

    fermerModalCollectif(): void { this.showModalCollectif = false; }

  onSauvegarderCollectif(lignes: Agent[]): void {
    if (this.isNewAgent) {
      lignes.forEach(l => { this.agents.push({ ...l }); this.ajouterAgentEvent.emit({ ...l }); });
    } else {
      lignes.forEach(ligne => {
        const idx = this.agents.findIndex(a => a.matricule === ligne.matricule);
        if (idx >= 0) {
          this.agents[idx] = { ...this.agents[idx], valeurs: { ...this.agents[idx].valeurs, ...ligne.valeurs } };
          this.agents[idx].cumul = this.traitementAgentService.calculerCumul(this.agents[idx]);
          this.modifierAgentEvent.emit({ agent: { ...this.agents[idx] }, index: idx });
        } else {
          this.agents.push({ ...ligne });
          this.ajouterAgentEvent.emit({ ...ligne });
        }
      });
    }
    this.emplois = this.traitementAgentService.buildEmploisRef(this.agents);
    this.traitementAgentService.sauvegarderAgents(this.agents);
    this.fermerModalCollectif();
  }

  // ── Modale individuel ──
ouvrirModalIndividuel(agent: AgentDto, para: Paragraphe | null): void {
  this.agentEdite              = agent;
  this.paragrapheSelectionne   = para;
  this.lignesIndividuelles     = [];
  this.ligneEnEditionIndividuel = -1;
  this.showModalIndividuel     = true;
}

fermerModalIndividuel(): void {
  this.showModalIndividuel = false;
}

ajouterLigneIndividuelle(): void {
  this.lignesIndividuelles.push({
    depense: '', texte: '', observation: '', montant: 0
  });
  this.ligneEnEditionIndividuel = this.lignesIndividuelles.length - 1;
}

supprimerLigneIndividuelle(i: number): void {
  if (!confirm('Supprimer cette ligne ?')) return;
  this.lignesIndividuelles.splice(i, 1);
  if (this.ligneEnEditionIndividuel === i) this.ligneEnEditionIndividuel = -1;
}

getTotalIndividuel(): number {
  return this.lignesIndividuelles.reduce((sum, l) => sum + (l.montant ?? 0), 0);
}

sauvegarderIndividuel(): void {
  // logique de sauvegarde à implémenter
  this.fermerModalIndividuel();
}
  // ── Modale ajout paragraphe ──
  ouvrirModalAjoutParagraphe(): void { this.showModalAjoutParagraphe = true; }
  fermerModalAjoutParagraphe(): void { this.showModalAjoutParagraphe = false; }

  onSauvegarderNouveauParagraphe(nouveau: Paragraphe): void {
    this.paragraphes = this.traitementAgentService.ajouterParagraphe(this.paragraphes, nouveau);
    this.agents.forEach(agent => {
      if (agent.valeurs[nouveau.code] === undefined) agent.valeurs[nouveau.code] = null;
    });
    this.fermerModalAjoutParagraphe();
  }

  // ── Nouvelle ligne inline ──
  ajouterLigneParagraphe(): void {
    if (this.nouvelleLigne) return;
    const valeurs: Record<string, number | null> = {};
    this.paragraphes.forEach(p => valeurs[p.code] = null);
    this.nouvelleLigne = { emploi: '', matricule: '', nom: '', valeurs, cumul: null };
  }

  calculerCumulNouvelleLigne(): number {
    if (!this.nouvelleLigne) return 0;
    return this.paragraphes.reduce((sum, p) => sum + (this.nouvelleLigne!.valeurs[p.code] ?? 0), 0);
  }

  confirmerNouvelleLigne(): void {
    if (!this.nouvelleLigne) return;
    this.nouvelleLigne.cumul = this.calculerCumulNouvelleLigne();
    this.agents.push({ ...this.nouvelleLigne });
    this.emplois = this.traitementAgentService.buildEmploisRef(this.agents);
    this.nouvelleLigne = null;
  }

  annulerNouvelleLigne(): void { this.nouvelleLigne = null; }
}