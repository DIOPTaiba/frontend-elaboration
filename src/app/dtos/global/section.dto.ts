export interface SectionDto {
  sec_id: string;
  sec_code: number;
  sec_libelle: string;
}

export const SECTION_COURANTE: SectionDto = {
  sec_id: 'MIN0001',
  sec_code: 43,
  sec_libelle: 'Ministère des Finances et du Budget',
};
