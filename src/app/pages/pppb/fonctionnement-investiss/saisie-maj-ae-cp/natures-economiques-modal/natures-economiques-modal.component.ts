import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { concatMap, toArray } from 'rxjs/operators';
import { SaisieMajProjetBudgetService } from 'src/app/services/pppb/fonctionnementInvestiss/saisie-maj-projet-budget.service';
import { ActionDto } from 'src/app/dtos/global/action.dto';
import { ActiviteDto } from 'src/app/dtos/global/activite.dto';
import { LigneBudgetDto } from 'src/app/dtos/saisieMaj/ligneBudget.dto';
import { ProgrammeDto } from 'src/app/dtos/global/programme.dto';
import { CategorieDepenseDto } from 'src/app/dtos/global/categorie-depense.dto';
import { SectionDto, SECTION_COURANTE } from 'src/app/dtos/global/section.dto';
import { ChapitreDto } from 'src/app/dtos/global/chapitre.dto';
import { SourceFinancementDto } from 'src/app/dtos/global/source-financement.dto';
import { ResponseDto } from 'src/app/dtos/global/response.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

export interface SectionInfo {
  code: string;
  libelle: string;
}

export interface ModalResult {
  selectedNatures: LigneBudgetDto[];
  success: boolean;
  messageErreur?: string;
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
    MatProgressSpinnerModule,
    NgSelectModule,
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
  @Input() sfinCode: string = '';
  @Input() codeFin: string = '';
  @Input() sourceFin: SourceFinancementDto | null = null;
  @Output() ajouter = new EventEmitter<ModalResult>();
  @Output() fermer = new EventEmitter<void>();

  selectedAction: ActionDto | null = null;
  selectedActivite: ActiviteDto | null = null;

  actions: ActionDto[] = [];
  activites: ActiviteDto[] = [];

  // Search filters
  selectedCode: string = '';
  selectedLibelle: string = '';

  natures: LigneBudgetDto[] = [];
  filteredNatures: LigneBudgetDto[] = [];
  selectedLignes: Set<string> = new Set();
  isLoadingNatures = false;


  get selectedItems(): LigneBudgetDto[] {
    return this.natures.filter(n => this.selectedLignes.has(n.codeLigne));
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible']?.currentValue === true && this.programme && this.chapitre) {
      this.chargerActions();
    }
  }

  private chargerActions(): void {
    if (!this.programme || !this.chapitre) return;
    this.saisieMajService.getActionsProjetDeBudget({
      proId: this.programme.proId,
      pappRef: this.programme.pappRef,
      chapCode: this.chapitre.chapCode,
      chapId: this.chapitre.chapId
    }).subscribe({
      next: (data) => { this.actions = data; },
      error: (err) => { console.error('Erreur actions:', err); }
    });
  }

  private chargerActivites(): void {
    if (!this.selectedAction || !this.programme || !this.chapitre) return;
    this.saisieMajService.getActivitesProjetDeBudget({
      copId: this.selectedAction.copId,
      pappRef: this.programme.pappRef,
      chapCode: this.chapitre.chapCode
    }).subscribe({
      next: (data) => { this.activites = data; },
      error: (err) => { console.error('Erreur activités:', err); }
    });
  }

  private chargerNatures(): void {
    if (!this.chapitre || !this.categorieDepense) return;
    this.isLoadingNatures = true;
    this.saisieMajService.getLigneSaisie({
      budcCode: this.selectedActivite?.budcCode,
      chapId: this.chapitre.chapId,
      cadeCode: this.categorieDepense.cadeCode,
      sfinCode: this.sfinCode
    }).subscribe({
      next: (data) => {
        this.natures = data;
        this.filteredNatures = [...data];
        this.isLoadingNatures = false;
      },
      error: (err) => {
        console.error('Erreur natures économiques:', err);
        this.isLoadingNatures = false;
      }
    });
  }

  onActionSelect(): void {
    this.selectedActivite = null;
    this.activites = [];
    this.natures = [];
    this.filteredNatures = [];
    this.selectedLignes.clear();
    this.chargerActivites();
  }

  onActiviteSelect(): void {
    this.natures = [];
    this.filteredNatures = [];
    this.selectedLignes.clear();
    this.chargerNatures();
  }

  onCodeChange(): void { this.applyFilters(); }
  onLibelleChange(): void { this.applyFilters(); }

  applyFilters(): void {
    this.filteredNatures = this.natures.filter(item => {
      const codeMatch = !this.selectedCode || item.codeLigne === this.selectedCode;
      const libelleMatch = !this.selectedLibelle || item.libLigne === this.selectedLibelle;
      return codeMatch && libelleMatch;
    });
  }

  isSelected(item: LigneBudgetDto): boolean {
    return this.selectedLignes.has(item.codeLigne);
  }

  toggleSelection(item: LigneBudgetDto): void {
    if (this.selectedLignes.has(item.codeLigne)) {
      this.selectedLignes.delete(item.codeLigne);
    } else {
      this.selectedLignes.add(item.codeLigne);
    }
  }

  onCheckChange(item: LigneBudgetDto): void {
    this.toggleSelection(item);
  }

  onAjouter(): void {
    if (this.selectedItems.length === 0 || !this.chapitre || !this.categorieDepense) return;

    from(this.selectedItems).pipe(
      concatMap(ligne => this.saisieMajService.insertLigneBudget({
        sectionId: this.section.sec_id,
        budcCode: this.selectedActivite?.budcCode,
        chapId: this.chapitre!.chapId,
        natIdNumber: ligne.idLigne,
        cadeCode: this.categorieDepense!.cadeCode,
        sfinCode: this.codeFin,
        sfinCodeNew: this.sourceFin?.sfinCode,
        bailfCode: Number(this.sourceFin?.sfinBailfCode),
        cp1Prec: 0,
        cp1: 0,
        aeAnt: 0,
        ae1Prec: 0,
        ae1: 0,
        foncatId: 'OPSCM43095'
      })),
      toArray()
    ).subscribe({
      next: (responses: ResponseDto[]) => {
        const erreur = responses.find(r => r.etat === 0);
        if (erreur) {
          this.ajouter.emit({ selectedNatures: [], success: false, messageErreur: erreur.messageErreur });
        } else {
          this.ajouter.emit({ selectedNatures: [...this.selectedItems], success: true });
          this.resetSelections();
        }
      },
      error: (err: Error) => {
        this.ajouter.emit({ selectedNatures: [], success: false, messageErreur: err.message });
      }
    });
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
    this.selectedLignes.clear();
    this.selectedCode = '';
    this.selectedLibelle = '';
    this.natures = [];
    this.filteredNatures = [];
    this.selectedActivite = null;
    this.selectedAction = null;
    this.activites = [];
  }
}