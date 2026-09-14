import { case01Manifest } from './case01/case01Data'
import type { CaseManifest } from './types'

export const case02Preview: CaseManifest = {
  id: 'case_002',
  caseNumber: 'CASE #002',
  title: 'The Neon Gallery Syndicate',
  location: 'Tokyo Ginza Art Pavilion - Sub-level 1',
  difficulty: 'Detective',
  status: 'LOCKED',
  incidentDate: '18 Oktober 2026, 02:15 JST',
  briefingSummary: 'Pencurian mahakarya lukisan digital bernilai $4.2M di museum seni modern dengan sensor laser yang dimatikan dari server pusat.',
  crimeScenePhotoUrl: '/assets/scenes/penthouse_scene.jpg',
  hotspots: [],
  evidenceList: [],
  suspects: [],
  milestones: [],
  schemaSql: '',
  seedSql: '',
  solution: {
    culpritId: 0,
    requiredEvidenceIds: [],
    reconstructionStory: ''
  }
}

export const case03Preview: CaseManifest = {
  id: 'case_003',
  caseNumber: 'CASE #003',
  title: 'The Harbor Container Conspiracy',
  location: 'Tanjung Priok International Freight Dock B-12',
  difficulty: 'Chief Forensics',
  status: 'LOCKED',
  incidentDate: '2 November 2026, 04:00 WIB',
  briefingSummary: 'Penyelundupan perangkat keras militer gelap melalui manipulasi log timbangan kontainer dan manifes kargo kapal kargo MV Northern Star.',
  crimeScenePhotoUrl: '/assets/scenes/penthouse_scene.jpg',
  hotspots: [],
  evidenceList: [],
  suspects: [],
  milestones: [],
  schemaSql: '',
  seedSql: '',
  solution: {
    culpritId: 0,
    requiredEvidenceIds: [],
    reconstructionStory: ''
  }
}

export const availableCases: CaseManifest[] = [
  case01Manifest,
  case02Preview,
  case03Preview
]

export function getCaseById(caseId: string): CaseManifest | undefined {
  return availableCases.find((c) => c.id === caseId)
}

export * from './types'
