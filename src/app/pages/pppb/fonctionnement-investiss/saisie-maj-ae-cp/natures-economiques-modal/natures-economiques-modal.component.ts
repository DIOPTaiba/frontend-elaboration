import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { SaisieMajProjetBudgetService } from 'src/app/services/pppb/fonctionnementInvestiss/saisie-maj-projet-budget.service';
import { ActionDto } from 'src/app/dtos/global/action.dto';
import { ActiviteDto } from 'src/app/dtos/global/activite.dto';
import { ProgrammeDto } from 'src/app/dtos/global/programme.dto';
import { CategorieDepenseDto } from 'src/app/dtos/global/categorie-depense.dto';
import { SectionDto, SECTION_COURANTE } from 'src/app/dtos/global/section.dto';
import { ChapitreDto } from 'src/app/dtos/global/chapitre.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
export interface NatureEconomique {
  code: string;
  libelle: string;
  selected: boolean;
}

export interface SectionInfo {
  code: string;
  libelle: string;
}

export interface ModalResult {
  selectedNatures: NatureEconomique[];
}

@Component({
  selector: 'app-natures-economiques-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './natures-economiques-modal.component.html',
  styleUrls: ['./natures-economiques-modal.component.scss']
})
export class NaturesEconomiquesModalComponent implements OnInit, OnChanges {

  constructor(private saisieMajService: SaisieMajProjetBudgetService) { }

  @Input() isVisible: boolean = false;
  @Input() section: SectionDto = SECTION_COURANTE;
  @Input() programme: ProgrammeDto | null = null;
  @Input() categorieDepense: CategorieDepenseDto | null = null;
  @Input() chapitre: ChapitreDto | null = null;
  @Output() ajouter = new EventEmitter<ModalResult>();
  @Output() fermer = new EventEmitter<void>();

  selectedAction: ActionDto | null = null;
  selectedActivite: ActiviteDto | null = null;

  actions: ActionDto[] = [];
  activites: ActiviteDto[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible']?.currentValue === true && this.programme && this.chapitre) {
      this.chargerActions();
    }
  }

  private chargerActions(): void {
    if (!this.programme || !this.chapitre) return;
    this.saisieMajService.getActionsProjetDeBudget(
      this.programme.proId,
      this.programme.pappRef,
      this.chapitre.chapCode,
      this.chapitre.chapId
    ).subscribe({
      next: (data) => { this.actions = data; },
      error: (err) => { console.error('Erreur actions:', err); }
    });
  }

  private chargerActivites(): void {
    if (!this.selectedAction || !this.programme || !this.chapitre) return;
    this.saisieMajService.getActivitesProjetDeBudget(
      this.selectedAction.copId,
      this.programme.pappRef,
      this.chapitre.chapCode
    ).subscribe({
      next: (data) => { this.activites = data; },
      error: (err) => { console.error('Erreur activités:', err); }
    });
  }

  onActionSelect(): void {
    this.selectedActivite = null;
    this.activites = [];
    this.chargerActivites();
  }

  onActiviteSelect(): void { }
  // Search filters
  selectedCode: string = '';
  selectedLibelle: string = '';

  // Nature économique data
  natures: NatureEconomique[] = [
    { code: '2121', libelle: 'Brevet', selected: false },
    { code: '2122', libelle: 'Marque de Fabrique', selected: false },
    { code: '2123', libelle: "Droit d'auteur", selected: false },
    { code: '2129', libelle: 'Autre Brevets, marques de fabrique, droits d\'auteur', selected: false },
    { code: '2132', libelle: 'Acquisition de progiciels et logiciels', selected: false },
    { code: '2139', libelle: 'Autres conception de système organisation -progiciels', selected: false },
    { code: '2141', libelle: "Droit d'exploitation", selected: false },
    { code: '2142', libelle: 'Fonds de commerce', selected: false },
    { code: '2143', libelle: 'Pas de porte', selected: false },
    { code: '2144', libelle: 'Licences', selected: false },
    { code: '2149', libelle: 'Autres immobilisations incorporelles', selected: false },
    { code: '2211', libelle: 'Terrains nus', selected: false },
    { code: '2212', libelle: 'Terrains aménagés', selected: false },
    { code: '2213', libelle: 'Sous-sols et sursols', selected: false },
    { code: '2221', libelle: 'Bâtiments industriels et commerciaux', selected: false },
    { code: '2222', libelle: 'Bâtiments administratifs', selected: false },
  ];

  filteredNatures: NatureEconomique[] = [];

  get selectedItems(): NatureEconomique[] {
    return this.natures.filter(n => n.selected);
  }

  ngOnInit(): void {
    this.filteredNatures = [...this.natures];
  }

  onCodeChange(): void {
    this.applyFilters();
  }

  onLibelleChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredNatures = this.natures.filter(item => {
      const codeMatch = !this.selectedCode || item.code === this.selectedCode;
      const libelleMatch = !this.selectedLibelle || item.libelle === this.selectedLibelle;
      return codeMatch && libelleMatch;
    });
  }

  toggleSelection(item: NatureEconomique): void {
    item.selected = !item.selected;
  }

  onCheckChange(item: NatureEconomique): void {
    // handled via ngModel binding
  }

  browseAction(): void {
    console.log('Browse action triggered');
    // Implement navigation/lookup dialog for Action
  }

  browseActivite(): void {
    console.log('Browse activite triggered');
    // Implement navigation/lookup dialog for Activité
  }

  onAjouter(): void {
    if (this.selectedItems.length === 0) return;
    this.ajouter.emit({ selectedNatures: [...this.selectedItems] });
    this.resetSelections();
  }

  onFermer(): void {
    this.resetSelections();
    this.fermer.emit();
    this.selectedActivite = null;
    this.selectedAction = null;
    this.activites = [];
  }

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.onFermer();
    }
  }

  private resetSelections(): void {
    this.natures.forEach(n => (n.selected = false));
    this.selectedCode = '';
    this.selectedLibelle = '';
    this.filteredNatures = [...this.natures];
  }
  actionCode: string = '';
actionLibelle: string = '';

activiteCode: string = '';
activiteLibelle: string = '';

onActionChange(libelle: string): void {
  const found = this.actions.find(a => a.copLibelle === libelle);
  this.actionCode = found ? found.copCode : '';
}

onActiviteChange(libelle: string): void {
  const found = this.activites.find(a => a.copLibelle === libelle);
  this.activiteCode = found ? found.copCode : '';
}
}