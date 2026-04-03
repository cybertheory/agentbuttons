import { register as registerClaude } from 'claudebuttons';
import { register as registerHermes } from 'hermesbuttons';
import { register as registerClaw } from 'clawbuttons';

export { ClawButtonsPlugin } from 'clawbuttons/vue';
export { HermesButtonsPlugin } from 'hermesbuttons/vue';

const ALL_CUSTOM_TAGS = [
  'claude-code-button',
  'cowork-button',
  'claude-popup-dialog',
  'hermes-button',
  'hermes-skill-button',
  'hermes-popup-dialog',
  'openclaw-button',
  'ironclaw-button',
  'nanoclaw-button',
  'zeroclaw-button',
  'openharness-button',
  'claudeclaw-button',
  'claw-popup-dialog',
  'preferred-button',
];

/**
 * Vue plugin that registers every agent button custom element and
 * configures the Vue compiler to treat them as custom elements.
 *
 * Usage:
 *   import { AgentButtonsPlugin } from 'agentbuttons/vue'
 *   app.use(AgentButtonsPlugin)
 */
export const AgentButtonsPlugin = {
  install(app: any) {
    registerClaude();
    registerHermes();
    registerClaw();

    if (app.config?.compilerOptions) {
      const original = app.config.compilerOptions.isCustomElement;
      app.config.compilerOptions.isCustomElement = (tag: string) => {
        if (ALL_CUSTOM_TAGS.includes(tag)) return true;
        return original?.(tag) ?? false;
      };
    }
  },
};

export default AgentButtonsPlugin;
