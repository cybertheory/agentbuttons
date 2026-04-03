import 'react';

interface PreferredButtonAttributes {
  agents?: string;
  command?: string;
  'skill-url'?: string;
  theme?: string;
  size?: string;
  variant?: string;
  shape?: string;
  popup?: string | boolean;
  'prompt-flag'?: string | boolean;
  'popup-title'?: string;
  'popup-description'?: string;
  'auto-launch'?: string | boolean;
  'data-resolved-agent'?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'preferred-button': PreferredButtonAttributes &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }

  interface HTMLElementTagNameMap {
    'preferred-button': HTMLElement;
  }
}

declare module 'vue' {
  interface GlobalComponents {
    'preferred-button': PreferredButtonAttributes;
  }
}

export {};
