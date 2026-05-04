import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Paragraphe {
  code: string;
  label: string;
}

export interface Agent {
  emploi: string;
  matricule: string;
  nom: string;
  chapitre?: string;
  action?: string;
  activite?: string;
  valeurs: { [codeParagraphe: string]: number | null };
  cumul: number | null;
}

@Component({
  selector: 'app-traitement-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  gestionOptions  = [{ value: '2025', label: '2025' }, { value: '2026', label: '2026' }, { value: '2027', label: '2027' }];
  budgetOptions   = [{ value: 'Projet LFI 2027', label: 'Projet LFI 2027' }, { value: 'LFI 2026', label: 'LFI 2026' }];
  sectionOptions  = [
    { value: 'Ministère des finances et du Budget', label: 'Ministère des finances et du Budget' },
    { value: 'Ministère de la Santé', label: 'Ministère de la Santé' },
  ];
  programmeOptions = [
    { value: "Elaboration du budget et suivi de l'exécution des dépenses", label: "Elaboration du budget et suivi de l'exécution des dépenses" },
    { value: 'Administration générale', label: 'Administration générale' },
  ];

  // ── Paragraphes ──
  paragraphes: Paragraphe[] = [
    { code: '661', label: 'Traitements et salaires' },
    { code: '662', label: 'Primes' },
    { code: '663', label: 'Indemnités' },
    { code: '665', label: 'Cotisations sociales' },
    { code: '666', label: 'Prestations familiales' },
    { code: '667', label: 'Prises en charge médicales' },
    { code: '668', label: 'Contractuels' },
    { code: '669', label: 'Autres charges de personnel' },
  ];

  // ── Filtres ──
  showFilter      = false;
  filterEmploi    = '';
  filterChapitre  = '';
  filterMatricule = '';
  filterAction    = '';
  filterActivite  = '';

  emplois: { code: string; libelle: string }[] = [];
  agentsFiltres: Agent[] = [];

  get activeFilterCount(): number {
    return [this.filterEmploi, this.filterChapitre, this.filterMatricule, this.filterAction, this.filterActivite]
      .filter(v => v && v.trim() !== '').length;
  }

  // ── Modale ──
  showModal   = false;
  isNewAgent  = false;
  editIndex   = -1;
  modalAgent: Agent = this.emptyAgent();
  modalValeurs: { [code: string]: number | null } = {};

  /** Lignes du tableau de saisie dans la modale */
  modalLignes: Agent[] = [];

  // ── Données de démonstration ──
  private readonly demoAgents: Agent[] = [
    { emploi: 'Directeur',    matricule: 'MAT001', nom: 'Mamadou Diallo',   chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2400000, '662': 350000, '663': 180000, '665': 240000, '666': null,  '667': null,  '668': null,  '669': null  }, cumul: null },
    { emploi: 'Contrôleur',   matricule: 'MAT002', nom: 'Aissatou Sow',     chapitre: '25025331', action: 'A2', activite: 'ACT02', valeurs: { '661': 1850000, '662': 280000, '663': 140000, '665': 185000, '666': 60000, '667': null,  '668': null,  '669': null  }, cumul: null },
    { emploi: 'Chef service', matricule: 'MAT003', nom: 'Ibrahima Fall',     chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2100000, '662': 310000, '663': 160000, '665': 210000, '666': null,  '667': 45000, '668': null,  '669': null  }, cumul: null },
    { emploi: 'Analyste',     matricule: 'MAT004', nom: 'Fatou Ndiaye',      chapitre: '25025332', action: 'A3', activite: 'ACT03', valeurs: { '661': 1600000, '662': 220000, '663': 110000, '665': 160000, '666': 55000, '667': null,  '668': null,  '669': 30000 }, cumul: null },
    { emploi: 'Comptable',    matricule: 'MAT005', nom: 'Ousmane Ba',        chapitre: '25025331', action: 'A2', activite: 'ACT02', valeurs: { '661': 1750000, '662': 250000, '663': 125000, '665': 175000, '666': null,  '667': null,  '668': null,  '669': null  }, cumul: null },
    { emploi: 'Assistant',    matricule: 'MAT006', nom: 'Mariama Camara',    chapitre: '25025333', action: 'A4', activite: 'ACT04', valeurs: { '661': 1200000, '662': 180000, '663': 90000,  '665': 120000, '666': 50000, '667': null,  '668': null,  '669': null  }, cumul: null },
    { emploi: 'Ingenieur',    matricule: 'MAT007', nom: 'Cheikh Mbaye',      chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2250000, '662': 330000, '663': 165000, '665': 225000, '666': null,  '667': 55000, '668': null,  '669': null  }, cumul: null },
    { emploi: 'Juriste',      matricule: 'MAT008', nom: 'Rokhaya Diop',      chapitre: '25025332', action: 'A3', activite: 'ACT03', valeurs: { '661': 1950000, '662': 290000, '663': 145000, '665': 195000, '666': 65000, '667': null,  '668': null,  '669': null  }, cumul: null },
    { emploi: 'Technicien',   matricule: 'MAT009', nom: 'Modou Sarr',        chapitre: '25025333', action: 'A4', activite: 'ACT04', valeurs: { '661': 1400000, '662': 200000, '663': 100000, '665': 140000, '666': null,  '667': null,  '668': 35000, '669': null  }, cumul: null },
    { emploi: 'Directeur',    matricule: 'MAT010', nom: 'Ndeye Faye',        chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2500000, '662': 370000, '663': 185000, '665': 250000, '666': null,  '667': null,  '668': null,  '669': 50000 }, cumul: null },
    { emploi: 'Controleur',   matricule: 'MAT011', nom: 'Alioune Thiam',     chapitre: '25025331', action: 'A2', activite: 'ACT02', valeurs: { '661': 1800000, '662': 270000, '663': 135000, '665': 180000, '666': 60000, '667': null,  '668': null,  '669': null  }, cumul: null },
    { emploi: 'Analyste',     matricule: 'MAT012', nom: 'Seynabou Gueye',    chapitre: '25025332', action: 'A3', activite: 'ACT03', valeurs: { '661': 1550000, '662': 215000, '663': 108000, '665': 155000, '666': null,  '667': 40000, '668': null,  '669': null  }, cumul: null },
  ];

  // ─────────────────────────────────────────────
  // Cycle de vie
  // ─────────────────────────────────────────────

  ngOnInit(): void {
    if (!this.agents || this.agents.length === 0) {
      this.agents = this.demoAgents;
    }
    this.agents.forEach(a => { a.cumul = this.calculerCumul(a); });
    this.agentsFiltres = [...this.agents];
    this.emplois = this.buildEmploisRef();
  }

  // ─────────────────────────────────────────────
  // Utilitaires
  // ─────────────────────────────────────────────

  calculerCumul(agent: Agent): number {
    return this.paragraphes.reduce((sum, p) => sum + (agent.valeurs[p.code] ?? 0), 0);
  }

  calculerCumulModal(): number {
    return this.paragraphes.reduce((sum, p) => sum + (this.modalValeurs[p.code] ?? 0), 0);
  }

  private buildEmploisRef(): { code: string; libelle: string }[] {
    const map = new Map<string, string>();
    this.agents.forEach(a => { if (a.emploi) map.set(a.emploi, a.emploi); });
    return Array.from(map.entries()).map(([code, libelle]) => ({ code, libelle }));
  }

  private emptyAgent(): Agent {
    return { emploi: '', matricule: '', nom: '', valeurs: {}, cumul: null };
  }

  private initModalValeurs(): void {
    this.modalValeurs = {};
    this.paragraphes.forEach(p => {
      this.modalValeurs[p.code] = this.modalAgent.valeurs[p.code] ?? null;
    });
  }

  // ─────────────────────────────────────────────
  // Filtres
  // ─────────────────────────────────────────────

  toggleFilter(event: Event): void {
    event.preventDefault();
    this.showFilter = !this.showFilter;
  }

  private _runFilter(): void {
    const e = this.filterEmploi, c = this.filterChapitre, m = this.filterMatricule,
          a = this.filterAction, ac = this.filterActivite;
    this.agentsFiltres = this.agents.filter(ag =>
      (!e  || ag.emploi === e) &&
      (!m  || ag.matricule.toLowerCase().includes(m.toLowerCase())) &&
      (!c  || (ag.chapitre  ?? '').toLowerCase().includes(c.toLowerCase())) &&
      (!a  || (ag.action    ?? '').toLowerCase().includes(a.toLowerCase())) &&
      (!ac || (ag.activite  ?? '').toLowerCase().includes(ac.toLowerCase()))
    );
  }

  onFilterChange(): void { this._runFilter(); }
  applyFilter():    void { this._runFilter(); }

  resetFilter(): void {
    this.filterEmploi = this.filterChapitre = this.filterMatricule = this.filterAction = this.filterActivite = '';
    this.agentsFiltres = [...this.agents];
  }

  clearField(field: string): void {
    if (field === 'emploi')    this.filterEmploi    = '';
    if (field === 'chapitre')  this.filterChapitre  = '';
    if (field === 'matricule') this.filterMatricule = '';
    if (field === 'action')    this.filterAction    = '';
    if (field === 'activite')  this.filterActivite  = '';
    this._runFilter();
  }

  // ─────────────────────────────────────────────
  // Récapitulatif
  // ─────────────────────────────────────────────

  getRecapitulatif(code: string): number {
    return this.agentsFiltres.reduce((s, a) => s + (a.valeurs[code] ?? 0), 0);
  }

  getTotalCumul(): number {
    return this.agentsFiltres.reduce((s, a) => s + (a.cumul ?? 0), 0);
  }


  // ─────────────────────────────────────────────
  // Modale
  // ─────────────────────────────────────────────

  ouvrirModalModifier(agent: Agent, index: number): void {
    this.isNewAgent  = false;
    this.editIndex   = this.agents.indexOf(agent);
    this.modalAgent  = { ...agent, valeurs: { ...agent.valeurs } };
    this.initModalValeurs();
    // Initialiser le tableau de saisie avec l'agent courant + lignes vides
    this.modalLignes = this.buildModalLignes(agent);
    this.showModal   = true;
  }

  ouvrirModalAjout(): void {
    this.isNewAgent  = true;
    this.editIndex   = -1;
    this.modalAgent  = this.emptyAgent();
    this.initModalValeurs();
    this.modalLignes = this.buildModalLignes(null);
    this.showModal   = true;
  }

  fermerModal(): void {
    this.showModal = false;
  }

  sauvegarderAgent(): void {
    // Sauvegarder toutes les lignes non vides
    const lignesValides = this.modalLignes.filter(l => l.emploi || l.matricule || l.nom);
    if (lignesValides.length === 0) {
      this.fermerModal();
      return;
    }

    if (this.isNewAgent) {
      // Ajouter toutes les lignes valides
      lignesValides.forEach(ligne => {
        ligne.cumul = this.calculerCumul(ligne);
        this.agents.push({ ...ligne });
        this.ajouterAgentEvent.emit({ ...ligne });
      });
    } else {
      // Mettre à jour la première ligne, ajouter les suivantes
      const premiere = lignesValides[0];
      premiere.cumul = this.calculerCumul(premiere);
      this.agents[this.editIndex] = { ...premiere };
      this.modifierAgentEvent.emit({ agent: { ...premiere }, index: this.editIndex });
      for (let i = 1; i < lignesValides.length; i++) {
        lignesValides[i].cumul = this.calculerCumul(lignesValides[i]);
        this.agents.push({ ...lignesValides[i] });
      }
    }

    this.emplois       = this.buildEmploisRef();
    this.agentsFiltres = [...this.agents];
    this._runFilter();
    this.fermerModal();
  }

  /** Construire les lignes initiales de la modale (agent courant uniquement, sans lignes vides) */
  private buildModalLignes(agent: Agent | null): Agent[] {
    if (agent && (agent.emploi || agent.matricule || agent.nom)) {
      return [{ ...agent, valeurs: { ...agent.valeurs } }];
    }
    return [];
  }

  /** Ajouter une ligne vide dans le tableau de la modale */
  ajouterLigneModal(): void {
    this.modalLignes.push(this.emptyAgent());
  }

  /** Recalculer le cumul d'une ligne après saisie */
  recalculerCumulLigne(index: number): void {
    const ligne = this.modalLignes[index];
    ligne.cumul = this.paragraphes.reduce((s, p) => s + (ligne.valeurs[p.code] ?? 0), 0);
  }

  /** Total d'une colonne paragraphe dans la modale */
  getModalRecap(code: string): number {
    return this.modalLignes.reduce((s, l) => s + (l.valeurs[code] ?? 0), 0);
  }

  /** Total cumul dans la modale */
  getModalTotalCumul(): number {
    return this.modalLignes.reduce((s, l) => s + (l.cumul ?? 0), 0);
  }
  
  // ─────────────────────────────────────────────
//clique sur le bouton modifier horizontal
// ============================
// Etat modale individuel
// ============================
showModalIndividuel = false;

paragrapheSelectionne: any = null;

lignesIndividuelles: any[] = [];

// ============================
// Ouvrir
// ============================
ouvrirModalIndividuel(para: any) {
  this.paragrapheSelectionne = para;
  this.showModalIndividuel = true;
  this.lignesIndividuelles = this.initLignesIndividuelles();
}

// ============================
// Init
// ============================
initLignesIndividuelles() {
  return [
    { depense: '', texte: '', observation: '', montant: 0 }
  ];
}

// ============================
// Ajouter ligne
// ============================
ajouterLigneIndividuelle() {
  this.lignesIndividuelles.push({
    depense: '',
    texte: '',
    observation: '',
    montant: 0
  });
}

// ============================
// Total
// ============================
getTotalIndividuel() {
  return this.lignesIndividuelles
    .reduce((sum, l) => sum + (Number(l.montant) || 0), 0);
}

// ============================
// Fermer
// ============================
fermerModalIndividuel() {
  this.showModalIndividuel = false;
}

// ============================
// Enregistrer
// ============================
enregistrerIndividuel() {
  console.log('DATA:', this.lignesIndividuelles);
  this.fermerModalIndividuel();
}
  
}
