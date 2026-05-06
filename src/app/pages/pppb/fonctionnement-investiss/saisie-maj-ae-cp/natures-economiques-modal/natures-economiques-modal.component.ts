import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    CommonModule,   // ← pour *ngIf, *ngFor
    FormsModule,    // ← pour [(ngModel)]
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  ],
  templateUrl: './natures-economiques-modal.component.html',
  styleUrls: ['./natures-economiques-modal.component.scss']
})
export class NaturesEconomiquesModalComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() ajouter = new EventEmitter<ModalResult>();
  @Output() fermer = new EventEmitter<void>();

  // Header data
  section: SectionInfo = {
    code: '43',
    libelle: 'Ministère des Finances et du Budget'
  };

  programme: SectionInfo = {
    code: '2032',
    libelle: "Gestion ressources douanières et protection de l'économie"
  };

  categorieDepense: string = "Investissements exécutés par l'Etat";

  chapitre: SectionInfo = {
    code: '39705440000',
    libelle: 'PROJET DE RENFORCEMENT DU DISPOSITIF DE CONTROLE NON INTRUISIF DANS LES ZONES FRONTALIÈRES'
  };

  action: string = '';
  activite: string = '';
actions: SectionInfo[] = [
  { code: 'ACT001', libelle: 'Action exemple 1' },
  { code: 'ACT002', libelle: 'Action exemple 2' },
  // ... vos vraies données
];

activites: SectionInfo[] = [
  { code: 'ACV001', libelle: 'Activité exemple 1' },
  { code: 'ACV002', libelle: 'Activité exemple 2' },
  // ... vos vraies données
];
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
}