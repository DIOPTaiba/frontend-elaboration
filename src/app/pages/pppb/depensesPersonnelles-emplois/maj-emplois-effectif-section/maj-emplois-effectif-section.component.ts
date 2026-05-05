import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IconModule } from 'src/app/icon/icon.module';
import { MatSort } from '@angular/material/sort';

const CHAPITRE_DATA: objetChapitre[] = [
  {
    code: '25025332',
    libelle: 'Direction de la programmation budgétaire',
    effectifsN: 200,
    agentsSolde: 250,
    contractuels: 100,
    total: 350,
    ecart: 150,
    dotation: 100000
  },
  {
    code: '25025333',
    libelle: 'Direction de la Solde',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    code: '25025331',
    libelle: 'Direction des Systèmes d’information',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    code: '25025330',
    libelle: 'Direction du Contrôle budgétaire',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    code: '2502533',
    libelle: 'Direction des Pensions',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  {
    code: '25025330',
    libelle: 'Direction de la programmation budgétaire',
    effectifsN: 100,
    agentsSolde: 100,
    contractuels: 100,
    total: 100,
    ecart: 100,
    dotation: 100
  },
  // {
  //   code: '25025331',
  //   libelle: 'Direction de la Solde',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025332',
  //   libelle: 'Direction des Systèmes d’information',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025333',
  //   libelle: 'Direction du Contrôle budgétaire',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '2502533',
  //   libelle: 'Direction des Pensions',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025330',
  //   libelle: 'Direction de la programmation budgétaire',
  //   effectifsN: 200,
  //   agentsSolde: 250,
  //   contractuels: 100,
  //   total: 350,
  //   ecart: 150,
  //   dotation: 525000550
  // },
  // {
  //   code: '25025331',
  //   libelle: 'Direction de la Solde',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025332',
  //   libelle: 'Direction des Systèmes d’information',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025333',
  //   libelle: 'Direction du Contrôle budgétaire',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '2502533',
  //   libelle: 'Direction des Pensions',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025330',
  //   libelle: 'Direction de la programmation budgétaire',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025331',
  //   libelle: 'Direction de la Solde',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025332',
  //   libelle: 'Direction des Systèmes d’information',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '25025333',
  //   libelle: 'Direction du Contrôle budgétaire',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
  // {
  //   code: '2502533',
  //   libelle: 'Direction des Pensions',
  //   effectifsN: 100,
  //   agentsSolde: 100,
  //   contractuels: 100,
  //   total: 100,
  //   ecart: 100,
  //   dotation: 100
  // },
];
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
  },
  {
    chapitre: 'Direction SI DGB',
    emploi: 'Ing. Informaticien',
    matricule: '123455',
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
    matricule: '123456',
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
    matricule: '1234567',
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
    matricule: '123458',
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
    matricule: '123459',
    nom: 'xxxxx yyy',
    age: 0,
    statut: 'agent',
    action: 'action',
    activite: 'activité',
    effectifs: 25,
    budgetPrevu: 25000000,
  },
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
  selector: 'app-maj-emplois-effectif-section',
  imports: [
    MaterialModule,
    DecimalPipe,
    FormsModule,
    MatPaginatorModule,
    IconModule
  ],
  templateUrl: './maj-emplois-effectif-section.component.html',
  styleUrl: './maj-emplois-effectif-section.component.scss',
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
export class MajEmploisEffectifSectionComponent {

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.listeChapitre.paginator = paginator;
    }
  }

  @ViewChild('sortChapitre')
  set sortChapitre(sort: MatSort) {
    if (sort) {
      this.listeChapitre.sort = sort;

      this.listeChapitre.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'code':
            return Number(item.code); // tri numérique correct

          case 'libelle':
            return item.libelle?.toLowerCase() || ''; // tri texte

          case 'effectifsN':
          case 'agentsSolde':
          case 'contractuels':
          case 'total':
          case 'ecart':
          case 'dotation':
            return Number(item[property as keyof objetChapitre]) || 0;

          default:
            return '';
        }
      };

    }
  }


  listeChapitre = new MatTableDataSource<objetChapitre>(CHAPITRE_DATA);
  listeEmplois = new MatTableDataSource(EMPLOI_DATA);
  listeActions = new MatTableDataSource(ACTION_DATA);
  listeActivites = new MatTableDataSource(ACTIVITE_DATA);
  listeAgent = new MatTableDataSource(AGENT_DATA);

  choix: string = "chapitre"; // valeur par défaut
  textRechercher: string = '';

  // listeChapitre = CHAPITRE_DATA;
  // listeAgent = AGENT_DATA;
  // listeEmplois = EMPLOI_DATA;
  // listeActions = ACTION_DATA;
  // listeActivites = ACTIVITE_DATA;

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
        this.listeChapitre.filter = filterValue.trim().toLowerCase();
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
    this.listeChapitre.filter = '';
    this.listeEmplois.filter = '';
    this.listeActions.filter = '';
    this.listeActivites.filter = '';
  }

  constructor() { }

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