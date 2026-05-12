import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  // {
  //   navCap: 'Dashboards',
  // },
  {
    displayName: 'Tableau de bord',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboards/dashboard1',
  },
  // {
  //   displayName: 'Dashboard 2',
  //   iconName: 'solar:chart-line-duotone',
  //   route: '/dashboards/dashboard2',
  // },
  // {
  //   displayName: 'Dashboard 3',
  //   iconName: 'solar:screencast-2-line-duotone',
  //   route: '/dashboards/dashboard3',
  // },
  // {
  //   displayName: 'Front Pages',
  //   iconName: 'solar:home-angle-line-duotone',
  //   route: 'front-pages',
  //   children: [
  //     {
  //       displayName: 'Homepage',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'front-pages/homepage',
  //     },
  //     {
  //       displayName: 'About Us',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'front-pages/about',
  //     },
  //     {
  //       displayName: 'Blog',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'front-pages/blog',
  //     },
  //     {
  //       displayName: 'Blog Details',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'front-pages/blog-details',
  //     },
  //     {
  //       displayName: 'Contact Us',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'front-pages/contact',
  //     },
  //     {
  //       displayName: 'Portfolio',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'front-pages/portfolio',
  //     },
  //     {
  //       displayName: 'Pricing',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'front-pages/pricing',
  //     }
  //   ],
  // },
  // {
  //   divider: true,
  //   navCap: 'Paramètres dossiers',
  // },
  // {
  //   displayName: 'Chat',
  //   iconName: 'solar:chat-round-line-line-duotone',
  //   route: 'apps/chat',
  // },
  // {
  //   displayName: 'Calendar',
  //   iconName: 'solar:calendar-mark-line-duotone',
  //   route: 'apps/calendar',
  // },
  // {
  //   displayName: 'Email',
  //   iconName: 'solar:letter-line-duotone',
  //   route: 'apps/email/inbox',
  // },
  // {
  //   displayName: 'Kanban',
  //   iconName: 'solar:clapperboard-edit-line-duotone',
  //   route: 'apps/kanban',
  // },
  // {
  //   displayName: 'User Profile',
  //   iconName: 'solar:user-circle-line-duotone',
  //   route: 'apps/profile-details',
  //   chip: true,
  //   chipClass: 'b-1 border-primary text-primary',
  //   chipContent: 'New',
  //   children: [
  //     {
  //       displayName: 'Profile',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/profile-details/profile',
  //     },
  //     {
  //       displayName: 'Followers',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/profile-details/followers',
  //     },
  //     {
  //       displayName: 'Friends',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/profile-details/friends',
  //     },
  //     {
  //       displayName: 'Gellary',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/profile-details/gallery',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Ecommerce',
  //   iconName: 'solar:cart-5-line-duotone',
  //   route: 'apps/product',
  //   chip: true,
  //   chipClass: 'b-1 border-primary text-primary',
  //   chipContent: 'New',
  //   children: [
  //     {
  //       displayName: 'Product List',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'apps/product/product-list',
  //     },
  //     {
  //       displayName: 'Add Product',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'apps/product/add-product',
  //     },
  //     {
  //       displayName: 'Edit Product',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'apps/product/edit-product',
  //     },
  //     {
  //       displayName: 'Shop',
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       subItemIcon: true,
  //       route: 'apps/product/shop',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Contacts',
  //   iconName: 'solar:phone-line-duotone',
  //   route: 'apps/contacts',
  // },
  // {
  //   displayName: 'Courses',
  //   iconName: 'solar:book-bookmark-line-duotone',
  //   route: 'apps/courses',
  // },
  // {
  //   displayName: 'Employee',
  //   iconName: 'solar:user-id-line-duotone',
  //   route: 'apps/employee',
  // },
  // {
  //   displayName: 'Notes',
  //   iconName: 'solar:document-text-line-duotone',
  //   route: 'apps/notes',
  // },
  // {
  //   displayName: 'Tickets',
  //   iconName: 'solar:ticket-sale-line-duotone',
  //   route: 'apps/tickets',
  // },
  // {
  //   displayName: 'ContactsApp',
  //   iconName: 'solar:phone-line-duotone',
  //   route: 'apps/contact-list',
  // },
  // {
  //   displayName: 'Invoice',
  //   iconName: 'solar:bill-list-line-duotone',
  //   route: 'apps/invoice',
  //   children: [
  //     {
  //       displayName: 'List',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/invoice/list',
  //     },
  //     {
  //       displayName: 'Detail',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/invoice/viewInvoice/101',
  //     },
  //     {
  //       displayName: 'Create',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/invoice/addInvoice',
  //     },
  //     {
  //       displayName: 'Edit',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'apps/invoice/editinvoice/101',
  //     },
  //   ],
  // },
  {
    divider: true,
    navCap: 'Consultation enveloppes',
  },
  // {
  //   displayName: 'Enveloppe de la section',
  //   iconName: 'solar:lock-password-unlocked-line-duotone',
  //   route: 'apps/permission',
  // },
  // {
  //   displayName: 'Liste enveloppe programmes',
  //   iconName: 'solar:bill-line-duotone',
  //   route: 'theme-pages/treeview',
  // },
  {
    displayName: 'Enveloppe d\'un programme',
    iconName: 'solar:dollar-minimalistic-line-duotone',
    route: 'theme-pages/pricing',
  },
  // {
  //   displayName: 'Suivi répartition enveloppes',
  //   iconName: 'solar:accessibility-line-duotone',
  //   route: 'theme-pages/account-setting',
  // },
  {
    divider: true,
    navCap: 'Dépenses de personnel et Emplois',
  },
  {
    displayName: 'Mise à jour Emplois et effectifs',
    iconName: 'solar:upload-line-duotone',
    route: '/depensePersonnellesEmplois/maj-emplois-effectifs',
  },
  {
    displayName: 'Dotation et traitement agents',
    iconName: 'solar:upload-line-duotone',
    route: '/depensePersonnellesEmplois/dotation-traitements-agents',
  },
  // {
  //   displayName: 'Form elements',
  //   iconName: 'solar:password-minimalistic-input-line-duotone',
  //   route: 'forms/forms-elements',
  //   children: [
  //     // {
  //     //   displayName: 'Autocomplete',
  //     //    subItemIcon: true,
  //     //   iconName: 'solar:round-alt-arrow-right-line-duotone',
  //     //   route: 'forms/forms-elements/autocomplete',
  //     // },
  //     {
  //       displayName: 'Button',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'forms/forms-elements/button',
  //     },
  //     {
  //       displayName: 'Checkbox',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'forms/forms-elements/checkbox',
  //     },
  //     {
  //       displayName: 'Radio',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'forms/forms-elements/radio',
  //     },
  //     {
  //       displayName: 'Datepicker',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'forms/forms-elements/datepicker',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'File Upload',
  //   iconName: 'solar:upload-line-duotone',
  //   route: '/forms/file-upload',
  // },
  {
    displayName: 'Recherche d\'un agent',
    iconName: 'solar:file-text-line-duotone',
    route: '/forms/form-layouts',
  },
  {
    displayName: 'Editions - Crédits et emplois',
    iconName: 'solar:align-horizonta-spacing-line-duotone',
    route: '/forms/form-horizontal',
  },
  {
    displayName: 'Editions Tableaux nominatifs',
    iconName: 'solar:align-vertical-spacing-line-duotone',
    route: '/forms/form-vertical',
  },
  {
    divider: true,
    navCap: 'Fonctionnement et Investissement',
  },
  {
    displayName: 'Saisis / Mises à jour AE/CP',
    iconName: 'solar:tablet-line-duotone',
    route: 'fonctionnementInvestissements/saisieMajAeCp',
    // children: [
    //   {
    //     displayName: 'Dynamic Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/dynamic-table',
    //   },
    //   
    //   {
    //     displayName: 'Filterable Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/filterable-table',
    //   },
    //   {
    //     displayName: 'Footer Row Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/footer-row-table',
    //   },
    //   {
    //     displayName: 'HTTP Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/http-table',
    //   },
    //   {
    //     displayName: 'Mix Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/mix-table',
    //   },
    //   {
    //     displayName: 'Multi Header Footer',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/multi-header-footer-table',
    //   },
    //   {
    //     displayName: 'Pagination Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/pagination-table',
    //   },
    //   {
    //     displayName: 'Row Context Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/row-context-table',
    //   },
    //   {
    //     displayName: 'Selection Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/selection-table',
    //   },
    //   {
    //     displayName: 'Sortable Table',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/sortable-table',
    //   },
    //   {
    //     displayName: 'Sticky Column',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/sticky-column-table',
    //   },
    //   {
    //     displayName: 'Sticky Header Footer',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'tables/sticky-header-footer-table',
    //   },
    // ],
  },
  {
    displayName: 'Consultation dotations AE/CP',
    iconName: 'solar:database-line-duotone',
    route: '/datatable/kichen-sink',
  },
  // {
  //   displayName: 'Edition AE/CP inscrits',
  //   subItemIcon: true,
  //   iconName: 'solar:round-alt-arrow-right-line-duotone',
  //   route: 'tables/expand-table',
  // },
  {
    divider: true,
    navCap: 'Plans d\'engagement',
  },
  {
    displayName: 'Saisie / Mise à jour',
    iconName: 'solar:share-circle-line-duotone',
    route: 'ui-components/badge',
  },
  {
    displayName: 'Transmission',
    iconName: 'solar:round-alt-arrow-right-line-duotone',
    route: 'ui-components/expansion',
  },
  {
    displayName: 'Consultation / Edition',
    iconName: 'solar:round-alt-arrow-right-line-duotone',
    route: 'ui-components/chips',
  },
  // {
  //   displayName: 'Ui Components',
  //   iconName: 'solar:share-circle-line-duotone',
  //   route: 'ui-components',
  //   children: [
  //     {
  //       displayName: 'Badge',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/badge',
  //     },
  //     {
  //       displayName: 'Expansion Panel',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/expansion',
  //     },
  //     {
  //       displayName: 'Chips',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/chips',
  //     },
  //     {
  //       displayName: 'Dialog',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/dialog',
  //     },
  //     {
  //       displayName: 'Lists',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/lists',
  //     },
  //     {
  //       displayName: 'Divider',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/divider',
  //     },
  //     {
  //       displayName: 'Menu',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/menu',
  //     },
  //     {
  //       displayName: 'Paginator',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/paginator',
  //     },
  //     {
  //       displayName: 'Progress Bar',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/progress',
  //     },
  //     {
  //       displayName: 'Progress Spinner',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/progress-spinner',
  //     },
  //     {
  //       displayName: 'Ripples',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/ripples',
  //     },
  //     {
  //       displayName: 'Slide Toggle',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/slide-toggle',
  //     },
  //     {
  //       displayName: 'Slider',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/slider',
  //     },
  //     {
  //       displayName: 'Snackbar',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/snackbar',
  //     },
  //     {
  //       displayName: 'Tabs',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/tabs',
  //     },
  //     {
  //       displayName: 'Toolbar',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/toolbar',
  //     },
  //     {
  //       displayName: 'Tooltips',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'ui-components/tooltips',
  //     },
  //   ],
  // },
  // {
  //   divider: true,
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Login 1',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/login',
  //     },
  //     {
  //       displayName: 'Boxed Login',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/boxed-login',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Forgot Password',
  //   iconName: 'solar:password-outline',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Side Forgot Password',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/side-forgot-pwd',
  //     },
  //     {
  //       displayName: 'Boxed Forgot Password',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/boxed-forgot-pwd',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Two Steps',
  //   iconName: 'solar:siderbar-line-duotone',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Side Two Steps',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/side-two-steps',
  //     },
  //     {
  //       displayName: 'Boxed Two Steps',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/boxed-two-steps',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Error',
  //   iconName: 'solar:bug-minimalistic-line-duotone',
  //   route: '/authentication/error',
  // },
  // {
  //   displayName: 'Maintenance',
  //   iconName: 'solar:settings-line-duotone',
  //   route: '/authentication/maintenance',
  // },
  // {
  //   divider: true,
  //   navCap: 'Other',
  // },
  // {
  //   displayName: 'Menu Level',
  //   iconName: 'solar:align-horizontal-center-line-duotone',
  //   route: '/menu-level',
  //   children: [
  //     {
  //       displayName: 'Menu 1',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/menu-1',
  //       children: [
  //         {
  //           displayName: 'Menu 1',
  //           subItemIcon: true,
  //           iconName: 'solar:round-alt-arrow-right-line-duotone',
  //           route: '/menu-1',
  //         },

  //         {
  //           displayName: 'Menu 2',
  //           subItemIcon: true,
  //           iconName: 'solar:round-alt-arrow-right-line-duotone',
  //           route: '/menu-2',
  //         },
  //       ],
  //     },

  //     {
  //       displayName: 'Menu 2',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/menu-2',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Disabled',
  //   iconName: 'solar:bookmark-circle-line-duotone',
  //   route: '/disabled',
  //   disabled: true,
  // },
  // {
  //   displayName: 'Chip',
  //   iconName: 'solar:branching-paths-up-line-duotone',
  //   route: '/',
  //   chip: true,
  //   chipClass: 'bg-primary text-white',
  //   chipContent: '9',
  // },
  // {
  //   displayName: 'Outlined',
  //   iconName: 'solar:add-square-line-duotone',
  //   route: '/',
  //   chip: true,
  //   chipClass: 'b-1 border-primary text-primary',
  //   chipContent: 'outlined',
  // },
  // {
  //   displayName: 'External Link',
  //   iconName: 'solar:link-round-angle-bold-duotone',
  //   route: 'https://www.google.com/',
  //   external: true,
  // },
];
