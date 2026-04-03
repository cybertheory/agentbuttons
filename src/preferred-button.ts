import {
  readAgentPreferences,
  parsePreferredAgentsAttribute,
  pickPreferredAgentId,
  agentIdToCustomElementTag,
  forwardAgentButtonAttributes,
} from './agent-preferences';

/**
 * Renders a single agent button chosen from the `agents` list.
 * If the `agentpreferences` cookie exists (written by any family button on copy),
 * the first matching id in that cookie wins; otherwise the first id in `agents` is used.
 */
export class PreferredButton extends HTMLElement {
  static observedAttributes = [
    'agents',
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
  ];

  private _child: HTMLElement | null = null;
  private _rendered = false;

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (!this._rendered) return;
    this.render();
  }

  private render() {
    const developerOrder = parsePreferredAgentsAttribute(this.getAttribute('agents'));
    const cookieOrder = readAgentPreferences()?.order;
    const picked = pickPreferredAgentId(developerOrder, cookieOrder);
    const tag = picked ? agentIdToCustomElementTag(picked) : null;

    if (picked) {
      this.setAttribute('data-resolved-agent', picked);
    } else {
      this.removeAttribute('data-resolved-agent');
    }

    if (this._child) {
      this.removeChild(this._child);
      this._child = null;
    }

    if (!tag || !picked) {
      this._rendered = true;
      return;
    }

    const el = document.createElement(tag) as HTMLElement;
    forwardAgentButtonAttributes(this, el);
    this.appendChild(el);
    this._child = el;
    this._rendered = true;
  }
}

export function registerPreferredButton(tagName = 'preferred-button') {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(tagName)) {
    customElements.define(tagName, PreferredButton);
  }
}

registerPreferredButton();

export interface PreferredButtonOptions {
  /** Comma-separated agent ids, developer priority order (e.g. claude-code,hermes,openclaw). */
  agents: string;
  command: string;
  theme?: string;
  variant?: string;
  size?: string;
  shape?: string;
  popup?: boolean;
  promptFlag?: boolean;
  popupTitle?: string;
  popupDescription?: string;
  autoLaunch?: boolean;
}

export function createPreferredButton(options: PreferredButtonOptions): PreferredButton {
  const el = document.createElement('preferred-button') as PreferredButton;
  el.setAttribute('agents', options.agents);
  el.setAttribute('command', options.command);
  if (options.theme) el.setAttribute('theme', options.theme);
  if (options.variant) el.setAttribute('variant', options.variant);
  if (options.size) el.setAttribute('size', options.size);
  if (options.shape) el.setAttribute('shape', options.shape);
  if (options.popup === false) el.setAttribute('popup', 'false');
  if (options.promptFlag === false) el.setAttribute('prompt-flag', 'false');
  if (options.popupTitle) el.setAttribute('popup-title', options.popupTitle);
  if (options.popupDescription) el.setAttribute('popup-description', options.popupDescription);
  if (options.autoLaunch === true) el.setAttribute('auto-launch', 'true');
  return el;
}
