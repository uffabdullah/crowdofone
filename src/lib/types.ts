export const AUDIENCES = [
  { id: 'college', label: 'College students' },
  { id: 'professionals', label: 'Working professionals' },
  { id: 'owners', label: 'Small business owners' },
  { id: 'public', label: 'General public' },
] as const

export type AudienceId = (typeof AUDIENCES)[number]['id']

export function isAudienceId(value: string): value is AudienceId {
  return AUDIENCES.some((item) => item.id === value)
}

export function audienceLabel(id: AudienceId) {
  return AUDIENCES.find((item) => item.id === id)?.label ?? id
}

export interface SimulateRequest {
  text: string
  audience: AudienceId
}

export interface SimulateOptions {
  signal?: AbortSignal
  onProgress?: (responded: number, total: number) => void
}

export interface Objection {
  label: string
  detail: string
  count: number
}

export interface ConfusionPoint {
  title: string
  quote: string
  persona: string
}

export interface Segment {
  label: string
  interest: number
}

export type PersonaStance = 'interested' | 'unsure' | 'skeptical'

export interface PersonaReaction {
  name: string
  age: number
  background: string
  reaction: string
  stance: PersonaStance
}

export interface SimulateResult {
  audience: AudienceId
  audienceLabel: string
  excerpt: string
  crowdSize: number
  interestScore: number
  wouldPayPercent: number
  confusedPercent: number
  objections: Objection[]
  confusionPoints: ConfusionPoint[]
  segmentTitle: string
  segments: Segment[]
  reactions: PersonaReaction[]
}
