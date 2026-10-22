import { CROWD_SIZE, DEMO_RUN_MS } from '../content/stats.ts'
import {
  audienceLabel,
  type AudienceId,
  type ConfusionPoint,
  type Objection,
  type PersonaReaction,
  type Segment,
  type SimulateOptions,
  type SimulateRequest,
  type SimulateResult,
} from './types.ts'

interface AudienceProfile {
  interest: number
  wouldPay: number
  confused: number
  segmentTitle: string
  segments: Segment[]
  objections: Objection[]
  confusionPoints: ConfusionPoint[]
  reactions: PersonaReaction[]
}

const profiles = {
  college: {
    interest: 62,
    wouldPay: 24,
    confused: 37,
    segmentTitle: 'Interest by age',
    segments: [
      { label: '18-19', interest: 71 },
      { label: '20-21', interest: 66 },
      { label: '22-24', interest: 58 },
      { label: '25+', interest: 47 },
    ],
    objections: [
      {
        label: 'Price',
        detail: 'Another subscription does not fit a student budget.',
        count: 1720,
      },
      {
        label: 'Timing',
        detail: 'Hard to picture which week this would actually get used.',
        count: 1410,
      },
      {
        label: 'Effort',
        detail: 'Sounds like one more thing to keep updated during the term.',
        count: 1080,
      },
      {
        label: 'Privacy',
        detail: 'Uneasy about classmates or the school seeing what they paste in.',
        count: 760,
      },
      {
        label: 'Workaround',
        detail: 'A group chat already covers a rough version of the job.',
        count: 540,
      },
    ],
    confusionPoints: [
      {
        title: 'When it gets opened',
        quote:
          'I got as far as "{phrase}" and still could not picture the Tuesday I would open it.',
        persona: 'Maya Chen, 20',
      },
      {
        title: 'Who on campus it is for',
        quote: 'Is this for clubs, roommates, or a class project? Those are three different products.',
        persona: 'Luis Ortega, 23',
      },
      {
        title: 'What a student pays',
        quote: 'Free, a student price, or full price? I will not guess.',
        persona: 'Aisha Rahman, 21',
      },
    ],
    reactions: [
      {
        name: 'Maya Chen',
        age: 20,
        background: 'Biology major, works a campus cafe job',
        reaction: 'I would try a free version. The moment it asks for a card, I am out.',
        stance: 'skeptical',
      },
      {
        name: 'Jordan Ellis',
        age: 22,
        background: 'Design student sharing a house with four people',
        reaction:
          'I understand "{phrase}". I still do not know what I tap on a normal Tuesday.',
        stance: 'unsure',
      },
      {
        name: 'Priya Shah',
        age: 19,
        background: 'Commuter student, first in the family to go to college',
        reaction: 'The problem is real for me. The writing sounds more polished than the product might be.',
        stance: 'interested',
      },
      {
        name: 'Luis Ortega',
        age: 23,
        background: 'Computer science senior, applying to internships',
        reaction: 'I can already hack a rough version with a spreadsheet and a group chat.',
        stance: 'skeptical',
      },
      {
        name: 'Aisha Rahman',
        age: 21,
        background: 'Works nights and schedules classes around shifts',
        reaction: 'I do not have time to learn it this semester. Lead with the one thing it does.',
        stance: 'unsure',
      },
      {
        name: 'Evan Brooks',
        age: 24,
        background: 'Grad student and teaching assistant',
        reaction: 'I would pay a few dollars if it clearly cut the annoying part. I am not sure it does.',
        stance: 'interested',
      },
    ],
  },
  professionals: {
    interest: 76,
    wouldPay: 51,
    confused: 19,
    segmentTitle: 'Interest by income',
    segments: [
      { label: 'Under 60k', interest: 61 },
      { label: '60-100k', interest: 74 },
      { label: '100-150k', interest: 79 },
      { label: '150k+', interest: 68 },
    ],
    objections: [
      {
        label: 'Time',
        detail: 'No spare afternoon to learn another tool.',
        count: 1560,
      },
      {
        label: 'Approval',
        detail: 'A manager has to sign off before anyone can pay.',
        count: 1320,
      },
      {
        label: 'Fit',
        detail: 'Unclear where this sits in an actual workday.',
        count: 1140,
      },
      {
        label: 'Data',
        detail: 'Company information leaving the building is a stop.',
        count: 890,
      },
      {
        label: 'Overlap',
        detail: 'The team already pays for something close.',
        count: 610,
      },
    ],
    confusionPoints: [
      {
        title: 'Where it sits in the day',
        quote: '"{phrase}" does not tell me if this replaces a meeting or adds one.',
        persona: 'Marcus Hale, 41',
      },
      {
        title: 'Who has to approve it',
        quote: 'If my manager or legal has to sign off, the page should say that first.',
        persona: 'Chris Patel, 37',
      },
      {
        title: 'Why it is still here in a month',
        quote: 'I can imagine week one. I cannot see why we would still be in it in March.',
        persona: 'Helena Ward, 34',
      },
    ],
    reactions: [
      {
        name: 'Helena Ward',
        age: 34,
        background: 'Product manager at a mid-size company',
        reaction: 'I would pilot this with my team if setup is an afternoon, not a quarter.',
        stance: 'interested',
      },
      {
        name: 'Marcus Hale',
        age: 41,
        background: 'Operations lead, two kids, back-to-back meetings',
        reaction: 'If it does not fit the Monday meeting, it will sit unused. I have no time to champion it.',
        stance: 'skeptical',
      },
      {
        name: 'Dana Okonkwo',
        age: 29,
        background: 'Software engineer on a product team',
        reaction:
          '"{phrase}" is a clean sentence. It does not tell me what I stop doing at work if we use this.',
        stance: 'unsure',
      },
      {
        name: 'Chris Patel',
        age: 37,
        background: 'Finance manager who reviews tool spend',
        reaction: 'Anything that touches company data needs a signature. That alone slows this down.',
        stance: 'skeptical',
      },
      {
        name: 'Sofia Alvarez',
        age: 45,
        background: 'Independent consultant who invoices her own clients',
        reaction: 'I would pay if it saved me an hour a week. The page never shows me that hour.',
        stance: 'interested',
      },
      {
        name: 'Ben Cho',
        age: 32,
        background: 'Designer at a small agency',
        reaction: 'We already pay for three tools that almost do this. Tell me what they cannot.',
        stance: 'unsure',
      },
    ],
  },
  owners: {
    interest: 69,
    wouldPay: 43,
    confused: 28,
    segmentTitle: 'Interest by yearly revenue',
    segments: [
      { label: 'Under 100k', interest: 57 },
      { label: '100-250k', interest: 70 },
      { label: '250-500k', interest: 74 },
      { label: '500k+', interest: 63 },
    ],
    objections: [
      {
        label: 'Fit',
        detail: 'Not convinced this was built for a small shop.',
        count: 1480,
      },
      {
        label: 'Setup',
        detail: 'No evening left to learn a new system.',
        count: 1290,
      },
      {
        label: 'Cost',
        detail: 'A monthly fee has to beat one good customer.',
        count: 1110,
      },
      {
        label: 'Audience',
        detail: 'The writing sounds like a product for tech startups.',
        count: 860,
      },
      {
        label: 'Support',
        detail: 'Wants a person to call when something breaks.',
        count: 640,
      },
    ],
    confusionPoints: [
      {
        title: 'Whether a small shop is the customer',
        quote:
          '"{phrase}" sounds like it was written for a startup, not a shop with a Tuesday rush.',
        persona: 'Ruth Keller, 52',
      },
      {
        title: 'What the customer has to do',
        quote: 'If my customers have to download something, this is dead on arrival.',
        persona: 'Grace Nguyen, 33',
      },
      {
        title: 'Who picks up the phone',
        quote: 'I did not see a person I can call. That is the line I look for.',
        persona: 'Tom Bradley, 58',
      },
    ],
    reactions: [
      {
        name: 'Ruth Keller',
        age: 52,
        background: 'Owns a neighborhood bakery with six employees',
        reaction: 'Will this work for a shop my size, or was it built for startups?',
        stance: 'unsure',
      },
      {
        name: 'Andre Williams',
        age: 44,
        background: 'Runs a two-truck landscaping crew',
        reaction: 'If it is not obvious by lunch, I will not come back. I do not have a night to set it up.',
        stance: 'skeptical',
      },
      {
        name: 'Mei Lin',
        age: 38,
        background: 'Packs online orders from home',
        reaction: 'I can repeat "{phrase}". I cannot tell if that is meant for a business my size.',
        stance: 'unsure',
      },
      {
        name: 'Samir Haddad',
        age: 47,
        background: 'Runs a small accounting office',
        reaction: 'A monthly fee has to beat one decent new customer. I cannot tell if it would.',
        stance: 'skeptical',
      },
      {
        name: 'Grace Nguyen',
        age: 33,
        background: 'Owns a three-chair hair studio',
        reaction: 'My customers are not going to learn a new app. If this needs them to, it fails.',
        stance: 'skeptical',
      },
      {
        name: 'Tom Bradley',
        age: 58,
        background: 'Second-generation hardware store owner',
        reaction: 'I would try it if I knew a person answers when it breaks. I would pay for that.',
        stance: 'interested',
      },
    ],
  },
  public: {
    interest: 54,
    wouldPay: 30,
    confused: 44,
    segmentTitle: 'Interest by age',
    segments: [
      { label: '18-24', interest: 63 },
      { label: '25-34', interest: 67 },
      { label: '35-49', interest: 52 },
      { label: '50+', interest: 39 },
    ],
    objections: [
      {
        label: 'Clarity',
        detail: 'Cannot tell what the product actually does.',
        count: 1810,
      },
      {
        label: 'Need',
        detail: 'Does not see why a normal person would start.',
        count: 1500,
      },
      {
        label: 'Safety',
        detail: 'Privacy and what happens to the text are not explained.',
        count: 1170,
      },
      {
        label: 'Steps',
        detail: 'Too much to get through before the point.',
        count: 930,
      },
      {
        label: 'Price',
        detail: 'Cannot find what it costs.',
        count: 580,
      },
    ],
    confusionPoints: [
      {
        title: 'What it is, in one sentence',
        quote: 'I read "{phrase}" twice and I still cannot explain it.',
        persona: 'Elena Vasquez, 27',
      },
      {
        title: 'Why a normal person would start',
        quote: 'I do not have the problem this seems to solve. Or I do, and the page hid it.',
        persona: 'Robert Klein, 63',
      },
      {
        title: 'Cost and safety',
        quote: 'The price and what happens to my information are both missing.',
        persona: 'Omar Farouk, 22',
      },
    ],
    reactions: [
      {
        name: 'Elena Vasquez',
        age: 27,
        background: 'Rents an apartment and does almost everything on her phone',
        reaction: 'After the first sentence I still do not know what it does.',
        stance: 'unsure',
      },
      {
        name: 'Robert Klein',
        age: 63,
        background: 'Retired teacher',
        reaction: 'Why would I need this? I have gotten along fine without it.',
        stance: 'skeptical',
      },
      {
        name: 'Nina Brooks',
        age: 31,
        background: 'Parent of two, little patience for setup',
        reaction: 'I read "{phrase}" twice. I still could not explain it to my sister, so I would not sign up.',
        stance: 'skeptical',
      },
      {
        name: 'Omar Farouk',
        age: 22,
        background: 'Retail job, careful with every dollar',
        reaction: 'Is my information safe, and what does it cost? Both are missing.',
        stance: 'unsure',
      },
      {
        name: 'Hannah Lee',
        age: 48,
        background: 'Librarian',
        reaction: 'There are too many steps before I know if it is for me.',
        stance: 'unsure',
      },
      {
        name: 'Caleb Wright',
        age: 36,
        background: 'Drives for a delivery app between shifts',
        reaction: 'If it saved me a weekly headache and the price was obvious, I would try it.',
        stance: 'interested',
      },
    ],
  },
} satisfies Record<AudienceId, AudienceProfile>

function hash(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function offset(seed: number, slot: number, span: number) {
  const mixed = Math.imul(seed ^ Math.imul(slot + 1, 0x9e3779b1), 0x85ebca6b) >>> 0
  return (mixed % (span * 2 + 1)) - span
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function pullPhrase(text: string) {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  const sentence = cleaned.split(/[.!?]/)[0]?.trim() || cleaned
  const phrase = sentence.split(' ').filter(Boolean).slice(0, 7).join(' ')
  if (phrase.length <= 72) return phrase
  return `${phrase.slice(0, 69).trim()}...`
}

function fill(text: string, phrase: string) {
  return text.replaceAll('{phrase}', phrase)
}

function buildResult(request: SimulateRequest): SimulateResult {
  const profile = profiles[request.audience]
  const phrase = pullPhrase(request.text)
  const seed = hash(`${request.audience}|${request.text.toLowerCase()}`)

  return {
    audience: request.audience,
    audienceLabel: audienceLabel(request.audience),
    excerpt: phrase,
    crowdSize: CROWD_SIZE,
    interestScore: clamp(profile.interest + offset(seed, 1, 3), 1, 99),
    wouldPayPercent: clamp(profile.wouldPay + offset(seed, 2, 3), 1, 99),
    confusedPercent: clamp(profile.confused + offset(seed, 3, 3), 1, 99),
    objections: profile.objections
      .map((item, index) => ({
        ...item,
        count: Math.max(40, item.count + offset(seed, index + 4, 28)),
      }))
      .sort((a, b) => b.count - a.count),
    confusionPoints: profile.confusionPoints.map((item) => ({
      ...item,
      quote: fill(item.quote, phrase),
    })),
    segmentTitle: profile.segmentTitle,
    segments: profile.segments.map((item, index) => ({
      ...item,
      interest: clamp(item.interest + offset(seed, index + 12, 3), 5, 98),
    })),
    reactions: profile.reactions.map((item) => ({
      ...item,
      reaction: fill(item.reaction, phrase),
    })),
  }
}

function trackProgress(durationMs: number, total: number, options?: SimulateOptions) {
  return new Promise<void>((resolve, reject) => {
    if (options?.signal?.aborted) {
      reject(new DOMException('The simulation was cancelled.', 'AbortError'))
      return
    }

    const start = performance.now()
    let frame = 0
    let last = 0
    let settled = false

    const finish = (error?: DOMException) => {
      if (settled) return
      settled = true
      cancelAnimationFrame(frame)
      options?.signal?.removeEventListener('abort', onAbort)
      if (error) reject(error)
      else resolve()
    }

    const onAbort = () => {
      finish(new DOMException('The simulation was cancelled.', 'AbortError'))
    }

    options?.signal?.addEventListener('abort', onAbort, { once: true })

    const step = (now: number) => {
      if (settled) return
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 3
      if (now - last >= 90 || t >= 1) {
        last = now
        const responded = t >= 1 ? total : Math.min(total - 1, Math.round(eased * total))
        options?.onProgress?.(responded, total)
      }
      if (t >= 1) {
        options?.onProgress?.(total, total)
        finish()
        return
      }
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
  })
}

async function mockSimulate(request: SimulateRequest, options?: SimulateOptions) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  await trackProgress(reduce ? 450 : DEMO_RUN_MS, CROWD_SIZE, options)
  if (options?.signal?.aborted) {
    throw new DOMException('The simulation was cancelled.', 'AbortError')
  }
  return buildResult(request)
}

/**
 * Run a crowd against a pitch.
 *
 * Today this always returns mock data so the demo works with no keys.
 * Replace the `return mockSimulate(...)` line with one of the seams below.
 *
 * POST /simulate
 *   const response = await fetch('/simulate', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(request),
 *   })
 *   if (!response.ok) throw new Error(`POST /simulate failed (${response.status})`)
 *   return (await response.json()) as SimulateResult
 *
 * Supabase, only when both env vars are set. getSupabase() lives in
 * ./supabase.ts and returns null otherwise, so do not call it unconditionally:
 *   import { getSupabase } from './supabase.ts'
 *   const supabase = getSupabase()
 *   if (supabase) {
 *     const { data, error } = await supabase.functions.invoke('simulate', {
 *       body: request,
 *     })
 *     if (error) throw error
 *     return data as SimulateResult
 *   }
 */
export async function simulate(
  request: SimulateRequest,
  options?: SimulateOptions,
): Promise<SimulateResult> {
  return mockSimulate(request, options)
}
