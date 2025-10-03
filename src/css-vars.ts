import { BetterLinksSettings } from './settings';

export function applyCSSVars(settings: BetterLinksSettings) {
  const root = document.documentElement;

  root.style.setProperty('--better-internal-fg', settings.internalFg);
  root.style.setProperty('--better-internal-fg-hover', settings.internalFgHover);
  root.style.setProperty('--better-internal-underline-hover', settings.internalUnderlineHover);

  root.style.setProperty('--better-external-fg', settings.externalFg);
  root.style.setProperty('--better-external-fg-hover', settings.externalFgHover);
  root.style.setProperty('--better-external-underline-hover', settings.externalUnderlineHover);

  root.style.setProperty('--better-underline-enabled', settings.underlineEnabled ? '1' : '0');
}
