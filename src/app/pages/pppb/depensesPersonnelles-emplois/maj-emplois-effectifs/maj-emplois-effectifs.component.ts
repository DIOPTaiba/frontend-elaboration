import { Component, computed, signal, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IconModule } from 'src/app/icon/icon.module';
import { MatSort } from '@angular/material/sort';
import { MajEmploisEffectifsService } from 'src/app/services/pppb/depensesPersonnelEmplois/majEmploisEffectifs.service';
import { GlobalService } from 'src/app/services/pppb/global/global.service';
import { ProgrammeDto } from 'src/app/dtos/global/programme.dto';
import { ParametreRechercheDto } from 'src/app/dtos/global/parametreRecherche.dto';
import { ChapitreEffectifsDto } from 'src/app/dtos/majEffectifsEmplois/chapitreEffectifs.dto';
import { DotationsTraitementsService } from 'src/app/services/pppb/depensesPersonnelEmplois/dotationsTraitements.service';
import { DoubleSpaceNumberPipe } from 'src/app/pipes/double-space-number.pipe';


const AGENT_DATA: objetAgent[] = [
  {
    chapitre: 'Direction SI DGB',
    emploi: 'Ing. Informaticien',
    matricule: '123450',
    nom: 'xxxxx yyy',
    age: 0,
    statut: 'agent',
    action: 'action',
    activite: 'activité',
    effectifs: 25,
    budgetPrevu: 25000000,
  },
  {
    chapitre: 'Direction SI DGB',
    emploi: 'Ing. Informaticien',
    matricule: '123451',
    nom: 'xxxxx yyy',
    age: 0,
    statut: 'agent',
    action: 'action',
    activite: 'activité',
    effectifs: 25,
    budgetPrevu: 25000000,
  },
  {
    chapitre: 'Direction SI DGB',
    emploi: 'Ing. Informaticien',
    matricule: '123452',
    nom: 'xxxxx yyy',
    age: 0,
    statut: 'agent',
    action: 'action',
    activite: 'activité',
    effectifs: 25,
    budgetPrevu: 25000000,
  },
  {
    chapitre: 'Direction SI DGB',
    emploi: 'Ing. Informaticien',
    matricule: '123453',
    nom: 'xxxxx yyy',
    age: 0,
    statut: 'agent',
    action: 'action',
    activite: 'activité',
    effectifs: 25,
    budgetPrevu: 25000000,
  },
  {
    chapitre: 'Direction SI DGB',
    emploi: 'Ing. Informaticien',
    matricule: '123454',
    nom: 'xxxxx yyy',
    age: 0,
    statut: 'agent',
    action: 'action',
    activite: 'activité',
    effectifs: 25,
    budgetPrevu: 25000000,
  }
];
const EMPLOI_DATA: objetType[] = [
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp01',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp02',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp03',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp04',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp05',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp01',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp02',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp03',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp04',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Emp05',
    libelle: 'Ingénieurs informaticiens',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
];
const ACTION_DATA: objetType[] = [
  {
    action: 'Élaboration des lois de finances',
    code: 'Action01',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action02',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action03',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action04',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action05',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action01',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action02',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action03',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action04',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Élaboration des lois de finances',
    code: 'Action05',
    libelle: 'Élaboration des lois de finances',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  }
];

const ACTIVITE_DATA: objetType[] = [
  {
    action: 'Action01',
    code: 'Activite01',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action02',
    code: 'Activite02',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action03',
    code: 'Activite03',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action04',
    code: 'Activite04',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action05',
    code: 'Activite05',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action06',
    code: 'Activite01',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action07',
    code: 'Activite02',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action08',
    code: 'Activite03',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action09',
    code: 'Activite04',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    action: 'Action010',
    code: 'Activite05',
    libelle: 'Appui informatique',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  }
];


@Component({
  selector: 'app-maj-emplois-effectifs',
  imports: [
    MaterialModule,
    DoubleSpaceNumberPipe,
    FormsModule,
    MatPaginatorModule,
    IconModule
  ],
  templateUrl: './maj-emplois-effectifs.component.html',
  styleUrl: './maj-emplois-effectifs.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MajEmploisEffectifsComponent {
  selectedProgramme: ProgrammeDto | null = null;
  exerciceCourant: number = 0;
  projetBudgetLib: string = '';
  projetBudgetCode: string;
  parametreRecherche: ParametreRechercheDto = {};
  totalElements: number = 0;
  // totaux: Record<string, number>;

  constructor(
    private majEmploisEffectifsService: MajEmploisEffectifsService,
    private globalService: GlobalService,
  ) { }

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSourceChapitre.paginator = paginator;
    }
  }

  @ViewChild('sortChapitre')
  set sortChapitre(sort: MatSort) {
    if (sort) {
      this.dataSourceChapitre.sort = sort;

      this.dataSourceChapitre.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'code':
            return Number(item.chapCode); // tri numérique correct

          case 'libelle':
            return item.chapLib?.toLowerCase() || ''; // tri texte

          case 'effectifsN':
          case 'agentsSolde':
          case 'contractuels':
          case 'total':
          case 'ecart':
          case 'dotation':
            return Number(item[property as keyof ChapitreEffectifsDto]) || 0;

          default:
            return '';
        }
      };

    }
  }

  listeChapitre = signal<ChapitreEffectifsDto[]>([]);
  dataSourceChapitre = new MatTableDataSource<ChapitreEffectifsDto>([]);

  totaux = computed(() =>
    this.globalService.calculerSommes(
      this.listeChapitre(),
      [
        'effectif0',
        'nombreAgent',
        'nombreContractuel',
        'montant'
      ]
    )

  );
  // listeChapitre = new MatTableDataSource<ChapitreEffectifsDto>([]);
  listeEmplois = new MatTableDataSource(EMPLOI_DATA);
  listeActions = new MatTableDataSource(ACTION_DATA);
  listeActivites = new MatTableDataSource(ACTIVITE_DATA);
  listeAgent = new MatTableDataSource(AGENT_DATA);

  choix: string = "chapitre"; // valeur par défaut
  textRechercher: string = '';


  columnsChapitreToDisplay = ['code', 'libelle', 'effectifsN', 'agentsSolde', 'contractuels', 'total', 'ecart', 'dotation'];
  columnsEmploiToDisplay = ['code', 'libelle', 'effectifsN', 'agentsSolde', 'contractuels', 'total', 'ecart', 'dotation'];
  columnsActionToDisplay = ['code', 'libelle', 'effectifsN', 'agentsSolde', 'contractuels', 'total', 'ecart', 'dotation'];
  columnsActiviteToDisplay = ['action', 'code', 'libelle', 'effectifsN', 'agentsSolde', 'contractuels', 'total', 'ecart', 'dotation'];

  columnsChapitreToDisplayWithExpand = [...this.columnsChapitreToDisplay, 'expand'];
  columnsEmploiToDisplayWithExpand = [...this.columnsEmploiToDisplay, 'expand'];
  columnsActionToDisplayWithExpand = [...this.columnsActionToDisplay, 'expand'];
  columnsActiviteToDisplayWithExpand = [...this.columnsActiviteToDisplay, 'expand'];

  expandedElementChapitre: objetChapitre | null = null;
  expandedElementEmploi: objetType | null = null;
  expandedElementAction: objetType | null = null;
  expandedElementActivite: objetType | null = null;


  filtreListe(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    switch (this.choix) {
      case "chapitre":
        this.dataSourceChapitre.filter = filterValue.trim().toLowerCase();
        break;

      case "emploi":
        this.listeEmplois.filter = filterValue.trim().toLowerCase();
        break;

      case "action":
        this.listeActions.filter = filterValue.trim().toLowerCase();
        break;

      default:
        this.listeActivites.filter = filterValue.trim().toLowerCase();
        break;
    }

  }

  onChoixChange() {
    // vider l'input
    this.textRechercher = '';
    // vider le filtre MatTable
    this.dataSourceChapitre.filter = '';
    this.listeEmplois.filter = '';
    this.listeActions.filter = '';
    this.listeActivites.filter = '';
    if (this.choix === 'chapitre') {
      this.getChapitres();
    }
  }

  listeProgrammes: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.globalService.getExerciceCourant().subscribe({
      next: (valeur) => {
        this.exerciceCourant = valeur;
        this.parametreRecherche.exeCode = valeur - 1 + '_1';
        console.log('ExeCode ', this.parametreRecherche.exeCode);
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
        this.dataSourceChapitre.data = data;
        this.listeChapitre.set(data);
        this.totalElements = data.length;
        console.log('CHAPITRE DATA:', this.totalElements, this.dataSourceChapitre.data);

        // this.totaux = this.calculTotaux(this.dataSourceChapitre.data);
      },
      error: (err) => { console.error('Erreur chargement chapitre data:', err); }
    });
  }

  getEmplois() {
    if (!this.selectedProgramme) {
      console.warn('Aucun programme sélectionné');
      return;
    }
    this.majEmploisEffectifsService.getChapitres(this.parametreRecherche).subscribe({
      next: (data) => {
        this.listeChapitre.set(data);
        this.totalElements = data.length;
        console.log('CHAPITRE DATA:', this.totalElements, this.listeChapitre.set(data));
      },
      error: (err) => { console.error('Erreur chargement chapitre data:', err); }
    });
  }

  //   getAgents() {
  //   this.loading = true;
  //   this.dotationsTraitementsService.getAgents(this.parametreRecherche).subscribe({
  //     next: (data) => {
  //       this.listeAgents = data;
  //       this.parametreRecherche.exeCode = this.exerciceCourant.toString() + '_1';
  //       console.log('AGENTS:', this.listeAgents);
  //       // this.toastr.success('Blogs chargés avec succès');
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       // this.toastr.error('Erreur lors du chargement des blogs');
  //       this.loading = false;
  //     },
  //   });
  // }


  calculTotaux(chapitres: ChapitreEffectifsDto[]) {
    return this.globalService.calculerSommes(chapitres, [
      'effectif0',
      'nombreAgent',
      'nombreContractuel',
      'montant'
    ]);

  }





}


export interface objetChapitre {
  code: string;
  libelle: string;
  effectifsN: number;
  agentsSolde: number;
  contractuels: number;
  total: number;
  ecart: number;
  dotation: number;
}

export interface objetAgent {
  chapitre: string;
  emploi: string;
  matricule: string;
  nom: string;
  age: number;
  statut: string;
  action: string;
  activite: string;
  effectifs: number;
  budgetPrevu: number;
}

export interface objetType {
  action: string;
  code: string;
  libelle: string;
  effectifsN: number;
  agentsSolde: number;
  contractuels: number;
  total: number;
  ecart: number;
  dotation: number;
}