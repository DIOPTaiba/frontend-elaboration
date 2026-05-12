import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root',
})
export class majEmploisEffectifSectionService {

  private tests = signal<string>('');

  constructor(private apiService: ApiService) { }

  /**
   * Test
   */

  public getTest(): Observable<string> {
    return this.apiService.get<string>('/sections/test').pipe(
      tap((value) => this.tests.set(value))
    );
  }

}
