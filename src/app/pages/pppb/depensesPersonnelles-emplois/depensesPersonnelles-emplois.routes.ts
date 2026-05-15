import { Routes } from '@angular/router';

// dashboards
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
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Badge' },
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
    ],
  },
];
