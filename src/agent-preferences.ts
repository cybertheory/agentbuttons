/**
 * Cross-site preference cookie for the agentbuttons family (same origin).
 * Name and JSON shape must match claudebuttons, hermesbuttons, and clawbuttons.
 */
export const AGENT_PREFERENCES_COOKIE_NAME = 'agentpreferences';

export const MAX_AGENT_PREFERENCE_ENTRIES = 24;

export const SUPPORTED_PREFERRED_AGENT_IDS = [
  'claude-code',
  'cowork',
  'hermes',
  'hermes-skill',
  'openclaw',
  'ironclaw',
  'nanoclaw',
  'zeroclaw',
  'openharness',
  'claudeclaw',
] as const;

export type PreferredAgentId = (typeof SUPPORTED_PREFERRED_AGENT_IDS)[number];

export interface AgentPreferencesPayload {
  /** Most recently used agent ids first. */
  order: string[];
}

const KNOWN = new Set<string>(SUPPORTED_PREFERRED_AGENT_IDS);

function isBrowser(): boolean {
  return typeof document !== 'undefined';
}

export function readAgentPreferences(): AgentPreferencesPayload | null {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${AGENT_PREFERENCES_COOKIE_NAME}=`));
  if (!match) return null;
  const value = match.slice(AGENT_PREFERENCES_COOKIE_NAME.length + 1);
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value);
    const data = JSON.parse(decoded) as unknown;
    if (!data || typeof data !== 'object' || !Array.isArray((data as AgentPreferencesPayload).order)) {
      return null;
    }
    const order = (data as AgentPreferencesPayload).order.filter(
      (x): x is string => typeof x === 'string' && x.length > 0,
    );
    return { order };
  } catch {
    return null;
  }
}

export function writeAgentPreferences(payload: AgentPreferencesPayload): void {
  if (!isBrowser()) return;
  const order = payload.order.slice(0, MAX_AGENT_PREFERENCE_ENTRIES);
  const json = JSON.stringify({ order });
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${AGENT_PREFERENCES_COOKIE_NAME}=${encodeURIComponent(json)}; Path=/; SameSite=Lax; Expires=${expires.toUTCString()}`;
}

export function recordAgentPreference(agentId: string): void {
  if (!agentId || typeof agentId !== 'string') return;
  const prev = readAgentPreferences();
  const base = prev?.order.filter((id) => id !== agentId) ?? [];
  writeAgentPreferences({ order: [agentId, ...base] });
}

/** Parse a comma-separated `agents` attribute; unknown tokens are dropped. */
export function parsePreferredAgentsAttribute(value: string | null): string[] {
  if (!value || !value.trim()) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of value.split(',')) {
    const id = raw.trim().toLowerCase();
    if (!id || !KNOWN.has(id) || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

/**
 * Pick which agent to show: first cookie hit that appears in developerOrder,
 * else the first entry in developerOrder (developer default).
 */
export function pickPreferredAgentId(
  developerOrder: string[],
  cookieOrder: string[] | null | undefined,
): string | null {
  if (developerOrder.length === 0) return null;
  const allowed = new Set(developerOrder);
  if (cookieOrder) {
    for (const id of cookieOrder) {
      if (allowed.has(id)) return id;
    }
  }
  return developerOrder[0];
}

const AGENT_TO_TAG: Record<string, string> = {
  'claude-code': 'claude-code-button',
  cowork: 'cowork-button',
  hermes: 'hermes-button',
  'hermes-skill': 'hermes-skill-button',
  openclaw: 'openclaw-button',
  ironclaw: 'ironclaw-button',
  nanoclaw: 'nanoclaw-button',
  zeroclaw: 'zeroclaw-button',
  openharness: 'openharness-button',
  claudeclaw: 'claudeclaw-button',
};

export function agentIdToCustomElementTag(agentId: string): string | null {
  return AGENT_TO_TAG[agentId] ?? null;
}

const FORWARD_ATTR_NAMES = [
  'command',
  'theme',
  'variant',
  'size',
  'shape',
  'popup',
  'prompt-flag',
  'popup-title',
  'popup-description',
  'auto-launch',
] as const;

/** Copy shared presentation attributes from a preferred-button host onto a child agent button. */
export function forwardAgentButtonAttributes(from: HTMLElement, to: HTMLElement): void {
  for (const name of FORWARD_ATTR_NAMES) {
    if (!from.hasAttribute(name)) continue;
    to.setAttribute(name, from.getAttribute(name) ?? '');
  }
}
