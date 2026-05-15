import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { ProjetBudgetDto } from '../../../dtos/global/projet-budget.dto';
import { ProgrammeDto } from '../../../dtos/global/programme.dto';
import { SECTION_COURANTE } from '../../../dtos/global/section.dto';
import { TypeFinancementDto } from '../../../dtos/global/type-financement.dto';
import { CategorieDepenseDto } from '../../../dtos/global/categorie-depense.dto';
import { SourceFinancementDto } from '../../../dtos/global/source-financement.dto';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private exerciceCourant = signal<string | null>(null);
  private projetBudget = signal<ProjetBudgetDto | null>(null);
  private programmes = signal<ProgrammeDto[]>([]);
  private typesFin = signal<TypeFinancementDto[]>([]);
  private categoriesDepense = signal<CategorieDepenseDto[]>([]);
  private sourcesFin = signal<SourceFinancementDto[]>([]);

  constructor(private apiService: ApiService) {}

  getExerciceCourant(): Observable<string> {
    return this.apiService.get<string>('/exerciceEnCours').pipe(
      tap((value) => this.exerciceCourant.set(value))
    );
  }

  getProjetBudget(exerciceCourant: string): Observable<ProjetBudgetDto> {
    return this.apiService.get<ProjetBudgetDto>(`/projetsBudget/${exerciceCourant}`).pipe(
      tap((value) => this.projetBudget.set(value))
    );
  }

  getProgrammes(exercice: string): Observable<ProgrammeDto[]> {
    const secId = SECTION_COURANTE.sec_id;
    return this.apiService.get<ProgrammeDto[]>(`/programmes/${secId}/${exercice}`).pipe(
      tap((value) => this.programmes.set(value))
    );
  }

  getTypesFin(): Observable<TypeFinancementDto[]> {
    return this.apiService.get<TypeFinancementDto[]>('/typesFin').pipe(
      tap((value) => this.typesFin.set(value))
    );
  }

  getCategoriesDepense(proCode: string): Observable<CategorieDepenseDto[]> {
    return this.apiService.get<CategorieDepenseDto[]>(`/categoriesDepense/${proCode}`).pipe(
      tap((value) => this.categoriesDepense.set(value))
    );
  }

  getSourcesFin(tfinId: string): Observable<SourceFinancementDto[]> {
    return this.apiService.get<SourceFinancementDto[]>(`/sourcesFin/${tfinId}`).pipe(
      tap((value) => this.sourcesFin.set(value))
    );
  }

}
