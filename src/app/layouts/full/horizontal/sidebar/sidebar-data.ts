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
    children: [
      {
        displayName: 'Homepage',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/homepage',
      },
      {
        displayName: 'About Us',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/about',
      },
      {
        displayName: 'Blog',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/blog',
      },
      {
        displayName: 'Blog Details',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/blog-details',
      },
      {
        displayName: 'Contact Us',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/contact',
      },
      {
        displayName: 'Portfolio',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/portfolio',
      },
      {
        displayName: 'Pricing',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'front-pages/pricing',
      }
    ],
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
    ddType: 'mega-menu',
    children: [
      {
        displayName: 'Badge',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/badge',
      },
      {
        displayName: 'Expansion Panel',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/expansion',
      },
      {
        displayName: 'Chips',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/chips',
      },
      {
        displayName: 'Dialog',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/dialog',
      },
      {
        displayName: 'Lists',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/lists',
      },
      {
        displayName: 'Divider',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/divider',
      },
      {
        displayName: 'Menu',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/menu',
      },
      {
        displayName: 'Paginator',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/paginator',
      },
      {
        displayName: 'Progress Bar',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/progress',
      },
      {
        displayName: 'Progress Spinner',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/progress-spinner',
      },
      {
        displayName: 'Ripples',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/ripples',
      },
      {
        displayName: 'Slide Toggle',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/slide-toggle',
      },
      {
        displayName: 'Slider',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/slider',
      },
      {
        displayName: 'Snackbar',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/snackbar',
      },
      {
        displayName: 'Tabs',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/tabs',
      },
      {
        displayName: 'Toolbar',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/toolbar',
      },
      {
        displayName: 'Tooltips',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/tooltips',
      },
    ],
  },
  {
    displayName: 'Fonctionnement et Investissement',
    iconName: 'solar:document-text-line-duotone',
    route: '',
    children: [
      {
        displayName: 'Treeview',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'theme-pages/treeview',
      },
      {
        displayName: 'Pricing',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'theme-pages/pricing',
      },
      {
        displayName: 'Account Setting',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'theme-pages/account-setting',
      },
      {
        displayName: 'FAQ',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'theme-pages/faq',
      },
      {
        displayName: 'Landingpage',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'landingpage',
      },
      {
        displayName: 'Widgets',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'widgets',
        children: [
          {
            displayName: 'Cards',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'widgets/cards',
          },
          {
            displayName: 'Banners',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'widgets/banners',
          },
          {
            displayName: 'Charts',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: 'widgets/charts',
          },
        ],
      },
      {
        displayName: 'Charts',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'charts',
        children: [
          {
            displayName: 'Line',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/charts/line',
          },
          {
            displayName: 'Gredient',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/charts/gredient',
          },
          {
            displayName: 'Area',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/charts/area',
          },
          {
            displayName: 'Candlestick',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/charts/candlestick',
          },
          {
            displayName: 'Column',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/charts/column',
          },
          {
            displayName: 'Doughnut & Pie',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/charts/doughnut-pie',
          },
          {
            displayName: 'Radialbar & Radar',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/charts/radial-radar',
          },
        ],
      },
      {
        displayName: 'Auth',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/',
        children: [
          {
            displayName: 'Login',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/authentication',
            children: [
              {
                displayName: 'Login 1',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/login',
              },
              {
                displayName: 'Boxed Login',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/boxed-login',
              },
            ],
          },
          {
            displayName: 'Register',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/authentication',
            children: [
              {
                displayName: 'Login 1',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/side-register',
              },
              {
                displayName: 'Boxed Login',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/boxed-register',
              },
            ],
          },
          {
            displayName: 'Forgot Password',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/authentication',
            children: [
              {
                displayName: 'Side Forgot Password',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/side-forgot-pwd',
              },
              {
                displayName: 'Boxed Forgot Password',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/boxed-forgot-pwd',
              },
            ],
          },
          {
            displayName: 'Two Steps',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/authentication',
            children: [
              {
                displayName: 'Side Two Steps',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/side-two-steps',
              },
              {
                displayName: 'Boxed Two Steps',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/authentication/boxed-two-steps',
              },
            ],
          },
          {
            displayName: 'Error',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/authentication/error',
          },
          {
            displayName: 'Maintenance',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/authentication/maintenance',
          },
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
