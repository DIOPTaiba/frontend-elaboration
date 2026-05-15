import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {
  trigger, state, style, transition, animate
} from '@angular/animations';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoubleSpaceNumberPipe } from 'src/app/pipes/double-space-number.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NaturesEconomiquesModalComponent,ModalResult} from './natures-economiques-modal/natures-economiques-modal.component';
import { GlobalService } from 'src/app/services/pppb/global/global.service';
import { SECTION_COURANTE } from 'src/app/dtos/global/section.dto';
import { ProgrammeDto } from 'src/app/dtos/global/programme.dto';
import { TypeFinancementDto } from 'src/app/dtos/global/type-financement.dto';
import { CategorieDepenseDto } from 'src/app/dtos/global/categorie-depense.dto';
import { SourceFinancementDto } from 'src/app/dtos/global/source-financement.dto';
import { ChapitreDto } from 'src/app/dtos/global/chapitre.dto';
import { SaisieMajProjetBudgetService } from 'src/app/services/pppb/fonctionnementInvestiss/saisie-maj-projet-budget.service';
import { EnveloppeBudgetDto } from 'src/app/dtos/saisieMaj/enveloppeBudget.dto';
import { LigneBudgetDto } from 'src/app/dtos/saisieMaj/ligneBudget.dto';
import { ActiviteDto } from 'src/app/dtos/global/activite.dto';
import { NgSelectModule } from '@ng-select/ng-select';





@Component({
  selector: 'app-saisie-maj-ae-cp',
  imports: [MaterialModule, DecimalPipe, MatPaginatorModule, MatCardModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    DoubleSpaceNumberPipe,
   NaturesEconomiquesModalComponent,
   NgSelectModule,
  ],
  templateUrl: './saisie-maj-ae-cp.component.html',
  styleUrl: './saisie-maj-ae-cp.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed',
        animate('250ms ease')
      ),
    ])
  ]
})

export class SaisieMajAeCpComponent implements OnInit {
  exerciceCourant: string = '';
  projetBudgetLib: string = '';
  projetBudgetCode: string = '';
  sectionLabel: string = `${SECTION_COURANTE.sec_code} - ${SECTION_COURANTE.sec_libelle}`;
  listeProgrammes: ProgrammeDto[] = [];
  listeTypesFin: TypeFinancementDto[] = [];
  listeCategoriesDepense: CategorieDepenseDto[] = [];
  listeSourcesFin: SourceFinancementDto[] = [];
  selectedProgramme: ProgrammeDto | null = null;
  selectedSourceFin: SourceFinancementDto | null = null;
  selectedCategorie: CategorieDepenseDto | null = null;
  selectedAction = '';
  selectedActivite = '';
  selectedLigne = '';

  displayedColumns: string[] = [
    'code',
    'libelle',
    'ae',
    'cp',
    'srcAe',
    'srcCp',
    'expand'
  ];
  listeChapitres = new MatTableDataSource<ChapitreDto>([]);

listeLigneBudget: LigneBudgetDto[] = [];
filteredLigneBudget: LigneBudgetDto[] = [];
isLoadingLignes = false;
listeActivitesSaisie: ActiviteDto[] = [];
selectedActiviteSaisie: ActiviteDto | null = null;
ligneBudgetPage = 0;
ligneBudgetPageSize = 5;
zero=0;

get paginatedLigneBudget(): LigneBudgetDto[] {
  const start = this.ligneBudgetPage * this.ligneBudgetPageSize;
  return this.filteredLigneBudget.slice(start, start + this.ligneBudgetPageSize);
}

onLigneBudgetPageChange(event: any) {
  this.ligneBudgetPage = event.pageIndex;
  this.ligneBudgetPageSize = event.pageSize;
}

searchActivite = (term: string, item: ActiviteDto): boolean => {
  const t = term.toLowerCase();
  return item.codeActivite.toLowerCase().includes(t) || item.libActivite.toLowerCase().includes(t);
}

onActiviteSaisieChange(activite: ActiviteDto | null): void {
  this.ligneBudgetPage = 0;
  if (!activite) {
    this.filteredLigneBudget = [...this.listeLigneBudget];
  } else {
    this.filteredLigneBudget = this.listeLigneBudget.filter(l => l.codeActivite === activite.codeActivite);
  }
}

groupHeaderColumns: string[] = ['1','2','cr1','cr2','exp'];

  expandedElement: any | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild('catSelect') catSelect: any;
  @ViewChild('sourceSelect') sourceSelect: any;
  
  suSselectedRow: any = null;

  suSselectRow(row: any) {
    this.suSselectedRow = row;
  }

  codeFin: string = '';

  get listeTypesFinsFiltered(): TypeFinancementDto[] {
    return this.listeTypesFin.filter(t => t.tfinCode !== '3' && t.tfinCode !== '5');
  }

  private putCodeFin(tfinCode: string): string {
    if (tfinCode === '1') return 'TRE';
    if (tfinCode === '2') return 'RHY';
    if (tfinCode === '3') return 'DIN';
    if (tfinCode === '4') return 'DON';
    if (tfinCode === '5') return 'PIN';
    if (tfinCode === '6') return 'EMP';
    return '';
  }

  onTypeFinChange(type: TypeFinancementDto) {
    this.codeFin = this.putCodeFin(type.tfinCode);
    this.listeSourcesFin = [];
    
    this.getEnveloppe();

    this.selectedSourceFin = null;
    //this.enveloppeTotalData = null;
    //this.enveloppeRepartiData = null;
    if (this.sourceSelect) this.sourceSelect.value = null;
    this.listeChapitres.data = [];
    if (!this.selectedProgramme) return;
    this.globalService.getSourcesFin(type.tfinId).subscribe({
      next: (sources) => { this.listeSourcesFin = sources; },
      error: (err) => { console.error('Erreur sources financement:', err); }
    });
  }

  getEnveloppe() {
    if (!this.selectedProgramme || !this.selectedCategorie) return;
    const params = {
      exe: Number(this.exerciceCourant),
      sectionId: SECTION_COURANTE.sec_id,
      proId: String(this.selectedProgramme.proId),
      cadeCode: this.selectedCategorie.cadeCode,
      sfinCode: this.codeFin
    };
    this.saisieMajService.enveloppeTotal(params).subscribe({
      next: (data) => { this.enveloppeTotalData = data; },
      error: (err) => { console.error('Erreur enveloppe total:', err); }
    });
    this.saisieMajService.enveloppeReparti(params).subscribe({
      next: (data) => { this.enveloppeRepartiData = data; },
      error: (err) => { console.error('Erreur enveloppe réparti:', err); }
    });
  }

  onProgrammeChange(prog: ProgrammeDto) {
     this.selectedCategorie = null;
    this.selectedSourceFin = null;
    this.enveloppeTotalData = null;
    this.enveloppeRepartiData = null;
    this.listeCategoriesDepense = [];
    
    //this.listeSourcesFin = [];
    this.listeChapitres.data = [];
    this.selectedProgramme = prog;
   
    if (this.catSelect) this.catSelect.value = null;
    if (this.sourceSelect) this.sourceSelect.value = null;
    this.globalService.getCategoriesDepense(prog.proCode).subscribe({
      next: (categories) => { this.listeCategoriesDepense = categories; },
      error: (err) => { console.error('Erreur catégories dépense:', err); }
    });
  }

  onSourceFinChange(source: SourceFinancementDto) {
    this.selectedSourceFin = source;
    this.listeChapitres.data = [];
    this.chargerChapitres();

  }

  onCategorieChange(cat: CategorieDepenseDto) {
    this.selectedCategorie = cat;
    
    if(this.codeFin!=''){this.getEnveloppe();}

    this.listeChapitres.data = [];
    if (this.selectedSourceFin) {
      this.chargerChapitres();
    }
  }

  isLoading = false;
  enveloppeTotalData: EnveloppeBudgetDto | null = null;
  enveloppeRepartiData: EnveloppeBudgetDto | null = null;
  private chargerChapitres() {
    if (!this.selectedProgramme || !this.selectedSourceFin || !this.selectedCategorie) return;

    const secId = SECTION_COURANTE.sec_id;
    const sfinCode = this.selectedSourceFin.sfinCode;
    const proId = this.selectedProgramme.proId;
    const proCode = this.selectedProgramme.proCode;
    const cadeCode = this.selectedCategorie.cadeCode;
    const exeCode = this.projetBudgetCode;

    this.isLoading = true;
    this.listeChapitres.data = [];

    if (cadeCode === '5' || cadeCode === '6') {
      this.saisieMajService.getChapitresInvestissement(secId, sfinCode, proId, proCode,exeCode).subscribe({
        next: (data) => { this.listeChapitres.data = data; this.isLoading = false; },
        error: (err) => { console.error('Erreur chapitres investissement:', err); this.isLoading = false; }
      });
    } else {
      this.saisieMajService.getChapitresFonctionnement(secId, sfinCode, proId,exeCode).subscribe({
        next: (data) => { this.listeChapitres.data = data; this.isLoading = false; },
        error: (err) => { console.error('Erreur chapitres fonctionnement:', err); this.isLoading = false; }
      });
    }
  }

isFullTable(): boolean {
  return this.selectedCategorie?.cadeCode === '5' || this.selectedCategorie?.cadeCode === '6';
}

  ngAfterViewInit() {
    this.listeChapitres.paginator = this.paginator;
  }

  toggle(element: ChapitreDto) {
    if (this.expandedElement === element) {
      this.expandedElement = null;
      return;
    }
    this.expandedElement = element;
    this.listeLigneBudget = [];
    this.filteredLigneBudget = [];
    this.listeActivitesSaisie = [];
    this.selectedActiviteSaisie = null;
    console.log('[toggle] chapId:', element.chapId, '| exeCode:', this.projetBudgetCode);
    this.isLoadingLignes = true;
    this.saisieMajService.getLignesBudget({ chapId: element.chapId, exeCode: this.projetBudgetCode }).subscribe({
      next: (data) => {
        console.log('[getLignesBudget] réponse:', data);
        this.listeLigneBudget = data;
        this.filteredLigneBudget = [...data];
        this.ligneBudgetPage = 0;
        this.suSselectedRow = data.length > 0 ? data[0] : null;
        this.isLoadingLignes = false;
      },
      error: (err) => { console.error('Erreur lignes budget:', err); this.isLoadingLignes = false; }
    });
    this.saisieMajService.getListeActiviteSaisie({ exeCode: this.projetBudgetCode, chapId: element.chapId }).subscribe({
      next: (data) => { this.listeActivitesSaisie = data; },
      error: (err) => { console.error('Erreur activités saisie:', err); }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listeChapitres.filter = filterValue.trim().toLowerCase();
  }
  // ===================== CALCUL TOTAL SECURISE =====================
  getTotal(field: 'ae' | 'cp'): number {
    return this.listeChapitres.data.reduce((total, element) => {
      return total + (element[field] ?? 0);
    }, 0);
  }


  constructor(
    private globalService: GlobalService,
    private saisieMajService: SaisieMajProjetBudgetService
  ) {}

  ngOnInit() {
    this.selectedProgramme = null;
    this.selectedCategorie = null;
    this.selectedSourceFin = null;
    this.listeCategoriesDepense = [];
    this.listeSourcesFin = [];
    this.listeChapitres.data = [];
    this.enveloppeTotalData = null;
    this.enveloppeRepartiData = null;

    this.globalService.getExerciceCourant().subscribe({
      next: (valeur) => {
        // this.exerciceCourant = valeur;
        this.globalService.getProjetBudget(valeur).subscribe({
          next: (projet) => { this.projetBudgetLib = projet.expbLib; this.projetBudgetCode = projet.expbCode; },
          error: (err) => { console.error('Erreur projet budget:', err); }
        });

        this.globalService.getProgrammes(valeur).subscribe({
          next: (programmes) => { this.listeProgrammes = programmes; },
          error: (err) => { console.error('Erreur programmes:', err); }
        });
        this.globalService.getTypesFin().subscribe({
          next: (types) => { this.listeTypesFin = types; },
          error: (err) => { console.error('Erreur types financement:', err); }
        });
      },
      error: (err) => { console.error('Erreur exercice courant:', err); }
    });


  }

// ===================== TOTAL TABLE HTML =====================
getTotal2(field: string): number {
  return this.filteredLigneBudget.reduce((sum, item) => {
    const val = (item as any)[field];
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);
}

onAeLFI1Change(el: LigneBudgetDto, event: Event): void {
  const raw = (event.target as HTMLInputElement).value.replace(/\s/g, '');
  const parsed = parseFloat(raw);
  if (!isNaN(parsed)) el.aeLFI1 = parsed;
}

getEcartAE(el: LigneBudgetDto): number {
  return el.aeLFI1 - el.aeLFI0;
}

getEcartAEPct(el: LigneBudgetDto): string {
  if (!el.aeLFI0) return '100.00 %';
  return ((el.aeLFI1 - el.aeLFI0) / el.aeLFI0 * 100).toFixed(2) + ' %';
}

getEcartCP(el: LigneBudgetDto): number {
  return el.cpLFI1 - el.cpLFI0;
}

getEcartCPPct(el: LigneBudgetDto): string {
  if (!el.cpLFI0) return '100.00 %';
  return ((el.cpLFI1 - el.cpLFI0) / el.cpLFI0 * 100).toFixed(2) + ' %';
}

getTotalEcartAE(): number {
  return this.filteredLigneBudget.reduce((sum, el) => sum + (el.aeLFI1 - el.aeLFI0), 0);
}

getTotalEcartAEPct(): string {
  const totalLFI0 = this.getTotal2('aeLFI0');
  if (!totalLFI0) return '100.00 %';
  return (this.getTotalEcartAE() / totalLFI0 * 100).toFixed(2) + ' %';
}

getTotalEcartCP(): number {
  return this.filteredLigneBudget.reduce((sum, el) => sum + (el.cpLFI1 - el.cpLFI0), 0);
}

getTotalEcartCPPct(): string {
  const totalLFI0 = this.getTotal2('cpLFI0');
  if (!totalLFI0) return '100.00 %';
  return (this.getTotalEcartCP() / totalLFI0 * 100).toFixed(2) + ' %';
}
showModal = false;
selectedChapitre: ChapitreDto | null = null;
showEchEJ = true;

ouvrirModal(chapitre: ChapitreDto) {
  this.selectedChapitre = chapitre;
  this.showModal = true;
}
showEchAE = true;

onNaturesAjoutees(result: ModalResult): void {
  console.log('Natures ajoutées :', result.selectedNatures);
  this.showModal = false;
}
}
