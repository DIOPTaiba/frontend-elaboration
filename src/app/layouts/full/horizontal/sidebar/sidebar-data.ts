import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Tableau de bord',
    iconName: 'solar:chart-line-duotone',
    route: 'dashboards/dashboard1',
    // children: [
    //   {
    //     displayName: 'Dashboard 1',
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'dashboards/dashboard1',
    //   },
    //   {
    //     displayName: 'Dashboard 2',
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'dashboards/dashboard2',
    //   },
    //   {
    //     displayName: 'Dashboard 3',
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'dashboards/dashboard3',
    //   },
    // ],
  },
  {
    displayName: 'Paramètres dossiers',
    iconName: 'solar:home-angle-line-duotone',
    route: 'front-pages',
    // children: [
    //   {
    //     displayName: 'Homepage',
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'front-pages/homepage',
    //   },
    // ],
  },
  {
    displayName: 'Consultation enveloppes',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: 'apps',
    // ddType: 'two-column',
    children: [
      {
        displayName: 'Enveloppe de la section',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'apps/chat',
      },
      {
        displayName: 'Liste enveloppe programmes',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'apps/calendar',
      },
      {
        displayName: 'Enveloppe d\'un programme',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'apps/email/inbox',
      },
      {
        displayName: 'Suivi répartition enveloppes',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'apps/contacts',
      },
      // {
      //   displayName: 'Courses',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/courses',
      // },
      // {
      //   displayName: 'Employee',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/employee',
      // },
      // {
      //   displayName: 'Notes',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/notes',
      // },
      // {
      //   displayName: 'Tickets',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/tickets',
      // },
      // {
      //   displayName: 'Invoice',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/invoice',
      // },
      // {
      //   displayName: 'ToDo',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/todo',
      // },
      // {
      //   displayName: 'Kanban',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/kanban',
      // },
      // {
      //   displayName: 'Blog',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/blog',
      //   children: [
      //     {
      //       displayName: 'Post',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/blog/post',
      //     },
      //     {
      //       displayName: 'Detail',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route:
      //         'apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
      //     },
      //   ],
      // },
      // {
      //   displayName: 'User Profile',
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'apps/profile-details',
      //   children: [
      //     {
      //       displayName: 'Profile',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/profile-details/profile',
      //     },
      //     {
      //       displayName: 'Followers',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/profile-details/followers',
      //     },
      //     {
      //       displayName: 'Friends',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/profile-details/friends',
      //     },
      //     {
      //       displayName: 'Gellary',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/profile-details/gallery',
      //     },
      //   ],
      // },
      // {
      //   displayName: 'Ecommerce',
      //   iconName: 'solar:cart-5-line-duotone',
      //   route: 'apps/product',
      //   children: [
      //     {
      //       displayName: 'Product List',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/product/product-list',
      //     },
      //     {
      //       displayName: 'Add Product',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/product/add-product',
      //     },
      //     {
      //       displayName: 'Edit Product',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/product/edit-product',
      //     },
      //     {
      //       displayName: 'Shop',
      //       iconName: 'solar:round-alt-arrow-right-line-duotone',
      //       route: 'apps/product/shop',
      //     },
      //   ],
      // },
    ],
  },
  {
    displayName: 'Dépenses de personnel et Emplois',
    iconName: 'solar:filters-line-duotone',
    route: 'ui-components',
    children: [
      {
        displayName: 'Mise à jour Emplois et effectifs de la Section',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/badge',
      },
      {
        displayName: 'Mise à jour Emplois et effectifs du Programme',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/expansion',
        children: [
          {
            displayName: 'Affectation agents solde',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'widgets',
            children: [
              {
                displayName: 'Affectation agents par Programme',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/cards',
              },
              {
                displayName: 'Affectation agents par Chapitre',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
            ],
          },
          {
            displayName: 'Consultation crédits de personnel',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'charts',
          },
        ],
      },
      {
        displayName: 'Dotation et traitement agents',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/chips',
        children: [
          {
            displayName: 'Traitements collectifs',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'widgets/cards',
          },
          {
            displayName: 'Traitement individuel',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'widgets/banners',
          },
          {
            displayName: 'Nouveaux traitements',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'widgets/banners',
          },
        ],
      },
      {
        displayName: 'Recherche un agent',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/dialog',
      },
      {
        displayName: 'Editions - Crédits et emplois',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/lists',
        children: [
              {
                displayName: 'Ministère / Institution',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/cards',
              },
              {
                displayName: 'Programme',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
              {
                displayName: 'Chapitre',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
            ],
      },
      {
        displayName: 'Editions Tableaux nominatifs',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/divider',
      },
    ],
  },
  {
    displayName: 'Fonctionnement et Investissement',
    iconName: 'solar:document-text-line-duotone',
    route: '',
    children: [
      {
        displayName: 'Saisis / Mises à jour AE/CP par chapitre',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'theme-pages/treeview',
      },
      {
        displayName: 'Consultation dotations AE/CP',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'theme-pages/pricing',
        children: [
              {
                displayName: 'Section',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/cards',
              },
              {
                displayName: 'Programme',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
              {
                displayName: 'Acion',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
              {
                displayName: 'Activité / Projet',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
            ],
      },
      {
        displayName: 'Edition AE/CP inscrits',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'theme-pages/account-setting',
        children: [
              {
                displayName: 'Section',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/cards',
              },
              {
                displayName: 'Programme',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
              {
                displayName: 'Acion',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
              {
                displayName: 'Activité / Projet',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',
              },
              {
                displayName: 'Chapitre',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'widgets/banners',}
            ],
      },
    ],
  },
  {
    displayName: 'Cadre de mesure performance',
    iconName: 'solar:folder-2-line-duotone',
    route: 'forms',
    children: [
      {
        displayName: 'DPPD',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'forms/forms-elements',
        children: [
          {
            displayName: 'Objectifs sectoriels (ministériels)',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'forms/forms-elements/autocomplete',
          },
          {
            displayName: 'Objectif global de programme',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'forms/forms-elements/button',
          },
          {
            displayName: 'Indicateurs d\'impacts associés',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'forms/forms-elements/checkbox',
            children: [
              {
                displayName: 'Objectifs sectoriels (ministériels)',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'forms/forms-elements/autocomplete',
              },
              {
                displayName: 'Objectif global de programme',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'forms/forms-elements/button',
              }
            ],
          },
        ],
      },
      {
        displayName: 'PAP programme',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/forms/file-upload',
        children: [
          {
            displayName: 'Objectifs spécifiques',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'forms/forms-elements/autocomplete',
          },
          {
            displayName: 'Indicateurs de performance',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'forms/forms-elements/button',
          },
          {
            displayName: 'Résultats attendus',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'forms/forms-elements/checkbox',
          },
        ]
      },
    ],
  },
  {
    displayName: 'Plans d\'engagement',
    iconName: 'solar:full-screen-square-line-duotone',
    route: 'tables',
    // ddType: 'two-column',
    children: [
      {
        displayName: 'Saisie / Mise à jour',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'tables/basic-table',
      },
      {
        displayName: 'Edition / Transmission',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'tables/dynamic-table',
        children: [
          {
            displayName: 'PE de Ministère/Institution',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/basic-table',
          },
          {
            displayName: 'PE de Programme',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/dynamic-table',
          },
          {
            displayName: 'PE d\'Action',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/expand-table',
          },
          {
            displayName: 'PE d\'Activité',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/filterable-table',
          },
          {
            displayName: 'PE de service dépensier - Chapitre',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/expand-table',
          },
        ]
      },
      {
        displayName: 'Réception',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'tables/expand-table',
        children: [
          {
            displayName: 'PE de Programmes',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/dynamic-table',
          },
          {
            displayName: 'PE d\'Actions de Programme',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/expand-table',
          },
          {
            displayName: 'PE d\'Activité',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/filterable-table',
          },
          {
            displayName: 'PE de services dépensiers',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/expand-table',
          },
        ]
      },
      {
        displayName: 'Validation',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'tables/filterable-table',
        children: [
          {
            displayName: 'PE de Programmes',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/dynamic-table',
          },
          {
            displayName: 'PE d\'Actions de Programme',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/expand-table',
          },
          {
            displayName: 'PE d\'Activité',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/filterable-table',
          },
          {
            displayName: 'PE de services dépensiers',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'tables/expand-table',
          },
        ]
      },
    ],
  },
  {
    displayName: 'Editions et annexes',
    iconName: 'solar:home-angle-line-duotone',
    route: 'front-pages',
    children: [
      {
        displayName: 'Budget Ministère/Institution',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/homepage',
      },
      {
        displayName: 'Budget Programme',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/about',
      },
      {
        displayName: 'PAP Programme',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/blog',
      }
    ],
  },
];
