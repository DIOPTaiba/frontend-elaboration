import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmploiRef, FiltreState } from '../../models/traitement-agent.models';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss'],
})
export class FiltreComponent {

  @Input() emplois: EmploiRef[] = [];
  @Output() filtreChange = new EventEmitter<FiltreState>();
  @Output() filtreReset  = new EventEmitter<void>();

  showFilter      = false;
  filterEmploi    = '';
  filterChapitre  = '';
  filterMatricule = '';
  filterAction    = '';
  filterActivite  = '';

  get activeFilterCount(): number {
    return [this.filterEmploi, this.filterChapitre, this.filterMatricule,
            this.filterAction, this.filterActivite]
      .filter(v => v && v.trim() !== '').length;
  }

  get filtreState(): FiltreState {
    return {
      emploi:    this.filterEmploi,
      chapitre:  this.filterChapitre,
      matricule: this.filterMatricule,
      action:    this.filterAction,
      activite:  this.filterActivite,
    };
  }

  toggleFilter(event: Event): void {
    event.preventDefault();
    this.showFilter = !this.showFilter;
  }

  onFilterChange(): void {
    this.filtreChange.emit(this.filtreState);
  }

  applyFilter(): void {
    this.filtreChange.emit(this.filtreState);
  }

  resetFilter(): void {
    this.filterEmploi = this.filterChapitre = this.filterMatricule =
    this.filterAction = this.filterActivite = '';
    this.filtreReset.emit();
  }

  clearField(field: string): void {
    if (field === 'emploi')    this.filterEmploi    = '';
    if (field === 'chapitre')  this.filterChapitre  = '';
    if (field === 'matricule') this.filterMatricule = '';
    if (field === 'action')    this.filterAction    = '';
    if (field === 'activite')  this.filterActivite  = '';
    this.filtreChange.emit(this.filtreState);
  }
}