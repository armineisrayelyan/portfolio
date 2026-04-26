import type { SavedResponse } from '../types/savedResponse';

const STORAGE_KEY = 'portfolio.savedResponses.v1';

export function loadSavedResponses(): SavedResponse[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedResponse);
  } catch {
    return [];
  }
}

export function writeSavedResponses(items: SavedResponse[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function addSavedResponse(item: SavedResponse): SavedResponse[] {
  const existing = loadSavedResponses();
  const next = [item, ...existing].slice(0, 50);
  writeSavedResponses(next);
  return next;
}

export function removeSavedResponse(id: string): SavedResponse[] {
  const existing = loadSavedResponses();
  const next = existing.filter((x) => x.id !== id);
  writeSavedResponses(next);
  return next;
}

function isSavedResponse(value: unknown): value is SavedResponse {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v['id'] === 'string' &&
    typeof v['response'] === 'string'
  );
}

