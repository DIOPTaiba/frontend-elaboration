import { Injectable } from '@angular/core';
import { Agent, EmploiRef, FiltreState, Paragraphe, DEMO_AGENTS, PARAGRAPHES,TOUS_PARAGRAPHES } from '../models/traitement-agent.models';
const STORAGE_KEY_AGENTS      = 'traitement_agents';
const STORAGE_KEY_PARAGRAPHES = 'traitement_paragraphes';
@Injectable({ providedIn: 'root' })
export class TraitementAgentService {

    // Paragraphes actifs au départ (sous-ensemble affiché dans le tableau)
  paragraphes: Paragraphe[] = [...PARAGRAPHES];

  // Liste complète de référence — immuable
  readonly tousLesParagraphes: Paragraphe[] = TOUS_PARAGRAPHES;
  // ─── Cumul ───────────────────────────────────────
  calculerCumul(agent: Agent): number {
    return this.paragraphes.reduce(
      (sum, p) => sum + (agent.valeurs[p.code] ?? 0), 0
    );
  }

  calculerCumulLigne(ligne: Agent): number {
    return this.paragraphes.reduce(
      (s, p) => s + (ligne.valeurs[p.code] ?? 0), 0
    );
  }

  // ─── Référentiel emplois ──────────────────────────
  buildEmploisRef(agents: Agent[]): EmploiRef[] {
    const map = new Map<string, string>();
    agents.forEach(a => { if (a.emploi) map.set(a.emploi, a.emploi); });
    return Array.from(map.entries()).map(([code, libelle]) => ({ code, libelle }));
  }

  // ─── Agent vide ───────────────────────────────────
  emptyAgent(): Agent {
    return { emploi: '', matricule: '', nom: '', valeurs: {}, cumul: null };
  }

  // ─── Données de démo ──────────────────────────────
  getDemoAgents(): Agent[] {
    const agents = DEMO_AGENTS.map(a => ({ ...a, valeurs: { ...a.valeurs } }));
    agents.forEach(a => { a.cumul = this.calculerCumul(a); });
    return agents;
  }

  // ─── Filtrage ─────────────────────────────────────
  filtrer(agents: Agent[], f: FiltreState): Agent[] {
    return agents.filter(ag =>
      (!f.emploi    || ag.emploi === f.emploi) &&
      (!f.matricule || ag.matricule.toLowerCase().includes(f.matricule.toLowerCase())) &&
      (!f.chapitre  || (ag.chapitre  ?? '').toLowerCase().includes(f.chapitre.toLowerCase())) &&
      (!f.action    || (ag.action    ?? '').toLowerCase().includes(f.action.toLowerCase())) &&
      (!f.activite  || (ag.activite  ?? '').toLowerCase().includes(f.activite.toLowerCase()))
    );
  }

  // ─── Récapitulatif ────────────────────────────────
  getRecap(agents: Agent[], code: string): number {
    return agents.reduce((s, a) => s + (a.valeurs[code] ?? 0), 0);
  }

  getTotalCumul(agents: Agent[]): number {
    return agents.reduce((s, a) => s + (a.cumul ?? 0), 0);
  }

  getModalRecap(lignes: Agent[], code: string): number {
    return lignes.reduce((s, l) => s + (l.valeurs[code] ?? 0), 0);
  }

  getModalTotalCumul(lignes: Agent[]): number {
    return lignes.reduce((s, l) => s + (l.cumul ?? 0), 0);
  }
  ajouterParagraphe(paragraphes: Paragraphe[], nouveau: Paragraphe): Paragraphe[] {
  // Éviter les doublons de code
  if (paragraphes.find(p => p.code === nouveau.code)) return paragraphes;
  return [...paragraphes, nouveau];
}
// ─── Persistance ─────────────────────────────────

  sauvegarderAgents(agents: Agent[]): void {
    localStorage.setItem(STORAGE_KEY_AGENTS, JSON.stringify(agents));
  }

  chargerAgents(): Agent[] | null {
    const data = localStorage.getItem(STORAGE_KEY_AGENTS);
    return data ? JSON.parse(data) : null;
  }

  sauvegarderParagraphes(paragraphes: Paragraphe[]): void {
    localStorage.setItem(STORAGE_KEY_PARAGRAPHES, JSON.stringify(paragraphes));
  }

  chargerParagraphes(): Paragraphe[] {
    const data = localStorage.getItem(STORAGE_KEY_PARAGRAPHES);
    return data ? JSON.parse(data) : [...PARAGRAPHES];
  }
}