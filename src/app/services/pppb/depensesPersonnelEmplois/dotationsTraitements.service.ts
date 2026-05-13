import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { ParametreRechercheDto } from 'src/app/dtos/global/parametreRecherche.dto';

@Injectable({
  providedIn: 'root',
})
export class DotationsTraitementsService {

  private tests = signal<string>('');

  constructor(private apiService: ApiService) { }

  private listeProgrammes = signal<any[]>([]);
  // private selectedPost = signal<any | null>(null);
  
  
    /**
     * Liste Programmes
     */
    public getProgrammes(): Observable<any[]> {
      return this.apiService.get<any[]>('/programmes/MIN0001/2026').pipe(
        tap((posts) => this.listeProgrammes.set(posts))
      );
    }
  
    /**
     * Liste chapitres
     */
    public getChapitres(parametreRecherche: ParametreRechercheDto): Observable<any[]> {
      return this.apiService.post(`/majEffectifEmplois/chapitreEffectifs`, parametreRecherche);
    }

    /**
     * Liste agents
     */
    public getAgents(parametreRecherche: ParametreRechercheDto): Observable<any[]> {
      return this.apiService.post(`/agents`, parametreRecherche);
    }

}
