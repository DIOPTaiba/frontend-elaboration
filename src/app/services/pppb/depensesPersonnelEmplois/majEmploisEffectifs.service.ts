import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root',
})
export class majEmploisEffectifsService {

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
     * Retourne les blogs en cache (local)
     */
    public getProgrammesXXXX() {
      return this.listeProgrammes();
      console.log("liste Programmes",this.listeProgrammes());
    }

}
