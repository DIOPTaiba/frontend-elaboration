import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {
  trigger, state, style, transition, animate
} from '@angular/animations';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-saisie-maj-ae-cp',
  imports: [MaterialModule, DecimalPipe, MatPaginatorModule],
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

  dataSource = new MatTableDataSource([
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

  expandedElement: any | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);


  toggle(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
