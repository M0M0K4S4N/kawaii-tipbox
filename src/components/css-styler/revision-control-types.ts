export interface CSSRevision {
  id: string;
  number: number;
  name: string;
  timestamp: Date;
  cssText: string;
  styles?: any; // Can store DonationStyles if needed
}

export interface RevisionControlState {
  revisions: CSSRevision[];
  maxRevisions: number;
}

export interface RevisionControlProps {
  cssText: string;
  styles?: any;
  onRestoreRevision: (revision: CSSRevision) => void;
  onCreateSnapshot: (name: string) => void;
}