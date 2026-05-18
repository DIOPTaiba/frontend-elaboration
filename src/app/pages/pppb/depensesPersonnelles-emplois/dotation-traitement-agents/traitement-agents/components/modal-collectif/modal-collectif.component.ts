import {
  Component, Input, Output, EventEmitter,
  OnChanges, ViewEncapsulation, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Agent, EmploiRef, FiltreState, Paragraphe
} from '../../models/traitement-agent.models';
import { TraitementAgentService } from '../../services/traitement-agent.service';
import { AgentDto } from 'src/app/dtos/global/agent.dto';

@Component({
  selector: 'app-modal-collectif',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-collectif.component.html',
  // styleUrls: ['./modal-collectif.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalCollectifComponent implements OnChanges {

  @Input() visible       = false;
  @Input() isNewAgent    = false;
  @Input() agentEdite: AgentDto | null = null;
  @Input() paragraphes: Paragraphe[] = [];
  @Input() emplois: EmploiRef[] = [];
  @Input() filtreState!: FiltreState;
  @Input() activeFilterCount = 0;
  @Input() agents: Agent[] = [];

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
  @Output() sauvegarder = new EventEmitter<Agent[]>();

  modalLignes: AgentDto[] = [];
  colonnesDepenses: { code: string; label: string }[] = [];

  showModalSelectionAgent = false;
  rechercheAgent          = '';

  constructor(private svc: TraitementAgentService) {}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['visible']?.currentValue === true || changes['paragraphes']) {
    if (!this.visible) return;

    // this.modalLignes = this.agentEdite
    //   ? [{ ...this.agentEdite, valeurs: { ...this.agentEdite.valeurs } }]
    //   : [];

    // ✅ Première colonne : 661_1
    this.colonnesDepenses = this.paragraphes.length > 0
      ? [{ code: `${this.paragraphes[0].code}_1`, label: this.paragraphes[0].label }]
      : [];
  }
}

  // ── Agents disponibles pour la sélection ──────────────────
  // Seuls les agents répondant aux filtres actifs ET non encore
  // présents dans les lignes sont proposés.
  get agentsFiltresSelection(): Agent[] {
    // 1. Appliquer les filtres du panneau principal
    let liste = this.agents.filter(ag =>
      (!this.filtreState.emploi    || ag.emploi === this.filtreState.emploi) &&
      (!this.filtreState.matricule || ag.matricule.toLowerCase()
          .includes(this.filtreState.matricule.toLowerCase())) &&
      (!this.filtreState.chapitre  || (ag.chapitre ?? '').toLowerCase()
          .includes(this.filtreState.chapitre.toLowerCase())) &&
      (!this.filtreState.action    || (ag.action ?? '').toLowerCase()
          .includes(this.filtreState.action.toLowerCase())) &&
      (!this.filtreState.activite  || (ag.activite ?? '').toLowerCase()
          .includes(this.filtreState.activite.toLowerCase()))
    );

    // 2. Exclure les agents déjà ajoutés comme lignes
    const matriculesPresents = new Set(this.modalLignes.map(l => l.matricule));
    liste = liste.filter(ag => !matriculesPresents.has(ag.matricule));

    // 3. Recherche libre dans la sous-modale
    const q = this.rechercheAgent.toLowerCase().trim();
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

  // ── Ajouter un agent comme nouvelle LIGNE du tableau ──────
  // Récupère ses valeurs existantes pour chaque colonne de dépense
  // déjà présente, et initialise à null les colonnes sans valeur.
  selectionnerAgent(agent: Agent): void {
    if (this.estDejaAjoute(agent)) return;

    const valeurs: { [code: string]: number | null } = {};
    this.colonnesDepenses.forEach(col => {
      valeurs[col.code] = agent.valeurs[col.code] ?? null;
    });

    const cumul = this.colonnesDepenses.reduce(
      (sum, col) => sum + (valeurs[col.code] ?? 0), 0
    );

    // this.modalLignes.push({
    //   ...agent,
    //   valeurs,
    //   cumul,
    // });

    this.showModalSelectionAgent = false;
  }

  // ── Ajouter une nouvelle COLONNE de dépense ───────────────
  // Génère un code unique, crée la colonne et initialise
  // sa valeur à null pour chaque agent (ligne) déjà présent.
 ajouterLigne(): void {
  if (this.paragraphes.length === 0) return;

  const para = this.paragraphes[0];
  
  // ✅ Numéro de ligne incrémenté après le code du paragraphe
  const numLigne = this.colonnesDepenses.length + 1;
  const newCode  = `${para.code}_${numLigne}`;
  const newCol   = {
    code:  newCode,
    label: `Ligne ${numLigne}`,
  };

  this.colonnesDepenses.push(newCol);

  // Initialiser la nouvelle colonne à null pour toutes les lignes existantes
  // this.modalLignes.forEach(l => {
  //   l.valeurs[newCode] = null;
  // });
}

  // ── Recalcul du cumul d'une ligne après saisie ────────────
  // recalculerCumulLigne(i: number): void {
  //   this.modalLignes[i].cumul = this.colonnesDepenses.reduce(
  //     (sum, col) => sum + (this.modalLignes[i].valeurs[col.code] ?? 0), 0
  //   );
  // }

  // ── Récapitulatifs ────────────────────────────────────────
  // getModalRecap(code: string): number {
  //   return this.modalLignes.reduce(
  //     (s, l) => s + (l.valeurs[code] ?? 0), 0
  //   );
  // }

  // getModalTotalCumul(): number {
  //   return this.modalLignes.reduce(
  //     (s, l) => s + (l.cumul ?? 0), 0
  //   );
  // }

  // ── Enregistrement ────────────────────────────────────────
  onSauvegarder(): void {
    const lignesValides = this.modalLignes.filter(
      l => l.emploi || l.matricule || l.nom
    );
    if (lignesValides.length === 0) return;

    // lignesValides.forEach(l => {
    //   l.cumul = this.colonnesDepenses.reduce(
    //     (sum, col) => sum + (l.valeurs[col.code] ?? 0), 0
    //   );
    // });

    // this.sauvegarder.emit(lignesValides);
  }

  onFermer(): void {
    this.fermer.emit();
  }
  // Indice de la ligne en cours d'édition (-1 = aucune)
ligneEnEdition = -1;

// Bascule le mode édition sur la ligne i
// (les inputs sont déjà visibles en permanence dans ce tableau,
//  mais cette propriété permet d'ajouter un highlight visuel)
modifierLigne(i: number): void {
  this.ligneEnEdition = this.ligneEnEdition === i ? -1 : i;
}

// Supprime la ligne i après confirmation
supprimerLigne(i: number): void {
  if (!confirm(`Supprimer la ligne de ${this.modalLignes[i].nom || 'cet agent'} ?`)) return;
  this.modalLignes.splice(i, 1);
  if (this.ligneEnEdition === i) this.ligneEnEdition = -1;
}
}