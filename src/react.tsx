'use client';

// ── Claude Code ─────────────────────────────────────────────────────
export {
  ClaudeCodeButton,
  CoworkButton,
} from 'claudebuttons/react';

export type {
  ClaudeCodeButtonProps,
  CoworkButtonProps,
  ClaudeCodeButtonOptions,
  CoworkButtonOptions,
} from 'claudebuttons/react';

// ── Hermes Agent ────────────────────────────────────────────────────
export {
  HermesButton,
  HermesSkillButton,
} from 'hermesbuttons/react';

export type {
  HermesButtonProps,
  HermesSkillButtonProps,
  HermesButtonOptions,
  HermesSkillButtonOptions,
} from 'hermesbuttons/react';

// ── OpenClaw-style harnesses ────────────────────────────────────────
export {
  OpenClawButton,
  HermesButton as ClawHermesButton,
  IronClawButton,
  NanoClawButton,
  ZeroClawButton,
  OpenHarnessButton,
  ClaudeClawButton,
} from 'clawbuttons/react';

export type {
  ClawButtonProps,
  ClawButtonOptions,
  HarnessId,
} from 'clawbuttons/react';

// ── Preferred agent (cookie + developer fallback) ─────────────────
import {
  useMemo,
  useState,
  useLayoutEffect,
  type FC,
  type CSSProperties,
} from 'react';
import {
  parsePreferredAgentsAttribute,
  pickPreferredAgentId,
  readAgentPreferences,
} from './agent-preferences';
import { ClaudeCodeButton, CoworkButton } from 'claudebuttons/react';
import { HermesButton, HermesSkillButton } from 'hermesbuttons/react';
import {
  OpenClawButton,
  IronClawButton,
  NanoClawButton,
  ZeroClawButton,
  OpenHarnessButton,
  ClaudeClawButton,
} from 'clawbuttons/react';

export interface PreferredButtonProps {
  /** Comma-separated agent ids in developer priority order. */
  agents: string;
  command: string;
  skillUrl?: string;
  theme?: 'branded' | 'branded-alt' | 'dark' | 'light' | 'system';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline' | 'ghost';
  shape?: 'rounded' | 'pill' | 'square';
  popup?: boolean;
  promptFlag?: boolean;
  popupTitle?: string;
  popupDescription?: string;
  autoLaunch?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders one agent button: prefers ids from the `agentpreferences` cookie when present,
 * otherwise the first id in `agents`.
 */
export const PreferredButton: FC<PreferredButtonProps> = ({
  agents,
  command,
  skillUrl,
  theme = 'branded',
  size = 'md',
  variant = 'filled',
  shape = 'rounded',
  popup = true,
  promptFlag = true,
  popupTitle,
  popupDescription,
  autoLaunch,
  className,
  style,
}) => {
  const devOrder = useMemo(() => parsePreferredAgentsAttribute(agents), [agents]);
  const [picked, setPicked] = useState<string | null>(() =>
    devOrder.length ? pickPreferredAgentId(devOrder, null) : null,
  );

  useLayoutEffect(() => {
    if (devOrder.length === 0) {
      setPicked(null);
      return;
    }
    setPicked(pickPreferredAgentId(devOrder, readAgentPreferences()?.order));
  }, [devOrder]);

  const common = {
    command,
    theme,
    size,
    variant,
    shape,
    popup,
    className,
    style,
    ...(popupTitle !== undefined ? { popupTitle } : {}),
    ...(popupDescription !== undefined ? { popupDescription } : {}),
  };

  if (!picked) return null;

  switch (picked) {
    case 'claude-code':
      return (
        <ClaudeCodeButton {...common} promptFlag={promptFlag} />
      );
    case 'cowork':
      return (
        <CoworkButton
          {...common}
          skillUrl={skillUrl}
          autoLaunch={autoLaunch}
        />
      );
    case 'hermes':
      return <HermesButton {...common} />;
    case 'hermes-skill':
      return (
        <HermesSkillButton {...common} skillUrl={skillUrl} />
      );
    case 'openclaw':
      return <OpenClawButton {...common} />;
    case 'ironclaw':
      return <IronClawButton {...common} />;
    case 'nanoclaw':
      return <NanoClawButton {...common} />;
    case 'zeroclaw':
      return <ZeroClawButton {...common} />;
    case 'openharness':
      return <OpenHarnessButton {...common} />;
    case 'claudeclaw':
      return <ClaudeClawButton {...common} />;
    default:
      return null;
  }
};
