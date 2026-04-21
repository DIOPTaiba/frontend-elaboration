import { Routes } from '@angular/router';

// dashboards
import { MajEmploisEffectifSectionComponent } from './maj-emplois-effectif-section/maj-emplois-effectif-section.component';
import { MajEmploisEffectifProgrammeComponent } from './maj-emplois-effectif-programme/maj-emplois-effectif-programme.component';

export const DepensesPersonnellesEmploisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'majEmploisEffectifSection',
        component: MajEmploisEffectifSectionComponent,
        data: {
          title: 'Maj Emplois et Effectif Section',
          breadcrumb: false,
        },
      },
      {
        path: 'majEmploisEffectifProgramme',
        component: MajEmploisEffectifProgrammeComponent,
        data: {
          title: 'Maj Emplois et Effectif Programme',
          breadcrumb: false,
        },
      },
    ],
  },
];
