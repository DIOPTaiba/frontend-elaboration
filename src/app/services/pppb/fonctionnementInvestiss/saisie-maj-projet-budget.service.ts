import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { ChapitreDto } from '../../../dtos/global/chapitre.dto';
import { ActionDto } from '../../../dtos/global/action.dto';
import { ActiviteDto } from '../../../dtos/global/activite.dto';
import { ParametreRechercheDto } from '../../../dtos/global/parametreRecherche.dto';
import { EnveloppeBudgetDto } from '../../../dtos/saisieMaj/enveloppeBudget.dto';
import { LigneBudgetDto } from '../../../dtos/saisieMaj/ligneBudget.dto';
import { ResponseDto } from '../../../dtos/global/response.dto';

@Injectable({
  providedIn: 'root',
})
export class SaisieMajProjetBudgetService {

  constructor(private apiService: ApiService) {}

  getChapitresInvestissement(params: ParametreRechercheDto): Observable<ChapitreDto[]> {
    return this.apiService.get<ChapitreDto[]>(`/chapitresInvestissement/${params.sectionId}/${params.sfinCode}/${params.proId}/${params.proCode}/${params.exeCode}`);
  }

  getChapitresFonctionnement(params: ParametreRechercheDto): Observable<ChapitreDto[]> {
    return this.apiService.get<ChapitreDto[]>(`/chapitresFonctionnement/${params.sectionId}/${params.sfinCode}/${params.proId}/${params.exeCode}`);
  }

  getActionsProjetDeBudget(params: ParametreRechercheDto): Observable<ActionDto[]> {
    return this.apiService.get<ActionDto[]>(`/actionsProjetDeBudget/${params.proId}/${params.pappRef}/${params.chapCode}/${params.chapId}`);
  }

  getActivitesProjetDeBudget(params: ParametreRechercheDto): Observable<ActiviteDto[]> {
    return this.apiService.get<ActiviteDto[]>(`/activitesProjetDeBudget/${params.copId}/${params.pappRef}/${params.chapCode}`);
  }

  enveloppeTotal(params: ParametreRechercheDto): Observable<EnveloppeBudgetDto> {
    return this.apiService.post<EnveloppeBudgetDto>('/saisieMaj/montantsAECPLigne', params);
  }

  enveloppeReparti(params: ParametreRechercheDto): Observable<EnveloppeBudgetDto> {
    return this.apiService.post<EnveloppeBudgetDto>('/saisieMaj/montantsAECPProgramme', params);
  }

  getLignesBudget(params: ParametreRechercheDto): Observable<LigneBudgetDto[]> {
    return this.apiService.post<LigneBudgetDto[]>('/saisieMaj/lignesBudget', params);
  }

  getListeActiviteSaisie(params: ParametreRechercheDto): Observable<ActiviteDto[]> {
    return this.apiService.post<ActiviteDto[]>('/saisieMaj/listeActiviteSaisie', params);
  }

  getLigneSaisie(params: ParametreRechercheDto): Observable<LigneBudgetDto[]> {
    return this.apiService.post<LigneBudgetDto[]>('/saisieMaj/ligneSaisie', params);
  }

  insertLigneBudget(params: ParametreRechercheDto): Observable<ResponseDto> {
    return this.apiService.post<ResponseDto>('/saisieMaj/insertLigneBudget', params);
  }

  updateLigneBudget(numeroLigne: string, params: ParametreRechercheDto): Observable<ResponseDto> {
    return this.apiService.put<ResponseDto>(`/saisieMaj/updateLigneBudget/${numeroLigne}`, params);
  }

  supprimerLigneBudget(lbuCode: string): Observable<boolean> {
    return this.apiService.delete<boolean>(`/saisieMaj/supprimerLigneBudget/${lbuCode}`);
  }
}
