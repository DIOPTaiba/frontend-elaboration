import { Routes } from '@angular/router';

import { SaisieMajAeCpComponent } from './saisie-maj-ae-cp/saisie-maj-ae-cp.component';

export const FonctionnementInvestissementsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'saisieMajAeCp',
        component: SaisieMajAeCpComponent,
        data: {
          title: 'saisieMajAeCp',
          breadcrumb: false,
        },
      }
      
    ],
  },
];
