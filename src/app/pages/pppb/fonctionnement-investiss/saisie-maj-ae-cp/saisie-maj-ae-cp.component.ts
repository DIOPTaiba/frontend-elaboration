import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {
  trigger, state, style, transition, animate
} from '@angular/animations';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';





interface BudgetRow {
  code: string;
  libelle: string;
  ae: number;
  srcAe: number;
  cp: number;
  srcCp: number;
}
export const ELEMENT_DATA = [
  {
    action: 'Infrastructure',
    activite: 'Assainissement urbain',
    ligne: 'L4',
    aeLfi: 180000,
    aeAnd: 175000,
   
    aePlf: 185000,
   
    cpLfi: 120000,
    cpPlf: 125000,
    ecartAe: 5000,
    ecartCp: 5000
  },
  {
    action: 'Infrastructure',
    activite: 'Construction école',
    ligne: 'code - libelle de la ligne ',
    aeLfi: 120000,
    aeAnd: 150000,
    
    aePlf: 130000,
   
    cpLfi: 80000,
    cpPlf: 90000,
    ecartAe: 10000,
    ecartCp: 5000
  },
  {
    action: 'Transport',
    activite: 'Route nationale',
    ligne: 'L2',
    aeLfi: 300000,
    aeAnd: 280000,
   
    aePlf: 310000,
   
    cpLfi: 200000,
    cpPlf: 195000,
    ecartAe: -20000,
    ecartCp: -5000
  },
  {
    action: 'Santé',
    activite: ' Hôpital régional',
    ligne: 'L3',
    aeLfi: 500000,
    aeAnd: 520000,
   
    aePlf: 510000,
   
    cpLfi: 350000,
    cpPlf: 360000,
    ecartAe: -10000,
    ecartCp: 10000
  }
];
@Component({
  selector: 'app-saisie-maj-ae-cp',
  imports: [MaterialModule, DecimalPipe, MatPaginatorModule, MatCardModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatDividerModule],
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

export class SaisieMajAeCpComponent {
  selectedAction = '';
  selectedActivite = '';
  selectedLigne = '';
  templates: string[] = [
    'Depenses de personnels',
    '2026',
    'Dons Exterieurs',
    'Electronics',
  ];

  displayedColumns: string[] = [
    'code',
    'libelle',
    'ae',
    'srcAe',
    'cp',
    'srcCp',
    'expand'
  ];

 subdataSource = new MatTableDataSource(ELEMENT_DATA);

  dataSource = new MatTableDataSource<BudgetRow>([
    { code: '001', libelle: 'Projet A Projet A Projet A Projet AProjet AProjet ', ae: 100000, srcAe: 20000, cp: 80000, srcCp: 15000 },
    { code: '002', libelle: 'Projet B', ae: 200000, srcAe: 50000, cp: 150000, srcCp: 30000 },
    { code: '003', libelle: 'Projet C', ae: 300000, srcAe: 60000, cp: 200000, srcCp: 40000 },
    { code: '004', libelle: 'Projet D', ae: 120000, srcAe: 25000, cp: 90000, srcCp: 20000 },
    { code: '005', libelle: 'Projet E', ae: 500000, srcAe: 100000, cp: 400000, srcCp: 80000 },
    { code: '001', libelle: 'Projet A Projet A Projet A Projet AProjet AProjet ', ae: 100000, srcAe: 20000, cp: 80000, srcCp: 15000 },
    { code: '002', libelle: 'Projet B', ae: 200000, srcAe: 50000, cp: 150000, srcCp: 30000 },
    { code: '003', libelle: 'Projet C', ae: 300000, srcAe: 60000, cp: 200000, srcCp: 40000 },
    { code: '004', libelle: 'Projet D', ae: 120000, srcAe: 25000, cp: 90000, srcCp: 20000 },
    { code: '005', libelle: 'Projet E', ae: 500000, srcAe: 100000, cp: 400000, srcCp: 80000 },
    { code: '001', libelle: 'Projet A Projet A Projet A Projet AProjet AProjet ', ae: 100000, srcAe: 20000, cp: 80000, srcCp: 15000 },
    { code: '002', libelle: 'Projet B', ae: 200000, srcAe: 50000, cp: 150000, srcCp: 30000 },
    { code: '003', libelle: 'Projet C', ae: 300000, srcAe: 60000, cp: 200000, srcCp: 40000 },
    { code: '004', libelle: 'Projet D', ae: 120000, srcAe: 25000, cp: 90000, srcCp: 20000 },
    { code: '005', libelle: 'Projet E', ae: 500000, srcAe: 100000, cp: 400000, srcCp: 80000 },
    { code: '001', libelle: 'Projet A Projet A Projet A Projet AProjet AProjet ', ae: 100000, srcAe: 20000, cp: 80000, srcCp: 15000 },
    { code: '002', libelle: 'Projet B', ae: 200000, srcAe: 50000, cp: 150000, srcCp: 30000 },
    { code: '003', libelle: 'Projet C', ae: 300000, srcAe: 60000, cp: 200000, srcCp: 40000 },
    { code: '004', libelle: 'Projet D', ae: 120000, srcAe: 25000, cp: 90000, srcCp: 20000 },
    { code: '005', libelle: 'Projet E', ae: 500000, srcAe: 100000, cp: 400000, srcCp: 80000 },

  ]);

  // ===================== COLONNES =====================
  subDisplayedColumns: string[] = [
    'action',
    'activite',
    'ligne',
    'aeLfi',
    'aeAnd',
   
    'aePlf',
   
    'cpLfi',
    'cpPlf',
    'ecartAe',
    'ecartCp'
  ];

  // ===================== DATA =====================
// ===================== DATA TABLE MULTI-HEADERS =====================
dataSource2: any[] = [
  {
    action: '123456',
    activite: '12345678',
    ligne: '',

    ej: 3500000000,

    cp2027_ej: 2500000000,
    cp2028_ej: 1000000000,
    cp2029_ej: 0,
    cpAutres_ej: 0,
    restes_ej: 0,

    rappelAE: 98000000000,
    montantAE: 99900000000,
    ecartAE: 1900000000,
    ecartAEpct: 1.94,

    cp2027_ae: 100000000,
    cp2028_ae: 400000000,
    cp2029_ae: 300000000,
    cpAutres_ae: 800000000,
    restes_ae: 0,

    rappelCP: 120000000,
    montantCP: 102500000,
    ecartCP: -17500000,
    ecartCPpct: -14.58
  },
   {
    action: '123456',
    activite: '12345678',
    ligne: '',

    ej: 3500000000,

    cp2027_ej: 2500000000,
    cp2028_ej: 1000000000,
    cp2029_ej: 0,
    cpAutres_ej: 0,
    restes_ej: 0,

    rappelAE: 98000000000,
    montantAE: 99900000000,
    ecartAE: 1900000000,
    ecartAEpct: 1.94,

    cp2027_ae: 100000000,
    cp2028_ae: 400000000,
    cp2029_ae: 300000000,
    cpAutres_ae: 800000000,
    restes_ae: 0,

    rappelCP: 120000000,
    montantCP: 102500000,
    ecartCP: -17500000,
    ecartCPpct: -14.58
  }
];

  expandedElement: any | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  
  suSselectedRow: any = null;

  suSselectRow(row: any) {
    this.suSselectedRow = row;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggle(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // ===================== CALCUL TOTAL SECURISE =====================
  getTotal(field: 'ae' | 'srcAe' | 'cp' | 'srcCp'): number {
    return this.dataSource.data.reduce((total, element) => {
      return total + element[field];
    }, 0);
  }

  openEcheancier1(element: any) {
    console.log('Échéancier 1 :', element);
    // ouvrir modal, drawer ou navigation
  }

  openEcheancier2(element: any) {
    console.log('Échéancier 2 :', element);
    // ouvrir modal, drawer ou navigation
  }
  ngOnInit() {
 if (this.subdataSource.data && this.subdataSource.data.length > 0) {
  this.suSselectedRow = this.subdataSource.data[0];
}
}
getSubTotal(field: string): number {
  return this.subdataSource.data.reduce((total, element: any) => {
    return total + (element[field] || 0);
  }, 0);
}



// ===================== TOTAL TABLE HTML =====================
getTotal2(field: string): number {
  return this.dataSource2.reduce((sum, item) => {
    const val = item[field];
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);
}

}
