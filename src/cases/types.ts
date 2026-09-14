export interface QueryExecutionResult {
  columns: string[];
  values: unknown[][];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
}

export interface TableColumnInfo {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
}

export interface TableSchemaInfo {
  tableName: string;
  columns: TableColumnInfo[];
}

export interface HotspotMarker {
  id: string;
  label: 'A' | 'B' | 'C' | string;
  title: string;
  position: {
    xPercent: number; // 0 - 100%
    yPercent: number; // 0 - 100%
  };
  evidenceId: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  category: 'Physical' | 'Digital' | 'Forensic' | 'Document';
  foundLocation: string;
  photoUrl: string;
  previewThumbnail?: string;
  description: string;
  forensicNotes: string;
  suggestedSqlPrompt?: string;
  unlockedByDefault: boolean;
}

export interface Suspect {
  id: number;
  name: string;
  role: string;
  mugshotUrl: string;
  alibiStatement: string;
  assignedKeycard: string;
  isCulprit: boolean;
}

export interface CaseMilestone {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  unlockedEvidenceId?: string;
  // Rule condition that inspects query execution result
  evaluator: (result: QueryExecutionResult) => boolean;
}

export interface CaseManifest {
  id: string;
  caseNumber: string;
  title: string;
  location: string;
  difficulty: 'Rookie' | 'Detective' | 'Chief Forensics';
  status: 'OPEN' | 'IN_PROGRESS' | 'SOLVED' | 'LOCKED';
  incidentDate: string;
  briefingSummary: string;
  crimeScenePhotoUrl: string;
  hotspots: HotspotMarker[];
  evidenceList: EvidenceItem[];
  suspects: Suspect[];
  milestones: CaseMilestone[];
  schemaSql: string;
  seedSql: string;
  solution: {
    culpritId: number;
    requiredEvidenceIds: string[];
    reconstructionStory: string;
  };
}
