export interface Paragraphe {
  code: string;
  label: string;
}

export interface Agent {
  emploi: string;
  matricule: string;
  nom: string;
  chapitre?: string;
  action?: string;
  activite?: string;
  valeurs: { [codeParagraphe: string]: number | null };
  cumul: number | null;
}

export interface EmploiRef {
  code: string;
  libelle: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FiltreState {
  emploi: string;
  chapitre: string;
  matricule: string;
  action: string;
  activite: string;
}

export interface LigneIndividuelle {
  depense: string;
  texte: string;
  observation: string;
  montant: number;
}

export const DEMO_AGENTS: Agent[] = [
  { emploi: 'Directeur',    matricule: 'MAT001', nom: 'Mamadou Diallo',  chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2400000, '662': 350000, '663': 180000, '665': 240000, '666': null,  '667': null,  '668': null,  '669': null  }, cumul: null },
  { emploi: 'Contrôleur',   matricule: 'MAT002', nom: 'Aissatou Sow',    chapitre: '25025331', action: 'A2', activite: 'ACT02', valeurs: { '661': 1850000, '662': 280000, '663': 140000, '665': 185000, '666': 60000, '667': null,  '668': null,  '669': null  }, cumul: null },
  { emploi: 'Chef service', matricule: 'MAT003', nom: 'Ibrahima Fall',    chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2100000, '662': 310000, '663': 160000, '665': 210000, '666': null,  '667': 45000, '668': null,  '669': null  }, cumul: null },
  { emploi: 'Analyste',     matricule: 'MAT004', nom: 'Fatou Ndiaye',     chapitre: '25025332', action: 'A3', activite: 'ACT03', valeurs: { '661': 1600000, '662': 220000, '663': 110000, '665': 160000, '666': 55000, '667': null,  '668': null,  '669': 30000 }, cumul: null },
  { emploi: 'Comptable',    matricule: 'MAT005', nom: 'Ousmane Ba',       chapitre: '25025331', action: 'A2', activite: 'ACT02', valeurs: { '661': 1750000, '662': 250000, '663': 125000, '665': 175000, '666': null,  '667': null,  '668': null,  '669': null  }, cumul: null },
  { emploi: 'Assistant',    matricule: 'MAT006', nom: 'Mariama Camara',   chapitre: '25025333', action: 'A4', activite: 'ACT04', valeurs: { '661': 1200000, '662': 180000, '663': 90000,  '665': 120000, '666': 50000, '667': null,  '668': null,  '669': null  }, cumul: null },
  { emploi: 'Ingenieur',    matricule: 'MAT007', nom: 'Cheikh Mbaye',     chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2250000, '662': 330000, '663': 165000, '665': 225000, '666': null,  '667': 55000, '668': null,  '669': null  }, cumul: null },
  { emploi: 'Juriste',      matricule: 'MAT008', nom: 'Rokhaya Diop',     chapitre: '25025332', action: 'A3', activite: 'ACT03', valeurs: { '661': 1950000, '662': 290000, '663': 145000, '665': 195000, '666': 65000, '667': null,  '668': null,  '669': null  }, cumul: null },
  { emploi: 'Technicien',   matricule: 'MAT009', nom: 'Modou Sarr',       chapitre: '25025333', action: 'A4', activite: 'ACT04', valeurs: { '661': 1400000, '662': 200000, '663': 100000, '665': 140000, '666': null,  '667': null,  '668': 35000, '669': null  }, cumul: null },
  { emploi: 'Directeur',    matricule: 'MAT010', nom: 'Ndeye Faye',       chapitre: '25025330', action: 'A1', activite: 'ACT01', valeurs: { '661': 2500000, '662': 370000, '663': 185000, '665': 250000, '666': null,  '667': null,  '668': null,  '669': 50000 }, cumul: null },
  { emploi: 'Controleur',   matricule: 'MAT011', nom: 'Alioune Thiam',    chapitre: '25025331', action: 'A2', activite: 'ACT02', valeurs: { '661': 1800000, '662': 270000, '663': 135000, '665': 180000, '666': 60000, '667': null,  '668': null,  '669': null  }, cumul: null },
  { emploi: 'Analyste',     matricule: 'MAT012', nom: 'Seynabou Gueye',   chapitre: '25025332', action: 'A3', activite: 'ACT03', valeurs: { '661': 1550000, '662': 215000, '663': 108000, '665': 155000, '666': null,  '667': 40000, '668': null,  '669': null  }, cumul: null },
];

export const PARAGRAPHES: Paragraphe[] = [
  { code: '661', label: 'Traitements et salaires' },
  { code: '662', label: 'Primes' },
  { code: '663', label: 'Indemnités' },
  { code: '665', label: 'Cotisations sociales' },
  { code: '666', label: 'Prestations familiales' },
  { code: '667', label: 'Prises en charge médicales' },
  { code: '668', label: 'Contractuels' },
  { code: '669', label: 'Autres charges de personnel' },
];

export const GESTION_OPTIONS: SelectOption[] = [
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
];

export const BUDGET_OPTIONS: SelectOption[] = [
  { value: 'Projet LFI 2027', label: 'Projet LFI 2027' },
  { value: 'LFI 2026',        label: 'LFI 2026' },
];

export const SECTION_OPTIONS: SelectOption[] = [
  { value: 'Ministère des finances et du Budget', label: 'Ministère des finances et du Budget' },
  { value: 'Ministère de la Santé',               label: 'Ministère de la Santé' },
];

export const PROGRAMME_OPTIONS: SelectOption[] = [
  { value: "Elaboration du budget et suivi de l'exécution des dépenses", label: "Elaboration du budget et suivi de l'exécution des dépenses" },
  { value: 'Administration générale', label: 'Administration générale' },
];