import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { ProjetBudgetDto } from 'src/app/dtos/global/projet-budget.dto';
import { ParametreRechercheDto } from 'src/app/dtos/global/parametreRecherche.dto';

@Injectable({
  providedIn: 'root',
})
export class AgentService {

  private exerciceCourant = signal<number | null>(null);
  private projetBudget = signal<ProjetBudgetDto | null>(null);

  constructor(private apiService: ApiService) {}

  getExerciceCourant(): Observable<number> {
    return this.apiService.get<number>('/exerciceEnCours').pipe(
      tap((value) => this.exerciceCourant.set(value))
    );
  }

  /**
     * Liste agents
     */
    public getAgents(parametreRecherche: ParametreRechercheDto): Observable<any[]> {
      return this.apiService.post(`/agents`, parametreRecherche);
    }

}
