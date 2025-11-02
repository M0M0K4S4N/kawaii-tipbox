import { CSSRevision, RevisionControlState } from './revision-control-types';

const REVISION_STORAGE_KEY = 'css-revisions';
const MAX_REVISIONS = 10;

// Get all revisions from localStorage
export const getRevisions = (): CSSRevision[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(REVISION_STORAGE_KEY);
    if (!stored) return [];

    const revisions = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return revisions.map((rev: any) => ({
      ...rev,
      timestamp: new Date(rev.timestamp)
    }));
  } catch (error) {
    console.error('Error loading revisions:', error);
    return [];
  }
};

// Save revisions to localStorage
export const saveRevisions = (revisions: CSSRevision[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(revisions));
  } catch (error) {
    console.error('Error saving revisions:', error);
  }
};

// Create a new snapshot
export const createSnapshot = (
  cssText: string,
  styles?: any,
  customName?: string
): CSSRevision[] => {
  const revisions = getRevisions();
  const now = new Date();

  // Generate a default name if not provided
  const defaultName = `Snapshot ${revisions.length + 1} - ${now.toLocaleString()}`;
  const name = customName || defaultName;

  const newRevision: CSSRevision = {
    id: crypto.randomUUID(),
    number: revisions.length + 1,
    name,
    timestamp: now,
    cssText,
    styles
  };

  // Add new revision to the beginning
  const updatedRevisions = [newRevision, ...revisions];

  // Keep only the latest MAX_REVISIONS
  if (updatedRevisions.length > MAX_REVISIONS) {
    updatedRevisions.splice(MAX_REVISIONS);
  }

  // Update revision numbers to maintain sequential order
  updatedRevisions.forEach((rev, index) => {
    rev.number = index + 1;
  });

  saveRevisions(updatedRevisions);
  return updatedRevisions;
};

// Update a revision's name
export const updateRevisionName = (revisionId: string, newName: string): CSSRevision[] => {
  const revisions = getRevisions();
  const updatedRevisions = revisions.map(rev =>
    rev.id === revisionId ? { ...rev, name: newName } : rev
  );

  saveRevisions(updatedRevisions);
  return updatedRevisions;
};

// Delete a specific revision
export const deleteRevision = (revisionId: string): CSSRevision[] => {
  const revisions = getRevisions();
  const updatedRevisions = revisions.filter(rev => rev.id !== revisionId);

  // Update revision numbers to maintain sequential order
  updatedRevisions.forEach((rev, index) => {
    rev.number = index + 1;
  });

  saveRevisions(updatedRevisions);
  return updatedRevisions;
};

// Clear all revisions
export const clearAllRevisions = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(REVISION_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing revisions:', error);
  }
};