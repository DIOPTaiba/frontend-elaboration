export interface AppSettings {
  dir: 'ltr' | 'rtl';
  theme: string;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  boxed: boolean;
  horizontal: boolean;
  activeTheme: string;
  language: string;
  cardBorder: boolean;
  navPos: 'side' | 'top';
}

export const defaults: AppSettings = {
  dir: 'ltr',
  theme: 'light',
  sidenavOpened: false,
  // sidenavCollapsed: false,
  sidenavCollapsed: true,
  // boxed: true,
  boxed: false,
  // horizontal: true,
  horizontal: false,
  cardBorder: false,
  activeTheme: 'blue_theme',
  // language: 'en-us',
  language: 'fr-FR',
  navPos: 'side',
};