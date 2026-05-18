export interface LigneBudgetDto {
  codeAction: string;
  libAction: string;
  codeActivite: string;
  libActivite: string;
  codeLigne: string;
  libLigne: string;
  cpLFI0: number;
  cpLFI1: number;
  aeLFI0: number;
  aeLFI1: number;
  idLigne?: number;
  lbuCode?:string;
  dateLigne?:Date;
}
