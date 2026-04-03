// ── Claude Code buttons ─────────────────────────────────────────────
export {
  ClaudeCodeButton,
  createClaudeCodeButton,
  registerClaudeCodeButton,
  CoworkButton,
  createCoworkButton,
  registerCoworkButton,
  ClaudePopupDialog,
  showPopup as showClaudePopup,
  CLAUDE_CODE_ICON,
  COWORK_ICON,
  themes as claudeThemes,
  resolveTheme as resolveClaudeTheme,
  BRAND_COLOR as CLAUDE_BRAND_COLOR,
  ALT_BRAND_COLOR as CLAUDE_ALT_BRAND_COLOR,
  isDesktopAppLinkSupported,
  isRestrictedEmbeddedBrowser,
  isMobileOrTabletDevice,
  discoverButtons as discoverClaudeButtons,
  generateStructuredData as generateClaudeStructuredData,
  injectStructuredData as injectClaudeStructuredData,
  register as registerClaude,
} from 'claudebuttons';

export type {
  Theme as ClaudeTheme,
  Size as ClaudeSize,
  Variant as ClaudeVariant,
  Shape as ClaudeShape,
  ClaudeCodeButtonOptions,
  CoworkButtonOptions,
  PopupOptions as ClaudePopupOptions,
  ThemeTokens as ClaudeThemeTokens,
  ButtonMetadata as ClaudeButtonMetadata,
} from 'claudebuttons';

// ── Hermes Agent buttons ────────────────────────────────────────────
export {
  HermesButton,
  createHermesButton,
  registerHermesButton,
  HermesSkillButton,
  createHermesSkillButton,
  registerHermesSkillButton,
  HermesPopupDialog,
  showPopup as showHermesPopup,
  HERMES_ICON,
  HERMES_SKILL_ICON,
  themes as hermesThemes,
  resolveTheme as resolveHermesTheme,
  BRAND_COLOR as HERMES_BRAND_COLOR,
  ALT_BRAND_COLOR as HERMES_ALT_BRAND_COLOR,
  discoverButtons as discoverHermesButtons,
  generateStructuredData as generateHermesStructuredData,
  injectStructuredData as injectHermesStructuredData,
  register as registerHermes,
} from 'hermesbuttons';

export type {
  Theme as HermesTheme,
  Size as HermesSize,
  Variant as HermesVariant,
  Shape as HermesShape,
  HermesButtonOptions,
  HermesSkillButtonOptions,
  PopupOptions as HermesPopupOptions,
  ThemeTokens as HermesThemeTokens,
  ButtonMetadata as HermesButtonMetadata,
} from 'hermesbuttons';

// ── OpenClaw-style harness buttons (OpenClaw, IronClaw, etc.) ───────
export {
  createClawButtonClass,
  getButtonClass,
  registerHarnessButton,
  registerAllButtons as registerAllClawButtons,
  createButton as createClawButton,
  ClawPopupDialog,
  showPopup as showClawPopup,
  OPENCLAW_ICON,
  HERMES_ICON as CLAW_HERMES_ICON,
  IRONCLAW_ICON,
  NANOCLAW_ICON,
  ZEROCLAW_ICON,
  OPENHARNESS_ICON,
  CLAUDECLAW_ICON,
  getIcon,
  getThemes as getClawThemes,
  resolveTheme as resolveClawTheme,
  DEFAULT_BRAND_COLOR as CLAW_DEFAULT_BRAND_COLOR,
  getBrandColor,
  HARNESSES,
  HARNESS_IDS,
  getHarness,
  discoverButtons as discoverClawButtons,
  generateStructuredData as generateClawStructuredData,
  injectStructuredData as injectClawStructuredData,
  register as registerClaw,
} from 'clawbuttons';

export type {
  Theme as ClawTheme,
  Size as ClawSize,
  Variant as ClawVariant,
  Shape as ClawShape,
  HarnessId,
  HarnessConfig,
  ClawButtonOptions,
  PopupOptions as ClawPopupOptions,
  ThemeTokens as ClawThemeTokens,
  ButtonMetadata as ClawButtonMetadata,
} from 'clawbuttons';

// ── Unified registration ────────────────────────────────────────────
import { register as _registerClaude } from 'claudebuttons';
import { register as _registerHermes } from 'hermesbuttons';
import { register as _registerClaw } from 'clawbuttons';

/**
 * Register all agent button custom elements at once.
 * Called automatically on import — exposed for frameworks
 * that need explicit registration timing.
 */
export function register() {
  _registerClaude();
  _registerHermes();
  _registerClaw();
}

/**
 * Inject structured data for all agent button types found on the page.
 */
export function injectAllStructuredData() {
  // Lazy-import to avoid pulling in DOM APIs at module scope on the server
  Promise.all([
    import('claudebuttons').then((m) => m.injectStructuredData()),
    import('hermesbuttons').then((m) => m.injectStructuredData()),
    import('clawbuttons').then((m) => m.injectStructuredData()),
  ]);
}
