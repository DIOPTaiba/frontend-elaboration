import { Routes } from '@angular/router';

// dashboards
import { MajEmploisEffectifSectionComponent } from './maj-emplois-effectif-section/maj-emplois-effectif-section.component';
import { MajEmploisEffectifProgrammeComponent } from './maj-emplois-effectif-programme/maj-emplois-effectif-programme.component';
import { TraitementAgentComponent } from './dotation-traitement-agents/traitement-agents/traitement-agent.component';

export const DepensesPersonnellesEmploisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'majEmploisEffectifSection',
        component: MajEmploisEffectifSectionComponent,
        data: {
          title: 'Maj Emplois et Effectif Section',
          urls: [
            { title: 'Dashboard ccc', url: '/dashboards/dashboard1' },
            { title: 'Badge dddd' },
          ],
        },
      },
      {
        path: 'dotation-traitements-agents',
        component: TraitementAgentComponent,
        data: {
          title: 'dotation-traitements-agents',
          breadcrumb: false,
        },
      },
      {
        path: 'majEmploisEffectifProgramme',
        component: MajEmploisEffectifProgrammeComponent,
        data: {
          title: 'Maj Emplois et Effectif Programme',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Badge' },
          ],
        },
      },
    ],
  },
];
