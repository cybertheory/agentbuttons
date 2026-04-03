# agentbuttons

**One package. Every AI coding agent.**

Drop-in **“Run on …”** buttons for Claude Code, Cowork, Hermes, OpenClaw, and the rest of the harness ecosystem. Framework-agnostic Web Components, optional React and Vue integrations, and a single entry point for your site or app.

<p align="center">
  <img src="https://img.shields.io/npm/v/agentbuttons?color=%230EA5E9&label=npm" alt="npm version">
  <img src="https://img.shields.io/npm/l/agentbuttons?color=%230EA5E9" alt="license">
  <img src="https://img.shields.io/bundlephobia/minzip/agentbuttons?color=%230EA5E9" alt="bundle size">
</p>

---

## Supported Agents

| Agent | Element | Events prefix |
|-------|---------|---------------|
| Claude Code | `<claude-code-button>` | `cb-` |
| Cowork | `<cowork-button>` | `cb-` |
| Hermes Agent | `<hermes-button>` | `hb-` |
| Hermes Skills | `<hermes-skill-button>` | `hb-` |
| OpenClaw | `<openclaw-button>` | `cb-` |
| IronClaw | `<ironclaw-button>` | `cb-` |
| NanoClaw | `<nanoclaw-button>` | `cb-` |
| ZeroClaw | `<zeroclaw-button>` | `cb-` |
| OpenHarness | `<openharness-button>` | `cb-` |
| ClaudeClaw | `<claudeclaw-button>` | `cb-` |

When you import the full package, `<hermes-button>` is the **Hermes Agent** control (`hb-*` events). The OpenClaw-style harness that also targets Hermes is available in React as **`ClawHermesButton`** (see [Framework integration](#framework-integration)).

---

## Install

```bash
npm install agentbuttons
```

**CDN (global IIFE):**

```html
<script src="https://unpkg.com/agentbuttons@latest/dist/index.global.js"></script>
```

> **Note:** The single global bundle includes every agent implementation. It is larger than any one agent alone. For production CDN usage without a bundler, you can instead load [claudebuttons](https://www.npmjs.com/package/claudebuttons), [hermesbuttons](https://www.npmjs.com/package/hermesbuttons), and [clawbuttons](https://www.npmjs.com/package/clawbuttons) as separate `<script>` tags. Prefer **`npm install agentbuttons`** and ESM/CJS imports when you want tree-shaking and one coherent version line.

---

## Quick Start

```html
<script type="module">
  import 'agentbuttons';
</script>

<claude-code-button command="/deploy --prod" theme="branded"></claude-code-button>
<cowork-button command="/review" skill-url="https://example.com/skill.zip"></cowork-button>

<hermes-button command="/research deep-dive on your API" theme="branded"></hermes-button>
<hermes-skill-button
  command="/competitive-analysis"
  skill-url="https://example.com/skills/analysis.zip"
></hermes-skill-button>

<openclaw-button command="Ship the dashboard" theme="branded"></openclaw-button>
<ironclaw-button command="Audit dependencies" variant="outline"></ironclaw-button>
```

```js
document.querySelector('claude-code-button')
  ?.addEventListener('cb-copy', (e) => console.log('Copied:', e.detail.command));

document.querySelector('hermes-button')
  ?.addEventListener('hb-copy', (e) => console.log('Copied:', e.detail.command));
```

---

## Framework integration

### React / Next.js

Dedicated wrappers handle SSR, hydration, and prop forwarding (`'use client'` where needed):

```tsx
import {
  ClaudeCodeButton,
  CoworkButton,
  HermesButton,
  HermesSkillButton,
  OpenClawButton,
  ClawHermesButton,
  IronClawButton,
  NanoClawButton,
  ZeroClawButton,
  OpenHarnessButton,
  ClaudeClawButton,
} from 'agentbuttons/react';

function App() {
  return (
    <>
      <ClaudeCodeButton command="/my-skill" theme="branded" onCopy={(cmd) => console.log(cmd)} />
      <HermesButton command="/weekly-standup" theme="branded" onHbCopy={(e) => console.log(e.detail.command)} />
      <OpenClawButton command="Deploy the app" theme="branded" />
    </>
  );
}
```

Use **`ClawHermesButton`** when you need the OpenClaw-harness Hermes variant alongside **`HermesButton`** (Hermes Agent).

### Vue / Nuxt

```ts
import { createApp } from 'vue';
import { AgentButtonsPlugin } from 'agentbuttons/vue';
import App from './App.vue';

const app = createApp(App);
app.use(AgentButtonsPlugin);
app.mount('#app');
```

```vue
<template>
  <claude-code-button command="/my-skill" theme="branded" @cb-copy="onCopy" />
  <hermes-button command="/standup" theme="branded" @hb-copy="onHermesCopy" />
  <openclaw-button command="/deploy" theme="branded" @cb-copy="onCopy" />
</template>
```

The package also re-exports `ClaudeButtonsPlugin`, `HermesButtonsPlugin`, and `ClawButtonsPlugin` if you only need a subset.

### Svelte / Angular / Solid / Astro

Use standard custom element patterns: import `'agentbuttons'` (or the scoped package you need), declare unknown tags in your compiler config where required, and listen for `cb-*` / `hb-*` events on the host elements.

---

## Themes

| Theme | Role |
|-------|------|
| `branded` | Primary brand look **(default)** — exact colors depend on the agent (e.g. Claude terracotta, Hermes violet, OpenClaw red). |
| `branded-alt` | Secondary accent palette where supported. |
| `dark` | Dark surface, light text, agent-colored accents. |
| `light` | Light surface, dark text, agent-colored accents. |
| `system` | Follows `prefers-color-scheme` between light and dark. |

---

## Sizes

| Size | Typical height |
|------|----------------|
| `sm` | 2rem (~32px at default root font size) |
| `md` | 2.5rem (~40px) **(default)** |
| `lg` | 3rem (~48px) |

Sizes use `rem` and respect user font preferences.

---

## Variants

| Variant | Description |
|---------|-------------|
| `filled` | Solid fill **(default)** |
| `outline` | Border emphasis, transparent fill |
| `ghost` | Minimal chrome |

---

## Shapes

| Shape | Description |
|-------|-------------|
| `rounded` | Default corner radius **(default)** |
| `pill` | Fully rounded ends |
| `square` | Sharper corners |

---

## Events

All buttons dispatch native `CustomEvent`s with `bubbles: true` and `composed: true` (they cross Shadow DOM).

### `cb-*` (Claude Code, Cowork, OpenClaw-style harnesses)

| Event | Detail | Fired when |
|-------|--------|------------|
| `cb-copy` | `{ command: string }` on Claude Code / Cowork; `{ command: string, harness: string }` on harness buttons | Command copied to clipboard |
| `cb-open` | `{ command: string }` or `{ command, fullCommand?, harness }` | Primary action / popup opens |
| `cb-close` | — on Claude Code / Cowork; `{ harness: string }` on harness buttons | Popup closed |
| `cb-download` | `{ url: string }` | Skill package downloaded (**Cowork**; Hermes Skills uses `hb-download` below) |

### `hb-*` (Hermes Agent & Hermes Skills)

| Event | Detail | Fired when |
|-------|--------|------------|
| `hb-copy` | `{ command: string }` | Command copied to clipboard |
| `hb-open` | `{ command: string }` | Button clicked / popup opens |
| `hb-close` | — | Popup closed |
| `hb-download` | `{ url: string }` | Skill package downloaded (**Hermes Skills** only) |

---

## Programmatic API

```js
import {
  createClaudeCodeButton,
  createCoworkButton,
  createHermesButton,
  createHermesSkillButton,
  createClawButton,
} from 'agentbuttons';

const claude = createClaudeCodeButton({
  command: '/deploy --prod',
  theme: 'branded',
  onCopy: (cmd) => console.log('Copied:', cmd),
});

const openClaw = createClawButton('openclaw', {
  command: 'Run the migration',
  theme: 'branded',
});

document.getElementById('host')?.append(claude, openClaw);
```

`createClawButton` accepts a harness id: `'openclaw' | 'hermes' | 'ironclaw' | 'nanoclaw' | 'zeroclaw' | 'openharness' | 'claudeclaw'`.

---

## Structured data

```js
import { injectAllStructuredData } from 'agentbuttons';

injectAllStructuredData();
```

Scans the document for agent buttons and injects appropriate structured data helpers for discovery and rich results.

---

## Explicit registration

Registration normally runs when you import the package. For apps that need controlled timing:

```js
import { register } from 'agentbuttons';

register();
```

---

## Browser support

Works wherever [Custom Elements v1](https://caniuse.com/custom-elementsv1) is available:

| Browser | Minimum version |
|---------|-----------------|
| Chrome | 67+ |
| Firefox | 63+ |
| Safari | 10.1+ |
| Edge | 79+ |

---

## Built on

agentbuttons bundles and re-exports **[claudebuttons](https://www.npmjs.com/package/claudebuttons)**, **[hermesbuttons](https://www.npmjs.com/package/hermesbuttons)**, and **[clawbuttons](https://www.npmjs.com/package/clawbuttons)**. Each npm page lists the canonical source repository when published.

---

## License

MIT
