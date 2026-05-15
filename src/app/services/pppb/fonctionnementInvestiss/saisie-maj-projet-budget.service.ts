import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { ChapitreDto } from '../../../dtos/global/chapitre.dto';
import { ActionDto } from '../../../dtos/global/action.dto';
import { ActiviteDto } from '../../../dtos/global/activite.dto';
import { ParametreRechercheDto } from '../../../dtos/global/parametreRecherche.dto';
import { EnveloppeBudgetDto } from '../../../dtos/saisieMaj/enveloppeBudget.dto';
import { LigneBudgetDto } from '../../../dtos/saisieMaj/ligneBudget.dto';

@Injectable({
  providedIn: 'root',
})
export class SaisieMajProjetBudgetService {

  constructor(private apiService: ApiService) {}

  getChapitresInvestissement(secId: string, sfinCode: string, proId: string, proCode: string,exeCode:String): Observable<ChapitreDto[]> {
    return this.apiService.get<ChapitreDto[]>(`/chapitresInvestissement/${secId}/${sfinCode}/${proId}/${proCode}/${exeCode}`);
  }

  getChapitresFonctionnement(secId: string, sfinCode: string, proId: string,exeCode:String): Observable<ChapitreDto[]> {
    return this.apiService.get<ChapitreDto[]>(`/chapitresFonctionnement/${secId}/${sfinCode}/${proId}/${exeCode}`);
  }

  getActionsProjetDeBudget(proId: string, pappRef: string, chapCode: string, chapId: string): Observable<ActionDto[]> {
    return this.apiService.get<ActionDto[]>(`/actionsProjetDeBudget/${proId}/${pappRef}/${chapCode}/${chapId}`);
  }

  getActivitesProjetDeBudget(copCopId: string, pappRef: string, chapCode: string): Observable<ActiviteDto[]> {
    return this.apiService.get<ActiviteDto[]>(`/activitesProjetDeBudget/${copCopId}/${pappRef}/${chapCode}`);
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
}
