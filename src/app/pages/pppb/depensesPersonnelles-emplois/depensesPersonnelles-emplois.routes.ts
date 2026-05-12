import { Routes } from '@angular/router';

// dashboards
import { MajEmploisEffectifProgrammeComponent } from './maj-emplois-effectif-programme/maj-emplois-effectif-programme.component';
import { TraitementAgentComponent } from './dotation-traitement-agents/traitement-agents/traitement-agent.component';
import { MajEmploisEffectifsComponent } from './maj-emplois-effectifs/maj-emplois-effectifs.component';

export const DepensesPersonnellesEmploisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'maj-emplois-effectifs',
        component: MajEmploisEffectifsComponent,
        data: {
          title: 'Maj Emplois et Effectifs',
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
