window.__ModuleLoader__.load({
  id: '@local/terminal-skin',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const ALIAS = (name) => `--dsw-alias-${name}`;

    const FONT_STACK = 'Consolas, NSimSun, "新宋体", "Microsoft YaHei", monospace';

    const VERSION = '0.10.6';

    /**
     * The shell draws its chrome from an icon sprite. A theme may hand back a whole
     * SVG document per symbol id, so the skin swaps the pictograms for the character
     * a terminal would print in that place. Ids look like
     * `dsw-icon-<glyph>-<weight>` with weights `regular` and `medium`.
     */
    const ICON_GLYPHS = {
      'plus-outline': '+',
      'close-outline': 'x',
      'close-fill': 'x',
      'new-chat-outline': '+',
      'send-outline': '>',
      'paper-plane-outline': '>',
      'chevron-down-outline': 'v',
      'chevron-up-outline': '^',
      'chevron-left-outline': '<',
      'chevron-right-outline': '>',
      'chevrons-up-down-outline': '^v',
      'ellipsis-outline': '...',
      'search-outline': '?',
      'settings-outline': '*',
      'panel-left-outline': '«',
      'panel-right-outline': '»',
      'folder-open-outline': '[/]',
      'folder-close-outline': '[]',
      'user-outline': '@',
      'users-outline': '@@',
      'trash-outline': 'x',
      'copy-outline': '=',
      'check-outline': 'ok',
      'check-circle-outline': 'ok',
      'check-circle-fill': 'ok',
      'warning-outline': '!',
      'warning-triangle-outline': '!',
      'info-outline': 'i',
      'question-outline': '?',
      'clock-outline': 'o',
      'alarm-clock-outline': 'o',
      'play-outline': '>',
      'pause-outline': '||',
      'stop-fill': 'x',
      'refresh-outline': '↻',
      'link-outline': '@',
      'code-outline': '</>',
      'download-outline': 'v',
      'upload-outline': '^',
      'share-outline': '@',
      'pin-outline': '*',
      'pin-fill': '*',
      'sparkle': '*',
      'globe-outline': '@',
      'layers-outline': '=',
      'flat-list-outline': '-',
      'workspace-tree-outline': '=',
      'drag-handle-outline': '=',
      'branch-outline': '>',
      'api-outline': '@',
      'data-outline': '=',
      'database-outline': '=',
      'archive-outline': '[',
      'unarchive-outline': ']',
      'inspect-outline': '?',
      'gauge-outline': '=',
      'compact-outline': '=',
      'fullscreen-outline': '[]',
      'personalization-outline': '*',
      'paperclip-outline': '@',
      'microphone-outline': 'o',
      'eye-outline': 'o',
      'eye-off-outline': '-',
      'edit-outline': '/',
      'save-outline': '=',
      'share-outline-': '@',
      'skill-outline': '*',
      'goal-outline': '*',
      'plan-outline': '*',
      'think-outline': '*',
      'queue-outline': '=',
      'tree-corner': '|',
      'triangle-right-fill': '>',
      'like-outline': '+',
      'dislike-outline': '-',
      'list-pen-outline': '=',
      'browse-outline': '?',
      'enhance-outline': '*',
      'deliver-doc': '[]',
      'agent-preset-outline': '*',
      'cordis-plugin-outline': '*',
      'plugin-pinwheel-outline': '+',
      'apps-add-outline': '::',
      'clock-outline': '◷',
      'wrap-fill': '=',
      'nowrap-fill': '=',
      'wrap-lines-outline': '=',
      'sliders-two-outline': '=',
      'switch-outline': '=',
      'stop-fill-': 'x',
      'light-outline': '*',
      'dark-outline': '*',
      'followsystem-outline': '*',
      'right-up-outline': '>',
      'context-injection-outline': '>',
      'loading-outline': 'o',
      'flat-list': '-',
    };

    const escapeXml = (value) =>
      value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const iconDocument = (glyph) => {
      const length = Array.from(glyph).length;
      const size = length <= 1 ? 12 : length === 2 ? 9.5 : 7.5;
      const baseline = length <= 1 ? 12 : 11.8;
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">' +
        `<text x="8" y="${baseline}" text-anchor="middle" font-family="Consolas, monospace" ` +
        `font-size="${size}" font-weight="600" fill="currentColor">${escapeXml(glyph)}</text></svg>`
      );
    };

    const ICON_REPLACEMENTS = (() => {
      const replacements = {};
      for (const [glyph, character] of Object.entries(ICON_GLYPHS)) {
        const document = iconDocument(character);
        replacements[`dsw-icon-${glyph}-regular`] = document;
        replacements[`dsw-icon-${glyph}-medium`] = document;
      }
      return replacements;
    })();

    /**
     * One palette per terminal flavour. `id` is the theme id the shell registers;
     * `key` is the value of the root attribute that selects the CSS block below.
     * Every colour here is picked by hand against a black console, so a palette is
     * a complete look, not a hue rotation.
     */
    const PALETTES = [
      {
        key: 'green',
        id: 'terminal-green',
        label: '终端 · 绿',
        accent: '#7ee08a',
        accentHover: '#9bf0a4',
        accentDim: 'rgba(126, 224, 138, 0.18)',
        accentSoft: 'rgba(126, 224, 138, 0.12)',
        bg0: '#060806',
        bg1: '#0a0d0a',
        bg2: '#101510',
        bg3: '#151c15',
        bubble: '#0d130d',
        input: '#0b100b',
        line1: '#263826',
        line2: '#3a523a',
        line3: '#4d6a4d',
        text: '#d8e4d5',
        textDim: '#96a896',
        textFaint: '#71806f',
        hover: 'rgba(126, 224, 138, 0.08)',
        active: 'rgba(126, 224, 138, 0.14)',
        info: '#79c9c2',
        warn: '#e0ba78',
        error: '#e08a80',
        errorSoft: 'rgba(224, 138, 128, 0.14)',
        codeBg: '#080c08',
        codeLine: '#1b261b',
      },
      {
        key: 'amber',
        id: 'terminal-amber',
        label: '终端 · 琥珀',
        accent: '#ffb454',
        accentHover: '#ffc978',
        accentDim: 'rgba(255, 180, 84, 0.2)',
        accentSoft: 'rgba(255, 180, 84, 0.12)',
        bg0: '#0a0805',
        bg1: '#100d08',
        bg2: '#18130b',
        bg3: '#1f180e',
        bubble: '#14100a',
        input: '#120e08',
        line1: '#3a2e1a',
        line2: '#574425',
        line3: '#6d5730',
        text: '#f2e3c8',
        textDim: '#bda37a',
        textFaint: '#97845f',
        hover: 'rgba(255, 180, 84, 0.08)',
        active: 'rgba(255, 180, 84, 0.16)',
        info: '#e0c68a',
        warn: '#ffcf7a',
        error: '#e07050',
        errorSoft: 'rgba(224, 112, 80, 0.16)',
        codeBg: '#0d0a06',
        codeLine: '#2b2314',
      },
      {
        key: 'black',
        id: 'terminal-black',
        label: '终端 · 纯黑',
        accent: '#f2f2f2',
        accentHover: '#ffffff',
        accentDim: 'rgba(242, 242, 242, 0.16)',
        accentSoft: 'rgba(242, 242, 242, 0.1)',
        bg0: '#000000',
        bg1: '#060606',
        bg2: '#0d0d0d',
        bg3: '#141414',
        bubble: '#080808',
        input: '#070707',
        line1: '#2a2a2a',
        line2: '#3f3f3f',
        line3: '#565656',
        text: '#e6e6e6',
        textDim: '#a6a6a6',
        textFaint: '#808080',
        hover: 'rgba(255, 255, 255, 0.07)',
        active: 'rgba(255, 255, 255, 0.13)',
        info: '#a8a8a8',
        warn: '#bdbdbd',
        error: '#d8d8d8',
        errorSoft: 'rgba(255, 255, 255, 0.1)',
        codeBg: '#030303',
        codeLine: '#1a1a1a',
      },
    ];

    const PALETTE_BY_ID = new Map(PALETTES.map((palette) => [palette.id, palette]));
    const PALETTE_BY_KEY = new Map(PALETTES.map((palette) => [palette.key, palette]));

    /**
     * The high-contrast variant keeps the hue and lifts the ink and the rules:
     * body text approaches white, secondary text stays legible, and every
     * hairline gains a step of luminance so panes read apart on a dark screen.
     */
    const CONTRAST = {
      green: {
        text: '#f1faf0',
        textDim: '#c2d1c0',
        textFaint: '#96a795',
        line1: '#3d5a3f',
        line2: '#587b5a',
        line3: '#6f9a70',
        bubble: '#111a11',
        input: '#0e150e',
        codeBg: '#0a110a',
        codeLine: '#33502f',
        accent: '#8ef29c',
        accentHover: '#a9ffb5',
      },
      amber: {
        text: '#fff4e2',
        textDim: '#d9c096',
        textFaint: '#b0976a',
        line1: '#5a4525',
        line2: '#7d6032',
        line3: '#a37d3f',
        bubble: '#171108',
        input: '#140f07',
        codeBg: '#0f0b05',
        codeLine: '#4d3c1e',
        accent: '#ffc46e',
        accentHover: '#ffd694',
      },
      black: {
        text: '#ffffff',
        textDim: '#c9c9c9',
        textFaint: '#9e9e9e',
        line1: '#3d3d3d',
        line2: '#575757',
        line3: '#6e6e6e',
        bubble: '#0f0f0f',
        input: '#0c0c0c',
        codeBg: '#080808',
        codeLine: '#333333',
        accent: '#ffffff',
        accentHover: '#ffffff',
      },
    };

    const withContrast = (palette, all) => (all ? { ...palette, ...CONTRAST[palette.key] } : palette);

    const THEME_IDS = PALETTES.map((palette) => palette.id);
    const DEFAULT_PALETTE = PALETTES[0];

    /** Short names for the settings switch. */
    const PALETTE_LABELS = {
      green: '绿色',
      amber: '琥珀',
      black: '纯黑',
    };

    /** The public theme contract: exactly these tokens are overridable through ctx.theme. */
    const themeTokens = (p) => ({
      [ALIAS('bg-base')]: p.bg0,
      [ALIAS('bg-layer-1')]: p.bg1,
      [ALIAS('bg-layer-2')]: p.bg2,
      [ALIAS('bg-overlay')]: p.bg0,
      [ALIAS('border-l1')]: p.line1,
      [ALIAS('border-l2')]: p.line2,
      [ALIAS('brand-primary')]: p.accent,
      [ALIAS('label-primary')]: p.text,
      [ALIAS('label-secondary')]: p.textDim,
      [ALIAS('state-error-primary')]: p.error,
      [ALIAS('state-idle-primary')]: p.textFaint,
      [ALIAS('state-success-primary')]: p.accent,
      [ALIAS('state-warn-primary')]: p.warn,
      '--dsw-specific-sidebar-fill': p.bg1,
    });

    /**
     * The shell paints far more surfaces than the fourteen public tokens reach, so the
     * skin layer also re-points the internal variables those surfaces read. Only names
     * that exist in the running stylesheet are listed; unknown names are inert.
     */
    const skinVariables = (p) => ({
      // surfaces
      '--dsw-alias-bg-layer-3': p.bg3,
      '--dsw-alias-bg-skeleton': p.bg2,
      '--dsw-alias-bg-document-preview': p.bg1,
      '--dsw-alias-bg-document-selection': p.active,
      '--dsw-alias-bg-multi-select': p.active,
      '--dsw-alias-bg-module-platform': p.bg2,
      '--dsw-alias-bg-mask-1': 'rgba(0, 0, 0, 0.5)',
      '--dsw-alias-bg-mask-2': 'rgba(0, 0, 0, 0.65)',
      '--dsw-alias-bg-mask-3': 'rgba(0, 0, 0, 0.8)',
      '--dsw-alias-card-fill': p.bg1,
      '--dsw-alias-card-fill-hover': p.bg2,
      '--dsw-alias-card-tile-fill': p.bg1,
      '--dsw-alias-hovercard-bg': p.bg2,
      '--dsw-menu-surface-fill': p.bg2,
      '--dsw-alias-menu-group-header-fill': p.bg1,
      '--dsw-alias-settings-card-fill': p.bg1,
      '--dsw-alias-settings-card-stroke': p.line1,
      '--dsw-alias-toast-bg': p.bg2,
      '--dsw-alias-toast-label': p.text,
      '--dsw-alias-toast-action': p.accent,
      '--dsw-alias-tooltip-bg': p.bg2,
      '--dsw-alias-tooltip-label': p.text,
      '--dsw-alias-tooltip-key-bg': p.bg3,
      '--dsw-alias-turn-trigger-bg': p.bg1,
      '--dsw-alias-turn-trigger-bg-hover': p.bg2,
      // structural lines
      '--dsw-alias-border-l3': p.line3,
      '--dsw-alias-border-l4': p.line3,
      '--dsw-alias-border-selected': p.accent,
      '--dsw-alias-border-inverted': p.textDim,
      '--dsw-alias-border-inverted2': p.line3,
      '--dsw-alias-border-l2-darkmode-thin': p.line1,
      '--dsw-elevation-stroke': p.line1,
      '--dsw-elevation-stroke-color': p.line1,
      '--dsw-elevation-panel': 'none',
      '--dsw-elevation-soft': 'none',
      '--dsw-elevation-prominent': 'none',
      '--dsw-shadow-lv1': 'none',
      '--dsw-shadow-lv2': 'none',
      '--dsw-shadow-lv3': 'none',
      // buttons and interactive fills
      '--dsw-alias-button-primary-fill': p.accent,
      '--dsw-alias-button-primary-hover': p.accentHover,
      '--dsw-alias-button-primary-dimmed': p.accentDim,
      '--dsw-alias-button-contrast-fill': p.text,
      '--dsw-alias-button-elevated-fill': p.bg2,
      '--dsw-alias-button-floating-fill': p.bg1,
      '--dsw-alias-button-floating-hover': p.bg2,
      '--dsw-alias-button-info-fill': p.info,
      '--dsw-alias-button-info-hover': p.info,
      '--dsw-alias-button-tool-bar-fill': p.bg1,
      '--dsw-alias-button-tool-bar-fill-invisible': 'transparent',
      '--dsw-alias-button-tool-bar-hover': p.bg3,
      '--dsw-alias-button-ghost-active-fill': p.bg3,
      '--dsw-alias-button-ghost-active-hover': p.bg3,
      '--dsw-alias-button-ghost-active-border': p.line2,
      '--dsw-alias-interactive-bg-hover': p.hover,
      '--dsw-alias-interactive-bg-active': p.active,
      '--dsw-alias-interactive-bg-hover-solid': p.bg3,
      '--dsw-alias-interactive-bg-hover-accent': p.accentSoft,
      '--dsw-alias-interactive-bg-hover-danger': p.errorSoft,
      // text
      '--dsw-alias-label-tertiary': p.textFaint,
      '--dsw-alias-label-caption': p.textFaint,
      '--dsw-alias-label-dimmed': p.textDim,
      '--dsw-alias-label-primary-dimmed': p.textDim,
      '--dsw-alias-label-on-color': p.bg0,
      '--dsw-alias-label-primary-inverted': p.bg0,
      '--dsw-alias-label-primary-bluish': p.text,
      '--dsw-alias-label-deep-diving': p.accent,
      '--dsw-alias-label-shimmer': p.accentHover,
      '--dsw-alias-brand-text': p.accent,
      '--dsw-alias-brand-primary-invert': p.bg0,
      '--dsw-alias-link': p.accent,
      '--dsw-focus-ring-color': p.accent,
      // markdown and code
      '--dsw-alias-markdown-code-block': p.codeBg,
      '--dsw-alias-markdown-code-block-banner': p.codeLine,
      '--dsw-alias-markdown-inline-code': p.codeBg,
      '--dsw-alias-markdown-placeholder': p.textFaint,
      '--dsw-alias-markdown-citation': p.accent,
      '--dsw-alias-markdown-tag': p.textDim,
      '--shiki-background': p.codeBg,
      '--shiki-foreground': p.text,
      '--shiki-token-comment': p.textFaint,
      '--shiki-token-keyword': p.accent,
      '--shiki-token-string': p.warn,
      '--shiki-token-constant': p.info,
      '--shiki-token-function': p.accentHover,
      '--shiki-token-parameter': p.text,
      '--shiki-token-punctuation': p.textDim,
      '--shiki-token-link': p.accent,
      '--shiki-token-string-expression': p.warn,
      '--dsw-alias-code-diff-added': p.accentSoft,
      '--dsw-alias-code-diff-deleted': p.errorSoft,
      '--dsw-alias-file-diff-added-bg': p.accentSoft,
      '--dsw-alias-file-diff-deleted-bg': p.errorSoft,
      // scrollbars
      '--dsw-alias-scrollbar-bg-l1': 'transparent',
      '--dsw-alias-scrollbar-bg-l2': 'transparent',
      '--dsw-alias-scrollbar-hover-l1': p.line2,
      '--dsw-alias-scrollbar-hover-l2': p.line2,
      '--dsw-scrollbar-thumb': p.line2,
      '--dsw-scrollbar-thumb-hover': p.accent,
      '--dsw-scrollbar-thumb-border': p.bg0,
      // composer and sidebar specifics
      '--dsw-specific-input-major': p.input,
      '--dsw-specific-bubble': p.bubble,
      '--dsw-specific-bubble-highlight': p.bg3,
      '--dsw-specific-menu': p.bg2,
      '--dsw-specific-tip': p.bg2,
      '--dsw-specific-selector': p.bg2,
      '--dsw-specific-login-input': p.input,
      '--dsw-specific-file-upload-track': p.line1,
      '--dsw-specific-sidebar-tint': p.bg0,
      '--dsw-specific-sidebar-fill': p.bg1,
      '--dsw-specific-sidebar-nav-item-active': p.active,
      '--dsw-specific-sidebar-nav-item-active-accent': p.accent,
      '--dsw-specific-sidebar-glass-fill': p.bg1,
      '--dsw-specific-sidebar-glass-collapsed-fill': p.bg1,
      '--dsw-specific-sidebar-glass-collapsed-hover': p.bg2,
      '--dsw-specific-sidebar-wash-top': p.bg0,
      '--dsw-specific-sidebar-wash-top-clear': 'transparent',
      '--dsw-specific-sidebar-wash-bottom': p.bg0,
      '--dsw-specific-sidebar-wash-bottom-clear': 'transparent',
      '--dsw-specific-sidebar-right-flash': p.accentSoft,
      '--sidebar-right-flash-color': p.accent,
      // geometry + type
      '--dsw-radius-xs': '0px',
      '--dsw-radius-sm': '0px',
      '--dsw-radius-md': '0px',
      '--dsw-radius-lg': '0px',
      '--dsw-radius-xl': '0px',
      '--dsw-radius-panel': '0px',
      '--dsl-code-block-border-radius': '0px',
      '--dsl-search-radius': '0px',
      '--dsl-guide-entry-radius': '0px',
      '--dsl-web-radius': '0px',
      '--dsh-windows-content-radius': '0px',
      '--dsw-font-family': FONT_STACK,
      '--dsw-font-family-brand': FONT_STACK,
      '--ds-font-family-code': FONT_STACK,
      '--dsh-font-family-text-default': FONT_STACK,
      '--dsh-font-family-code-default': FONT_STACK,
      '--dsl-terminal-font': FONT_STACK,
      // the skin's own palette handles, read by the component rules below
      '--dsl-term-bubble': p.bubble,
      '--dsl-term-card': p.bg1,
      '--dsl-term-input': p.input,
      '--dsl-term-line': p.line1,
      '--dsl-term-line-strong': p.line2,
      '--dsl-term-accent': p.accent,
      '--dsl-term-accent-soft': p.accentSoft,
      '--dsl-term-hover': p.hover,
      '--dsl-term-active': p.active,
      '--dsl-term-text': p.text,
      '--dsl-term-dim': p.textDim,
      '--dsl-term-faint': p.textFaint,
    });

    const declarations = (variables) =>
      Object.entries(variables)
        .map(([name, value]) => `  ${name}: ${value};`)
        .join('\n');

    /** Structural rules: square corners, mono type, console chrome. */
    const BASE_CSS = `
html[data-dsh-terminal] {
  color-scheme: dark;
  caret-color: var(--dsw-alias-brand-primary, #7ee08a);
}

html[data-dsh-terminal] *,
html[data-dsh-terminal] *::before,
html[data-dsh-terminal] *::after {
  border-radius: 0 !important;
  box-shadow: none !important;
  font-family: ${FONT_STACK} !important;
  font-variant-ligatures: none !important;
}

html[data-dsh-terminal] body {
  letter-spacing: 0;
  /* The rail animates a width; layout containment keeps the transcript from
     being re-laid-out by every intermediate frame of unrelated panes. */
  contain: layout;
}

html[data-dsh-terminal] [class*="centerCol"],
html[data-dsh-terminal] [class*="rightbarCol"] {
  contain: layout;
}

html[data-dsh-terminal] [class*="sidebarCol"] {
  transition-duration: 0.13s !important;
}

/* Off-screen transcript rows skip layout while the rail resizes. */
html[data-dsh-terminal] [class*="flowItem"] {
  content-visibility: auto;
  contain-intrinsic-size: auto 72px;
}

html[data-dsh-terminal] body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  /* Promotion keeps the scanline layer off the repaint path of the chrome. */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  background: repeating-linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.014) 0px,
    rgba(255, 255, 255, 0.014) 1px,
    transparent 1px,
    transparent 3px
  );
}

html[data-dsh-terminal] ::selection {
  background: color-mix(in srgb, var(--dsw-alias-brand-primary, #7ee08a) 32%, transparent);
}

html[data-dsh-terminal] ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

html[data-dsh-terminal] ::-webkit-scrollbar-track {
  background: transparent;
}

html[data-dsh-terminal] ::-webkit-scrollbar-thumb {
  background: var(--dsw-alias-border-l2, #2d402d);
  border: 3px solid transparent;
  background-clip: padding-box;
}

html[data-dsh-terminal] ::-webkit-scrollbar-thumb:hover {
  background: var(--dsw-alias-brand-primary, #7ee08a);
  background-clip: padding-box;
}
`;

    /**
     * Component skin. The shell's own surfaces read literal colours or variables the
     * public contract does not expose, so the skin also touches the stable half of the
     * CSS-Modules class names: `<buildHash>_<localName>` keeps `localName` across
     * releases, which makes substring selectors survive a rebuild.
     */
    const COMPONENT_CSS = `
html[data-dsh-terminal] [class*="_bubble"] {
  background: var(--dsl-term-bubble) !important;
  border: 1px solid var(--dsl-term-line);
}

html[data-dsh-terminal] [class*="_card"] {
  background: var(--dsl-term-card) !important;
  border: 1px solid var(--dsl-term-line) !important;
}

html[data-dsh-terminal] [class*="_file"],
html[data-dsh-terminal] [class*="_fileCard"],
html[data-dsh-terminal] [class*="_presented"] [class*="_file"] {
  background: var(--dsl-term-card) !important;
  border: 1px solid var(--dsl-term-line) !important;
}

html[data-dsh-terminal] [class*="_primary"] {
  background: transparent !important;
  border: 1px solid var(--dsl-term-accent) !important;
  color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_primary"] svg,
html[data-dsh-terminal] [class*="_primary"] path {
  color: var(--dsl-term-accent) !important;
  fill: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_primary"]:hover {
  background: var(--dsl-term-accent-soft) !important;
}

html[data-dsh-terminal] [class*="_sessionRow"]:hover,
html[data-dsh-terminal] [class*="panelRow"]:hover,
html[data-dsh-terminal] [class*="projectRow"]:hover,
html[data-dsh-terminal] [class*="sessionRow"]:hover {
  background: var(--dsl-term-hover) !important;
  box-shadow: inset 2px 0 0 var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_sessionRow"][class*="_selected"],
html[data-dsh-terminal] [class*="sessionRow"][class*="selected"],
html[data-dsh-terminal] [class*="sessionRow"][aria-selected='true'],
html[data-dsh-terminal] [class*="panelRow"][class*="ctive"],
html[data-dsh-terminal] [class*="panelRow"][class*="Active"],
html[data-dsh-terminal] [class*="panelRow"][class*="current"],
html[data-dsh-terminal] [class*="panelRow"][aria-current],
html[data-dsh-terminal] [class*="panelEntry"][class*="ctive"] [class*="panelRow"],
html[data-dsh-terminal] [class*="panelEntry"][class*="Act"] [class*="panelRow"],
html[data-dsh-terminal] [aria-current] > [class*="panelRow"],
html[data-dsh-terminal] [class*="projectRow"][class*="ctive"] {
  background: var(--dsl-term-active) !important;
  box-shadow: inset 2px 0 0 var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_tab"] {
  border-bottom: 1px solid transparent;
  color: var(--dsl-term-dim) !important;
}

html[data-dsh-terminal] [class*="_tab"]:hover {
  background: var(--dsl-term-hover) !important;
}

html[data-dsh-terminal] [class*="_tabActive"] {
  color: var(--dsl-term-accent) !important;
  border-bottom-color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_pill"] {
  border: 1px solid var(--dsl-term-line) !important;
  color: var(--dsl-term-dim) !important;
}

html[data-dsh-terminal] [class*="_pill"]:hover {
  border-color: var(--dsl-term-accent) !important;
  color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_toolbar"],
html[data-dsh-terminal] [class*="_header"] {
  background: var(--dsl-term-card) !important;
}

/* Every button is a bracket in a terminal: no filled pills. */
html[data-dsh-terminal] button {
  background-color: transparent !important;
  border-color: transparent;
  color: var(--dsl-term-text);
}

html[data-dsh-terminal] button:hover {
  background-color: var(--dsl-term-hover) !important;
  color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] button[class*="_newSession"],
html[data-dsh-terminal] button[class*="_compose"],
html[data-dsh-terminal] button[class*="_secondary"] {
  border: 1px solid var(--dsl-term-line-strong) !important;
}

/* --- prompt prefix: the composer reads like a shell prompt --------------- */
html[data-dsh-terminal] [class*="composerSeat"] [class*="card"]::before {
  content: '>';
  position: absolute;
  top: 7px;
  left: -16px;
  color: var(--dsl-term-accent);
  font-weight: 700;
  pointer-events: none;
}

html[data-dsh-terminal] [class*="composerSeat"] [class*="input"] {
  padding-left: 22px !important;
}

/* --- transcript gutter: clock over who spoke, in the left margin --------- */
html[data-dsh-terminal] [class*="flowItem"] {
  position: relative;
}

/* Every row keeps the same left margin so tool lines align with prose. */
html[data-dsh-terminal][data-dsh-terminal-gutter='on'] [class*="flowItem"] {
  padding-left: 62px;
}

html[data-dsh-terminal] [class*="flowItem"][data-clock]::before {
  content: attr(data-clock);
  position: absolute;
  top: 1px;
  left: 2px;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.02em;
  color: var(--dsl-term-faint);
  pointer-events: none;
}

html[data-dsh-terminal] [class*="flowItem"][data-gutter]::after {
  content: attr(data-gutter);
  position: absolute;
  top: 14px;
  left: 2px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.04em;
  color: var(--dsl-term-faint);
  pointer-events: none;
}

html[data-dsh-terminal] [class*="flowItem"][data-gutter='dsh']::after {
  color: var(--dsl-term-accent);
}

/* Off: the transcript keeps its plain left margin. */
html[data-dsh-terminal][data-dsh-terminal-gutter='off'] [class*="flowItem"]::before,
html[data-dsh-terminal][data-dsh-terminal-gutter='off'] [class*="flowItem"]::after {
  content: none !important;
}

html[data-dsh-terminal][data-dsh-terminal-gutter='off'] [class*="flowItem"] {
  padding-left: 0 !important;
}

/* Before the clock is known the label alone still marks the speaker. */
html[data-dsh-terminal] [class*="flowItem"]:has([class*="_bubble"]):not([data-gutter])::before {
  content: 'you';
  top: 2px;
  font-size: 12px;
  line-height: 14px;
}

html[data-dsh-terminal] [class*="flowItem"]:has([class*="_markdown"]):not([data-gutter])::before {
  content: 'dsh';
  top: 2px;
  font-size: 12px;
  line-height: 14px;
  color: var(--dsl-term-accent);
}

/* Card internals never draw their own frame — only the outer card does. */
html[data-dsh-terminal] [class*="cardHead"],
html[data-dsh-terminal] [class*="cardEnd"],
html[data-dsh-terminal] [class*="cardLink"],
html[data-dsh-terminal] [class*="cardBody"],
html[data-dsh-terminal] [class*="cardMain"],
html[data-dsh-terminal] [class*="cardFoot"] {
  border: 0 !important;
  background: transparent !important;
}

/* Switches are square toggles: a bordered track with a solid block thumb. */
html[data-dsh-terminal] [class*="_switch"] {
  background: var(--dsl-term-panel) !important;
  border: 1px solid var(--dsl-term-line-strong) !important;
  border-radius: 0 !important;
  padding: 1px !important;
}

html[data-dsh-terminal] [class*="_switch"][aria-checked='true'] {
  background: var(--dsl-term-hover) !important;
  border-color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_thumb"] {
  background: var(--dsl-term-dim) !important;
  border-radius: 0 !important;
}

html[data-dsh-terminal] [class*="_switch"][aria-checked='true'] [class*="_thumb"] {
  background: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="_switch"]:hover {
  border-color: var(--dsl-term-accent) !important;
}

/* --- panes are separated by a hairline ----------------------------------- */
html[data-dsh-terminal] [class*="sidebarCol"] {
  border-right: 1px solid var(--dsl-term-line);
}

/* --- transcript ink: assistant body, tool rows, reasoning ---------------- */
html[data-dsh-terminal] [class*="_markdown"] {
  font-size: 13px !important;
  line-height: 20px !important;
  color: var(--dsl-term-text) !important;
}

html[data-dsh-terminal] [class*="_markdown"] p,
html[data-dsh-terminal] [class*="_markdown"] li,
html[data-dsh-terminal] [class*="_markdown"] td {
  color: var(--dsl-term-text) !important;
}

html[data-dsh-terminal] [class*="_markdown"] strong {
  color: #e8f0e4 !important;
  font-weight: 600;
}

html[data-dsh-terminal] [class*="_markdown"] h1,
html[data-dsh-terminal] [class*="_markdown"] h2,
html[data-dsh-terminal] [class*="_markdown"] h3,
html[data-dsh-terminal] [class*="_markdown"] h4 {
  color: var(--dsl-term-text) !important;
  font-weight: 600;
  letter-spacing: 0.02em;
}

html[data-dsh-terminal] [class*="_markdown"] h2::before {
  content: ':: ';
  color: var(--dsl-term-accent);
}

html[data-dsh-terminal] [class*="_markdown"] h3::before {
  content: '# ';
  color: var(--dsl-term-faint);
}

html[data-dsh-terminal] [class*="_markdown"] a {
  color: var(--dsl-term-cyan) !important;
  text-decoration: underline;
  text-underline-offset: 2px;
}

html[data-dsh-terminal] [class*="_markdown"] blockquote {
  margin: 8px 0;
  padding-left: 10px;
  border-left: 1px solid var(--dsl-term-line-strong);
  color: var(--dsl-term-dim) !important;
}

html[data-dsh-terminal] [class*="_markdown"] code {
  background: var(--dsl-term-panel) !important;
  border: 1px solid var(--dsl-term-line-strong) !important;
  color: var(--dsl-term-accent) !important;
  font-weight: 500;
}

html[data-dsh-terminal] [class*="_markdown"] pre,
html[data-dsh-terminal] [class*="_markdown"] pre code,
html[data-dsh-terminal] [class*="_markdown"] [class*="codeBlock"] {
  background: var(--dsl-term-panel) !important;
  border: 1px solid var(--dsl-term-line) !important;
  color: var(--dsl-term-text) !important;
}

html[data-dsh-terminal] [class*="_markdown"] table,
html[data-dsh-terminal] [class*="_markdown"] th,
html[data-dsh-terminal] [class*="_markdown"] td {
  border-color: var(--dsl-term-line) !important;
}

html[data-dsh-terminal] [class*="_markdown"] th {
  color: var(--dsl-term-dim) !important;
  font-weight: 500;
}

html[data-dsh-terminal] [class*="_markdown"] hr {
  border-color: var(--dsl-term-line) !important;
}

/* Tool calls: dim text, cyan glyphs, red only when the call failed. */
html[data-dsh-terminal] [class*="callRow"] {
  color: var(--dsl-term-dim) !important;
}

html[data-dsh-terminal] [class*="callRow"] svg {
  color: var(--dsl-term-cyan);
}

html[data-dsh-terminal] [class*="callRow"] code {
  color: var(--dsl-term-accent) !important;
  background: transparent !important;
  border: 0 !important;
}

html[data-dsh-terminal] [class*="callRow"] [data-state="error"],
html[data-dsh-terminal] [class*="callRow"] [data-state="failed"] {
  color: var(--dsl-term-red) !important;
}

/* Reasoning: the quietest ink on the screen. */
html[data-dsh-terminal] [class*="iFrn8G_root"] {
  color: var(--dsl-term-faint) !important;
}

html[data-dsh-terminal] [class*="iFrn8G_root"] svg {
  color: var(--dsl-term-faint);
}

/* The user's own words stay readable, but the box is a frame, not a card. */
html[data-dsh-terminal] [class*="_bubble"] {
  background: var(--dsl-term-panel) !important;
  border: 1px solid var(--dsl-term-line) !important;
  font-size: 13px !important;
  line-height: 20px !important;
  color: var(--dsl-term-text) !important;
}

/* --- sidebar: a rail of labelled text rows ------------------------------- */
html[data-dsh-terminal] [class*="panelList"]::before {
  content: ':: 导航';
  display: block;
  margin: 0 0 6px;
  padding: 0 10px;
  color: var(--dsl-term-faint);
  font-size: 11px;
  letter-spacing: 0.08em;
}

html[data-dsh-terminal] [class*="sectionLabel"]::before {
  content: ':: ';
  color: var(--dsl-term-faint);
}

/* The marker never wraps; the rail simply clips it. */
html[data-dsh-terminal] [class*="panelList"]::before {
  white-space: nowrap;
  overflow: hidden;
}

/* --- brand: a text wordmark instead of the whale artwork ------------------ */
html[data-dsh-terminal] [class*="brandMark"] > *,
html[data-dsh-terminal] [class*="brandName"] > * {
  display: none !important;
}

html[data-dsh-terminal] [class*="brandMark"]::before {
  content: '▚';
  color: var(--dsl-term-accent);
  font-size: 15px;
  line-height: 18px;
}

html[data-dsh-terminal] [class*="brandName"]::before {
  content: 'deepseek-harness';
  color: var(--dsl-term-text);
  font-size: 13px;
  letter-spacing: 0.02em;
}

html[data-dsh-terminal] [class*="brandName"]::after {
  content: var(--dsl-term-version, '');
  color: var(--dsl-term-faint);
  font-size: 11px;
}

/* The rail swaps the wordmark for a compact mark of its own. */
html[data-dsh-terminal] [class*="railMark"] > * {
  display: none !important;
}

html[data-dsh-terminal] [class*="railMark"]::before {
  content: '▚';
  color: var(--dsl-term-accent);
  font-size: 15px;
  line-height: 18px;
}

/* --- footer account row ---------------------------------------------- */
html[data-dsh-terminal] [class*="settingsArea"] [class*="avatar"] {
  position: relative;
  background: var(--dsl-term-accent) !important;
  border: 1px solid var(--dsl-term-line-strong);
  overflow: hidden;
}

html[data-dsh-terminal] [class*="settingsArea"] [class*="avatar"] img {
  display: block;
  width: 100%;
  height: 100%;
  filter: grayscale(1) brightness(0.92) contrast(1.3);
  mix-blend-mode: multiply;
}

/* Original colours win over the duotone treatment when the switch says so. */
html[data-dsh-terminal][data-dsh-terminal-avatar='color'] [class*="settingsArea"] [class*="avatar"] {
  background: transparent !important;
}

html[data-dsh-terminal][data-dsh-terminal-avatar='color'] [class*="settingsArea"] [class*="avatar"] img {
  filter: none !important;
  mix-blend-mode: normal !important;
}

html[data-dsh-terminal] [class*="settingsArea"] [class*="label"]::before {
  content: '@';
  color: var(--dsl-term-accent);
}

html[data-dsh-terminal] [class*="settingsArea"] [class*="label"]::after {
  content: '● Online';
  margin-left: 8px;
  color: var(--dsl-term-accent);
  font-size: 11px;
  letter-spacing: 0;
}

/* The rail has no room for the decorations. */
html[data-dsh-terminal] [class*="sidebarCol"]:has(button[class*="brand"]:not([class*="wide"])) [class*="settingsArea"] [class*="label"]::before,
html[data-dsh-terminal] [class*="sidebarCol"]:has(button[class*="brand"]:not([class*="wide"])) [class*="settingsArea"] [class*="label"]::after {
  content: none;
}

/* In the rail the section markers would be clipped, so they stay out. */
html[data-dsh-terminal] [class*="sidebarCol"]:has([class*="railMark"]) [class*="panelList"]::before,
html[data-dsh-terminal] [class*="sidebarCol"]:has([class*="railMark"]) [class*="sectionLabel"]::before {
  content: none;
}

html[data-dsh-terminal] [class*="panelRow"],
html[data-dsh-terminal] [class*="navRow"] {
  gap: 8px;
  letter-spacing: 0.02em;
}

html[data-dsh-terminal] [class*="panelRow"] svg,
html[data-dsh-terminal] [class*="navRow"] svg {
  color: var(--dsl-term-accent);
}

/* Workspace folder glyph rides the accent; the turn-status text keeps its own ink. */
html[data-dsh-terminal] [class*="folder"] svg,
html[data-dsh-terminal] [class*="folderA"] svg {
  color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] button[class*="newSession"] {
  flex-wrap: nowrap !important;
}

html[data-dsh-terminal] [class*="newSessionLabelMask"] {
  display: flex !important;
  width: auto !important;
  height: 22px !important;
  flex: 0 0 auto !important;
  align-items: center !important;
  overflow: hidden !important;
}

html[data-dsh-terminal] [class*="newSessionLabel"]:not([class*="Mask"])::before {
  content: '[+ ';
  color: var(--dsl-term-accent);
}

html[data-dsh-terminal] [class*="newSessionLabel"]:not([class*="Mask"])::after {
  content: ' ]';
  color: var(--dsl-term-faint);
}

/* Collapsed rail: the label is gone, only the glyph remains — no brackets. */
html[data-dsh-terminal] [class*="newSessionLabel"]:not([class*="wide"])::before,
html[data-dsh-terminal] [class*="newSessionLabel"]:not([class*="wide"])::after {
  content: none;
}

html[data-dsh-terminal] [class*="newSessionShortcut"] {
  display: none !important;
}

html[data-dsh-terminal] [class*="sessionRow"] [class*="title"] {
  letter-spacing: 0.02em;
}

html[data-dsh-terminal] [class*="sessionRow"] [class*="title"]::before {
  content: '· ';
  color: var(--dsl-term-faint);
}

html[data-dsh-terminal] [class*="sessionRow"][class*="_selected"] [class*="title"]::before {
  content: '• ';
  color: var(--dsl-term-accent);
}

/* --- header bar: a path breadcrumb over a tab strip ---------------------- */
html[data-dsh-terminal] [class*="header"]:not([class*="headerBlank"]) [class*="titleRow"]::before {
  content: '~/ ';
  margin-right: 2px;
  color: var(--dsl-term-faint);
}

html[data-dsh-terminal] [class*="header"] {
  border-bottom: 1px solid var(--dsl-term-line);
}

/* View tabs: the hover feedback is an underline, never a fill taller than the bar. */
html[data-dsh-terminal] [class*="an3WzG_tab"]:hover,
html[data-dsh-terminal] [class*="viewTabs"] [class*="tab"]:hover {
  background-color: transparent !important;
  color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="an3WzG_tab"]::after,
html[data-dsh-terminal] [class*="viewTabs"] [class*="tab"]::after {
  background-color: transparent !important;
  height: 2px !important;
}

html[data-dsh-terminal] [class*="an3WzG_tab"]:hover::after,
html[data-dsh-terminal] [class*="viewTabs"] [class*="tab"]:hover::after {
  background-color: var(--dsl-term-line-strong) !important;
}

html[data-dsh-terminal] [class*="an3WzG_tabActive"]::after,
html[data-dsh-terminal] [class*="viewTabs"] [class*="tabActive"]::after {
  background-color: var(--dsl-term-accent) !important;
}

html[data-dsh-terminal] [class*="an3WzG_tabActive"],
html[data-dsh-terminal] [class*="viewTabs"] [class*="tabActive"] {
  color: var(--dsl-term-accent) !important;
}

/* --- right sidebar: tool panel as a section of a text screen -------------- */
html[data-dsh-terminal] [class*="rightbarCol"] {
  background: var(--dsl-term-bg1);
  border-left: 1px solid var(--dsl-term-line);
}

html[data-dsh-terminal] [class*="tabHostHeader"] {
  border-bottom: 1px solid var(--dsl-term-line);
  background: transparent;
}

html[data-dsh-terminal] [class*="tabHostHeader"] [class*="tabTitle"]:not(:has([class*="tabTitle"]))::before {
  content: '[ ';
  color: var(--dsl-term-faint);
}

html[data-dsh-terminal] [class*="tabHostHeader"] [class*="tabTitle"]:not(:has([class*="tabTitle"]))::after {
  content: ' ]';
  color: var(--dsl-term-faint);
}

html[data-dsh-terminal] [class*="tabHostHeader"] [class*="tabActive"] [class*="tabTitle"]:not(:has([class*="tabTitle"]))::before,
html[data-dsh-terminal] [class*="tabHostHeader"] [class*="tabActive"] [class*="tabTitle"]:not(:has([class*="tabTitle"]))::after {
  color: var(--dsl-term-accent);
}

html[data-dsh-terminal] [class*="tabHostHeader"] [class*="titleIcon"] {
  display: none !important;
}

html[data-dsh-terminal] [class*="tabHostHeader"] button {
  border: 1px solid transparent;
}

html[data-dsh-terminal] [class*="guide"] {
  display: block !important;
  align-items: stretch !important;
  padding: 12px 14px !important;
  overflow: auto;
}

html[data-dsh-terminal] [class*="guide"]::before {
  content: ':: 工具';
  display: block;
  margin-bottom: 10px;
  color: var(--dsl-term-faint);
  font-size: 11px;
  letter-spacing: 0.08em;
}

html[data-dsh-terminal] [class*="guide"] [class*="hero"] {
  display: none !important;
}

html[data-dsh-terminal] [class*="guide"] [class*="entryCell"],
html[data-dsh-terminal] [class*="guide"] [class*="moreAnchor"] {
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 8px;
  padding: 0;
  border: 1px solid var(--dsl-term-line) !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html[data-dsh-terminal] [class*="guide"] [class*="entryCell"]::before,
html[data-dsh-terminal] [class*="guide"] [class*="moreAnchor"]::before {
  content: '>';
  position: absolute;
  top: 8px;
  left: 8px;
  color: var(--dsl-term-accent);
}

html[data-dsh-terminal] [class*="guide"] [class*="entryCell"] button,
html[data-dsh-terminal] [class*="guide"] [class*="moreAnchor"] button {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  padding-left: 22px !important;
  text-align: left;
}

html[data-dsh-terminal] [class*="guide"] [class*="entryCell"]:hover,
html[data-dsh-terminal] [class*="guide"] [class*="moreAnchor"]:hover {
  border-color: var(--dsl-term-line-strong) !important;
  background: var(--dsl-term-hover) !important;
}

html[data-dsh-terminal] [class*="guide"] [class*="entryIcon"],
html[data-dsh-terminal] [class*="guide"] [class*="entryCell"] svg,
html[data-dsh-terminal] [class*="guide"] [class*="moreAnchor"] svg {
  display: none !important;
}

html[data-dsh-terminal] [class*="guide"] [class*="entryText"] {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

html[data-dsh-terminal] [class*="guide"] [class*="entryTitle"] {
  color: var(--dsl-term-text);
  letter-spacing: 0.02em;
}

html[data-dsh-terminal] [class*="guide"] [class*="entryDescription"] {
  color: var(--dsl-term-faint);
  font-size: 11px;
}

html[data-dsh-terminal] [class*="guide"] [class*="_keys_"] {
  position: static !important;
  flex: 0 0 auto;
  margin-left: auto;
}

html[data-dsh-terminal] [class*="guide"] [class*="_key_"],
html[data-dsh-terminal] [class*="guide"] [class*="_separator_"] {
  border: 1px solid var(--dsl-term-line-strong);
  border-radius: 0;
  background: transparent;
  color: var(--dsl-term-text);
}

html[data-dsh-terminal] [class*="tabBody"] {
  display: flex;
  flex-direction: column;
}

html[data-dsh-terminal] [class*="tabBody"]::after {
  content: 'esc 关闭右侧栏 · ctrl+b 收起侧栏';
  margin-top: auto;
  padding: 7px 14px;
  border-top: 1px solid var(--dsl-term-line);
  color: var(--dsl-term-faint);
  font-size: 11px;
  letter-spacing: 0.02em;
}

html[data-dsh-terminal] [class*="guide"] kbd {
  border: 1px solid var(--dsl-term-line-strong);
  border-radius: 0;
  background: transparent;
  color: var(--dsl-term-text);
}

/* --- tmux-style status bar rendered by the dock slot component ----------- */
html[data-dsh-terminal] .dsh-term-statusbar {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 10px;
  height: 22px;
  margin-left: auto;
  padding: 0 8px;
  border-top: 1px solid var(--dsl-term-line);
  background: var(--dsl-term-card);
  color: var(--dsl-term-dim);
  font-family: ${FONT_STACK};
  font-size: 11px;
  line-height: 22px;
  letter-spacing: 0.02em;
  user-select: none;
}

html[data-dsh-terminal] .dsh-term-statusbar__mode {
  padding: 0 6px;
  background: var(--dsl-term-accent);
  color: #04120a;
  font-weight: 700;
}

html[data-dsh-terminal] .dsh-term-statusbar__hint {
  margin-left: auto;
  color: var(--dsl-term-faint);
}

html[data-dsh-terminal] .dsh-term-statusbar__clock {
  color: var(--dsl-term-text);
}

/* --- sidebar footer: balance block -------------------------------------- */
html[data-dsh-terminal] .dsh-term-account {
  margin: 0 8px 4px;
  padding: 2px 8px 4px;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsl-term-text);
}

html[data-dsh-terminal] .dsh-term-account__rule {
  height: 1px;
  margin: 4px 0 6px;
  background: var(--dsl-term-line);
}

html[data-dsh-terminal] .dsh-term-account__rule:last-child {
  margin: 6px 0 2px;
}

html[data-dsh-terminal] .dsh-term-account__row {
  display: flex;
  gap: 8px;
  align-items: baseline;
  white-space: nowrap;
}

html[data-dsh-terminal] .dsh-term-account__key {
  flex: 0 0 64px;
  color: var(--dsl-term-dim);
}

html[data-dsh-terminal] .dsh-term-account__val {
  color: var(--dsl-term-text);
  font-variant-numeric: tabular-nums;
}

html[data-dsh-terminal] .dsh-term-account__row:first-child .dsh-term-account__val {
  color: var(--dsl-term-accent);
}

html[data-dsh-terminal] .dsh-term-account__note {
  margin-left: auto;
  color: var(--dsl-term-faint);
  font-size: 11px;
}

html[data-dsh-terminal] .dsh-term-account__badge {
  padding: 0 6px;
  background: var(--dsl-term-accent);
  color: #06100a;
  font-weight: 700;
  line-height: 16px;
}

/* --- settings page: one square switch row -------------------------------- */
html[data-dsh-terminal] .dsh-term-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 640px;
}

html[data-dsh-terminal] .dsh-term-settings__title {
  color: var(--dsl-term-text);
  font-size: 13px;
}

html[data-dsh-terminal] .dsh-term-settings__title::before {
  content: ':: ';
  color: var(--dsl-term-accent);
}

html[data-dsh-terminal] .dsh-term-settings__row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 12px;
  border: 1px solid var(--dsl-term-line);
}

html[data-dsh-terminal] .dsh-term-settings__copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

html[data-dsh-terminal] .dsh-term-settings__label {
  color: var(--dsl-term-text);
  font-size: 13px;
}

html[data-dsh-terminal] .dsh-term-settings__hint {
  color: var(--dsl-term-dim);
  font-size: 11px;
  line-height: 16px;
}

html[data-dsh-terminal] .dsh-term-palette {
  display: flex;
  gap: 6px;
  margin-left: auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}

html[data-dsh-terminal] .dsh-term-palette__choice {
  padding: 5px 10px;
  min-width: 56px;
  border: 1px solid var(--dsl-term-line-strong) !important;
  background: transparent !important;
  color: var(--dsl-term-dim);
  font-size: 12px;
  line-height: 16px;
}

html[data-dsh-terminal] .dsh-term-palette__choice:hover {
  color: var(--dsl-term-text);
  border-color: var(--dsl-term-accent) !important;
  background: var(--dsl-term-hover) !important;
}

html[data-dsh-terminal] .dsh-term-palette__choice[aria-pressed='true'] {
  color: var(--dsl-term-accent);
  border-color: var(--dsl-term-accent) !important;
  background: var(--dsl-term-hover) !important;
}

html[data-dsh-terminal] .dsh-term-switch {
  flex: 0 0 auto;
  margin-left: auto;
  width: 36px;
  height: 20px;
  padding: 1px;
  border: 1px solid var(--dsl-term-line-strong) !important;
  background: var(--dsl-term-panel) !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

html[data-dsh-terminal] .dsh-term-switch[aria-checked='true'] {
  border-color: var(--dsl-term-accent) !important;
  background: var(--dsl-term-hover) !important;
  justify-content: flex-end;
}

html[data-dsh-terminal] .dsh-term-switch__thumb {
  width: 16px;
  height: 16px;
  background: var(--dsl-term-dim);
}

html[data-dsh-terminal] .dsh-term-switch[aria-checked='true'] .dsh-term-switch__thumb {
  background: var(--dsl-term-accent);
}
`;

    const PALETTE_CSS = PALETTES.map((p) => {
      const base = `html[data-dsh-terminal="${p.key}"] {\n${declarations(skinVariables(p))}\n}`;
      const high = `html[data-dsh-terminal="${p.key}"][data-dsh-terminal-contrast="high"] {\n${declarations(
        skinVariables(withContrast(p, true)),
      )}\n}`;
      return `${base}\n\n${high}`;
    }).join('\n\n');

    const CSS = `${BASE_CSS}\n${COMPONENT_CSS}\n${PALETTE_CSS}\n`;

    const STORAGE_KEY = 'dsh-terminal-skin:palette';
    const CONTRAST_KEY = 'dsh-terminal-skin:contrast';
    const ACCOUNT_KEY = 'dsh-terminal-skin:account';
    const AVATAR_KEY = 'dsh-terminal-skin:avatar';
    const AVATAR_ATTRIBUTE = 'data-dsh-terminal-avatar';
    const GUTTER_KEY = 'dsh-terminal-skin:gutter';
    const GUTTER_ATTRIBUTE = 'data-dsh-terminal-gutter';
    const CONTRAST_ATTRIBUTE = 'data-dsh-terminal-contrast';
    const SOURCE = '@local/terminal-skin';
    const ROOT_ATTRIBUTE = 'data-dsh-terminal';

    const readContrast = () => {
      try {
        return window.localStorage.getItem(CONTRAST_KEY) === 'high' ? 'high' : 'standard';
      } catch {
        return 'standard';
      }
    };

    const writeContrast = (mode) => {
      try {
        window.localStorage.setItem(CONTRAST_KEY, mode === 'high' ? 'high' : 'standard');
      } catch {
        /* private mode: the choice still applies for this session */
      }
    };

    const readGutterVisible = () => {
      try {
        return window.localStorage.getItem(GUTTER_KEY) !== 'off';
      } catch {
        return true;
      }
    };

    const applyGutterMode = (visible) => {
      try {
        document.documentElement.setAttribute(GUTTER_ATTRIBUTE, visible ? 'on' : 'off');
      } catch {
        /* no document (test harness) */
      }
    };

    const writeGutterVisible = (visible) => {
      try {
        window.localStorage.setItem(GUTTER_KEY, visible ? 'on' : 'off');
      } catch {
        /* private mode: the choice still applies for this session */
      }
      applyGutterMode(visible);
      try {
        window.dispatchEvent(new CustomEvent('dsh-terminal-skin:gutter', { detail: visible }));
      } catch {
        /* no listener: the attribute already changed */
      }
    };

    const readAvatarColor = () => {      try {
        return window.localStorage.getItem(AVATAR_KEY) === 'color';
      } catch {
        return false;
      }
    };

    const applyAvatarMode = (color) => {
      try {
        document.documentElement.setAttribute(AVATAR_ATTRIBUTE, color ? 'color' : 'mono');
      } catch {
        /* no document (test harness) */
      }
    };

    const writeAvatarColor = (color) => {
      try {
        window.localStorage.setItem(AVATAR_KEY, color ? 'color' : 'mono');
      } catch {
        /* private mode: the choice still applies for this session */
      }
      applyAvatarMode(color);
      try {
        window.dispatchEvent(new CustomEvent('dsh-terminal-skin:avatar', { detail: color }));
      } catch {
        /* no listener: the attribute already changed */
      }
    };

    const readAccountVisible = () => {      try {
        return window.localStorage.getItem(ACCOUNT_KEY) !== 'off';
      } catch {
        return true;
      }
    };

    const writeAccountVisible = (visible) => {
      try {
        window.localStorage.setItem(ACCOUNT_KEY, visible ? 'on' : 'off');
      } catch {
        /* private mode: the choice still applies for this session */
      }
      try {
        window.dispatchEvent(new CustomEvent('dsh-terminal-skin:account', { detail: visible }));
      } catch {
        /* no listener: the next mount picks it up from storage */
      }
    };

    const log = (message, detail) => {
      if (detail === undefined) console.warn('[terminal-skin]', message);
      else console.warn('[terminal-skin]', message, detail);
    };

    const readStoredKey = () => {
      try {
        return window.localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    };

    /* --- account ledger ------------------------------------------------- */
    const LEDGER_KEY = 'dsh-terminal-skin:ledger';

    const beijingDay = (time = Date.now()) =>
      new Date(Number(time) + 8 * 3600000).toISOString().slice(0, 10);

    // 峰时：北京时间 09:00–12:00、14:00–18:00；其余为谷时。
    const PEAK_WINDOWS = [
      [9 * 60, 12 * 60],
      [14 * 60, 18 * 60],
    ];
    const PEAK_CHANGES = [9 * 60, 12 * 60, 14 * 60, 18 * 60];

    const peakPeriod = (now = new Date()) => {
      const minutes = now.getHours() * 60 + now.getMinutes();
      const peak = PEAK_WINDOWS.some(([start, end]) => minutes >= start && minutes < end);
      const nextChange = PEAK_CHANGES.find((mark) => mark > minutes) ?? 24 * 60 + 9 * 60;
      const until = nextChange - minutes;
      return {
        peak,
        label: peak ? '峰时' : '谷时',
        next: peak ? '谷时' : '峰时',
        inHours: Math.floor(until / 60),
        inMinutes: until % 60,
      };
    };

    const readLedger = () => {
      try {
        const raw = window.localStorage.getItem(LEDGER_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        if (!parsed || typeof parsed !== 'object') return null;
        return parsed;
      } catch {
        return null;
      }
    };

    const writeLedger = (ledger) => {
      try {
        window.localStorage.setItem(LEDGER_KEY, JSON.stringify(ledger));
      } catch {
        /* the numbers still show for this session */
      }
    };

    const accountRpc = async (method) => {
      const response = await fetch(`/api/${method}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'client-request',
          rpcId: crypto.randomUUID(),
          method,
          payload: {
            args: {
              client: {
                version: '0.2.2-rc.5',
                locale: 'zh',
                timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60,
              },
            },
          },
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const result = payload && payload.result;
      if (!result || result.ok !== true) throw new Error('account rpc refused');
      return result.value;
    };

    const writeStoredKey = (key) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, key);
      } catch {
        /* private mode: the palette still applies for this session */
      }
    };

    const paletteForPreference = (preference) =>
      PALETTE_BY_ID.get(String(preference)) || PALETTE_BY_KEY.get(String(readStoredKey())) || DEFAULT_PALETTE;

    const pad = (value) => String(value).padStart(2, '0');

    /** tmux-flavoured status line, mounted in the composer dock slot. */
    // The components below live outside `apply`, so the client context is parked here.
    let serviceCtx = null;

    const TerminalStatusBar = (props) => {
      const [now, setNow] = React.useState(() => new Date());
      try {
        window.__dshTerminalDockProps = props;
      } catch {
        /* ignore */
      }
      React.useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 20000);
        const onSkinChange = () => setNow(new Date());
        window.addEventListener('dsh-terminal-skin:change', onSkinChange);
        return () => {
          window.clearInterval(timer);
          window.removeEventListener('dsh-terminal-skin:change', onSkinChange);
        };
      }, []);

      // Transcript gutter: every row gets `data-clock` (HH:MM:SS) + `data-gutter`
      // from the session event stream, so CSS can print the time above the speaker.
      React.useEffect(() => {
        const sessionId = props && props.sessionId;
        if (!sessionId || typeof document === 'undefined') return undefined;
        let disposed = false;
        let unsubscribe = null;
        let retry = 0;
        let pending = 0;
        const clock = (ms) => {
          const date = new Date(ms);
          return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        };

        const stamp = (entries) => {
          const you = [];
          const dsh = [];
          for (const entry of entries || []) {
            const event = entry && entry.event;
            if (!event || typeof event.type !== 'string') continue;
            if (!event.type.includes('/message')) continue;
            const time = typeof event.time === 'number' ? event.time : null;
            if (!time) continue;
            if (event.type.includes('user')) you.push(clock(time));
            else if (event.type.includes('assistant')) dsh.push(clock(time));
          }
          const rows = Array.from(document.querySelectorAll('[class*="flowItem"]'));
          let youIndex = 0;
          let dshIndex = 0;
          let carry = '';
          for (const row of rows) {
            const isYou = !!row.querySelector('[class*="_bubble"]');
            const isTool = !!row.querySelector('[class*="callRow"], [class*="hKdVjq"], [class*="iFrn8G"]');
            const isProse =
              isYou || (!isTool && !!row.querySelector('[class*="_markdown"], [class*="xMeOpW"], [class*="prose"]'));
            if (!isProse) {
              row.removeAttribute('data-gutter');
              row.removeAttribute('data-clock');
              continue;
            }
            const next = isYou ? you[youIndex++] : dsh[dshIndex++];
            if (next) carry = next;
            row.setAttribute('data-gutter', isYou ? 'you' : 'dsh');
            if (next || carry) row.setAttribute('data-clock', next || carry);
          }
        };

        const observer = new MutationObserver(() => {
          window.clearTimeout(pending);
          pending = window.setTimeout(() => {
            try {
              const binding = serviceCtx.sessions.binding(sessionId);
              if (binding) stamp(binding.eventSource.getSnapshot().entries);
            } catch {
              /* transcript not ready */
            }
          }, 250);
        });

        const attach = () => {
          if (disposed) return;
          let binding = null;
          try {
            binding = serviceCtx.sessions.binding(sessionId);
          } catch (error) {
            window.__dshTerminalClockDebug = {
              stage: 'binding-error',
              message: String(error && error.message),
            };
            binding = null;
          }
          if (!binding) {
            if (retry < 20) {
              retry += 1;
              window.setTimeout(attach, 600);
            }
            return;
          }
          const source = binding.eventSource;
          const run = () => {
            if (disposed) return;
            try {
              stamp(source.getSnapshot().entries);
            } catch {
              /* keep the plain labels */
            }
          };
          run();
          try {
            unsubscribe = source.subscribe(run);
          } catch {
            unsubscribe = null;
          }
          observer.observe(document.body, { childList: true, subtree: true });
        };

        attach();
        return () => {
          disposed = true;
          window.clearTimeout(pending);
          observer.disconnect();
          if (unsubscribe) unsubscribe();
        };
      }, [props && props.sessionId]);
      const key = document.documentElement.getAttribute(ROOT_ATTRIBUTE) || DEFAULT_PALETTE.key;
      const palette = PALETTE_BY_KEY.get(key) || DEFAULT_PALETTE;
      return h(
        'div',
        {
          className: 'dsh-term-statusbar',
          title: 'ctrl+b 收起侧栏 · 配色在「设置 → 内置插件 → 终端皮肤」里切换',
        },
        h('span', { className: 'dsh-term-statusbar__mode' }, 'NORMAL'),
        h('span', { className: 'dsh-term-statusbar__item' }, `theme:${palette.key}`),
        h('span', { className: 'dsh-term-statusbar__clock' }, `${pad(now.getHours())}:${pad(now.getMinutes())}`),
      );
    };

    /**
     * One preference row for the skin: a square switch between the standard
     * console look and the high-contrast variant. Rendered from the Plugins
     * settings tab so it sits beside the other plugin pages.
     */
    const money = (value) =>
      typeof value === 'number' && Number.isFinite(value) ? `¥${value.toFixed(2)}` : '--';

    const TerminalAccount = (props) => {
      const [visible, setVisible] = React.useState(() => readAccountVisible());
      const [view, setView] = React.useState(() => {
        const ledger = readLedger();
        const fresh = ledger && ledger.day === beijingDay();
        return {
          balance: fresh && Number.isFinite(ledger.balance) ? ledger.balance : null,
          today: fresh && Number.isFinite(ledger.spent) ? ledger.spent : 0,
          lastTurn: fresh && Number.isFinite(ledger.lastTurn) ? ledger.lastTurn : 0,
          failed: false,
        };
      });
      const [period, setPeriod] = React.useState(() => peakPeriod());
      const busy = React.useRef(false);
      const lastSample = React.useRef(0);

      const sample = React.useCallback(async () => {
        if (busy.current) return;
        const now = Date.now();
        if (now - lastSample.current < 4000) return;
        busy.current = true;
        lastSample.current = now;
        try {
          const walletList = await accountRpc('account/getBalance');
          const wallet = walletList && Array.isArray(walletList.value) ? walletList.value[0] : null;
          const balance = wallet ? Number(wallet.balance) : NaN;
          if (!Number.isFinite(balance)) throw new Error('balance missing');

          const day = beijingDay();
          const previous = readLedger();
          const fresh = previous && previous.day === day;
          let spent = fresh && Number.isFinite(previous.spent) ? previous.spent : 0;
          let lastTurn = fresh && Number.isFinite(previous.lastTurn) ? previous.lastTurn : 0;
          const before = fresh && Number.isFinite(previous.balance) ? previous.balance : null;

          // "Last turn" is one whole prompt -> final answer, not one sample:
          // keep adding every drop until the user sends the next message.
          let turnSpent = fresh && Number.isFinite(previous.turnSpent) ? previous.turnSpent : 0;
          let seenUsers = fresh && Number.isFinite(previous.users) ? previous.users : -1;
          const users = document.querySelectorAll('[class*="_bubble"]').length;
          if (seenUsers >= 0 && users > seenUsers) {
            lastTurn = turnSpent;
            turnSpent = 0;
          }
          if (before !== null && balance < before - 1e-6) {
            const delta = Math.round((before - balance) * 1000000) / 1000000;
            spent = Math.round((spent + delta) * 1000000) / 1000000;
            turnSpent = Math.round((turnSpent + delta) * 1000000) / 1000000;
            lastTurn = turnSpent;
          }
          if (users >= 0) seenUsers = users;
          writeLedger({ day, balance, spent, lastTurn, turnSpent, users: seenUsers, at: now });
          setView({ balance, today: spent, lastTurn, failed: false });
        } catch (error) {
          setView((current) => ({ ...current, failed: current.balance === null }));
        } finally {
          busy.current = false;
        }
      }, []);

      React.useEffect(() => {
        const onVisibility = () => setVisible(readAccountVisible());
        window.addEventListener('dsh-terminal-skin:account', onVisibility);
        return () => window.removeEventListener('dsh-terminal-skin:account', onVisibility);
      }, []);

      React.useEffect(() => {
        if (!visible) return undefined;
        sample();
        // 余额：每分钟一次。
        const minute = window.setInterval(() => sample(), 60000);
        const clock = window.setInterval(() => setPeriod(peakPeriod()), 30000);
        // 对话：聊天区静止 2.5s 且消息条数变化，就当作一轮结束，立即补一次余额。
        let settle = 0;
        let count = document.querySelectorAll('[class*="flowItem"]').length;
        const observer = new MutationObserver(() => {
          // Long turns mutate the transcript constantly; sample on a slow beat
          // so the running total keeps up, not only after the turn goes quiet.
          if (Date.now() - lastSample.current > 12000) sample();
          window.clearTimeout(settle);
          settle = window.setTimeout(() => {
            const next = document.querySelectorAll('[class*="flowItem"]').length;
            if (next === count) return;
            count = next;
            sample();
          }, 2500);
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return () => {
          window.clearInterval(minute);
          window.clearInterval(clock);
          window.clearTimeout(settle);
          observer.disconnect();
        };
      }, [sample]);

      if (props && props.wide === false) return null;
      if (!visible) return null;

      const row = (key, value, extra) =>
        h(
          'div',
          { className: 'dsh-term-account__row', key },
          h('span', { className: 'dsh-term-account__key' }, key),
          h('span', { className: 'dsh-term-account__val' }, value),
          extra ? h('span', { className: 'dsh-term-account__note' }, extra) : null,
        );

      return h(
        'div',
        { className: 'dsh-term-account', title: '余额每 60s 刷新；「上次对话」统计从你发出这条消息到我这轮回答结束的全部消耗' },
        h('div', { className: 'dsh-term-account__rule', key: 'top' }),
        row('账户余额', money(view.balance), view.failed ? '离线' : null),
        row('今日消耗', money(view.today)),
        row('上次对话', money(view.lastTurn)),
        row(
          '当前时段',
          h('span', { className: 'dsh-term-account__badge', key: 'badge' }, period.label),
          `→ ${period.next} ${period.inHours}h${String(period.inMinutes).padStart(2, '0')}m`,
        ),
        h('div', { className: 'dsh-term-account__rule', key: 'bottom' }),
      );
    };

    const TerminalSkinSettings = () => {
      const [mode, setMode] = React.useState(() => readContrast());
      const [accountOn, setAccountOn] = React.useState(() => readAccountVisible());
      const [avatarColor, setAvatarColor] = React.useState(() => readAvatarColor());
      const [gutterOn, setGutterOn] = React.useState(() => readGutterVisible());
      const [palette, setPalette] = React.useState(() => readStoredKey() || DEFAULT_PALETTE.key);
      React.useEffect(() => {
        const onChange = () => {
          setMode(readContrast());
          const next = document.documentElement.getAttribute(ROOT_ATTRIBUTE);
          if (next) setPalette(next);
        };
        window.addEventListener('dsh-terminal-skin:change', onChange);
        return () => window.removeEventListener('dsh-terminal-skin:change', onChange);
      }, []);
      const high = mode === 'high';

      const apply = (next) => {
        writeContrast(next);
        setMode(next);
        const handle = window.__dshTerminalSkin;
        if (handle && typeof handle.setContrast === 'function') handle.setContrast(next);
        else document.documentElement.setAttribute(CONTRAST_ATTRIBUTE, next);
      };

      const choose = (key) => {
        setPalette(key);
        const handle = window.__dshTerminalSkin;
        if (handle && typeof handle.paint === 'function') handle.paint(key);
      };

      return h(
        'div',
        { className: 'dsh-term-settings' },
        h('div', { className: 'dsh-term-settings__title' }, '终端皮肤'),
        h(
          'div',
          { className: 'dsh-term-settings__row' },
          h(
            'div',
            { className: 'dsh-term-settings__copy' },
            h('div', { className: 'dsh-term-settings__label' }, '配色'),
            h('div', { className: 'dsh-term-settings__hint' }, '三套终端配色，选择会被记住，重启窗口后保留。'),
          ),
          h(
            'div',
            { className: 'dsh-term-palette' },
            ...PALETTES.map((entry) =>
              h(
                'button',
                {
                  key: entry.key,
                  type: 'button',
                  className: 'dsh-term-palette__choice',
                  'aria-pressed': palette === entry.key ? 'true' : 'false',
                  onClick: () => choose(entry.key),
                },
                PALETTE_LABELS[entry.key] || entry.key,
              ),
            ),
          ),
        ),
        h(
          'div',
          { className: 'dsh-term-settings__row' },
          h(
            'div',
            { className: 'dsh-term-settings__copy' },
            h('div', { className: 'dsh-term-settings__label' }, '高对比度模式'),
            h(
              'div',
              { className: 'dsh-term-settings__hint' },
              '正文、次级文字与分隔线各提一档亮度，深色背景下更易读；关闭即回到标准终端配色。',
            ),
          ),
          h(
            'button',
            {
              type: 'button',
              role: 'switch',
              'aria-checked': high ? 'true' : 'false',
              'aria-label': '高对比度模式',
              className: 'dsh-term-switch',
              onClick: () => apply(high ? 'standard' : 'high'),
            },
            h('span', { className: 'dsh-term-switch__thumb' }),
          ),
        ),
        h(
          'div',
          { className: 'dsh-term-settings__row' },
          h(
            'div',
            { className: 'dsh-term-settings__copy' },
            h('div', { className: 'dsh-term-settings__label' }, '左下角余额区'),
            h(
              'div',
              { className: 'dsh-term-settings__hint' },
              '账号行上方的余额块（账户余额 / 今日消耗 / 上次对话 / 当前时段）；关闭后不再请求余额接口。',
            ),
          ),
          h(
            'button',
            {
              type: 'button',
              role: 'switch',
              'aria-checked': accountOn ? 'true' : 'false',
              'aria-label': '左下角余额区',
              className: 'dsh-term-switch',
              onClick: () => {
                const next = !accountOn;
                writeAccountVisible(next);
                setAccountOn(next);
              },
            },
            h('span', { className: 'dsh-term-switch__thumb' }),
          ),
        ),
        h(
          'div',
          { className: 'dsh-term-settings__row' },
          h(
            'div',
            { className: 'dsh-term-settings__copy' },
            h('div', { className: 'dsh-term-settings__label' }, '左下角头像'),
            h(
              'div',
              { className: 'dsh-term-settings__hint' },
              '单色：头像去色后与强调色叠印成终端单色照片；原色：保留社交头像本来的颜色。',
            ),
          ),
          h(
            'button',
            {
              type: 'button',
              role: 'switch',
              'aria-checked': avatarColor ? 'true' : 'false',
              'aria-label': '左下角头像原色',
              className: 'dsh-term-switch',
              onClick: () => {
                const next = !avatarColor;
                writeAvatarColor(next);
                setAvatarColor(next);
              },
            },
            h('span', { className: 'dsh-term-switch__thumb' }),
          ),
        ),
        h(
          'div',
          { className: 'dsh-term-settings__row' },
          h(
            'div',
            { className: 'dsh-term-settings__copy' },
            h('div', { className: 'dsh-term-settings__label' }, '时间与对话者'),
            h(
              'div',
              { className: 'dsh-term-settings__hint' },
              '对话左侧显示 `HH:MM:SS` 与 `you` / `dsh` 标记；关闭后回到纯文本留白。',
            ),
          ),
          h(
            'button',
            {
              type: 'button',
              role: 'switch',
              'aria-checked': gutterOn ? 'true' : 'false',
              'aria-label': '时间与对话者',
              className: 'dsh-term-switch',
              onClick: () => {
                const next = !gutterOn;
                writeGutterVisible(next);
                setGutterOn(next);
              },
            },
            h('span', { className: 'dsh-term-switch__thumb' }),
          ),
        ),
        h(
          'div',
          { className: 'dsh-term-settings__hint' },
          `当前：${PALETTE_LABELS[palette] || palette} · ${high ? '高对比度' : '标准'} · Ctrl+B 收起侧栏`,
        ),
      );
    };

    return {
      inject: ['theme', 'layout', 'slots', 'sessions'],
      apply(ctx) {
        serviceCtx = ctx;

        // 0. Avatar treatment: monochrome duotone by default, original colours on demand.
        ctx.effect(() => {
          applyAvatarMode(readAvatarColor());
          applyGutterMode(readGutterVisible());
          const sync = () => {
            applyAvatarMode(readAvatarColor());
            applyGutterMode(readGutterVisible());
          };
          window.addEventListener('dsh-terminal-skin:avatar', sync);
          window.addEventListener('dsh-terminal-skin:gutter', sync);
          return () => {
            window.removeEventListener('dsh-terminal-skin:avatar', sync);
            window.removeEventListener('dsh-terminal-skin:gutter', sync);
          };
        });

        // 1. Register the palettes so they appear in Settings → Appearance.
        //    The sprite is not mounted yet when a client plugin applies, so glyph icons are
        //    validated later and the palettes are re-registered with the survivors.
        ctx.effect(() => {
          let disposers = [];
          const registerAll = (icons) => {
            for (const palette of PALETTES) {
              const definition = {
                id: palette.id,
                colorScheme: 'dark',
                tokens: themeTokens(palette),
                icons,
              };
              try {
                disposers.push(ctx.theme.register(definition));
              } catch (error) {
                log(`register ${palette.id} failed`, error && error.message);
              }
            }
          };
          const validateIcons = () => {
            let icons = { ...ICON_REPLACEMENTS };
            for (let attempt = 0; attempt < 80; attempt += 1) {
              try {
                const dispose = ctx.theme.register({
                  id: 'terminal-icon-check',
                  colorScheme: 'dark',
                  tokens: {},
                  icons,
                });
                dispose();
                return icons;
              } catch (error) {
                const text = String((error && error.message) || '');
                const match = /icon "([^"]+)"/.exec(text);
                if (!match) return null;
                delete icons[match[1]];
                if (!Object.keys(icons).length) return null;
              }
            }
            return null;
          };
          registerAll(undefined);
          let timer = 0;
          let upgraded = false;
          const upgrade = () => {
            if (upgraded) return;
            const icons = validateIcons();
            if (!icons) return;
            upgraded = true;
            for (const dispose of disposers) {
              try {
                dispose();
              } catch {
                /* already gone */
              }
            }
            disposers = [];
            registerAll(icons);
            const key = document.documentElement.getAttribute(ROOT_ATTRIBUTE);
            const palette = PALETTE_BY_KEY.get(key) || DEFAULT_PALETTE;
            try {
              ctx.theme.setTheme(palette.id);
            } catch (error) {
              log('re-adopt after icon upgrade failed', error && error.message);
            }
          };
          timer = window.setTimeout(upgrade, 1200);
          return () => {
            window.clearTimeout(timer);
            for (const dispose of disposers) dispose();
          };
        });

        // 2. Paint the console. The skin keeps its own palette state so the look holds
        //    even when the shell's theme preference points at a lighter theme.
        let paint = () => {};
        ctx.effect(() => {
          let layer = null;
          // overrideTokens() re-emits theme/change, so guard against re-entrant paints.
          let inPaint = false;
          const activeKey = () => document.documentElement.getAttribute(ROOT_ATTRIBUTE) || DEFAULT_PALETTE.key;
          const paintLayer = (palette) => {
            if (inPaint) return;
            inPaint = true;
            try {
              const mode = readContrast();
              const paint = withContrast(palette, mode === 'high');
              document.documentElement.setAttribute(ROOT_ATTRIBUTE, palette.key);
              document.documentElement.setAttribute(CONTRAST_ATTRIBUTE, mode);
              try {
                document.documentElement.style?.setProperty?.('--dsl-term-version', `'v${VERSION}'`);
              } catch {
                /* a root without a style object simply skips the version tag */
              }
              writeStoredKey(palette.key);
              try {
                window.dispatchEvent(new CustomEvent('dsh-terminal-skin:change', { detail: palette.key }));
              } catch {
                /* older engines: the status bar just repaints on its own tick */
              }
              const tokens = {};
              for (const [name, value] of Object.entries(themeTokens(paint))) {
                tokens[name] = { light: value, dark: value };
              }
              const previous = layer;
              layer = ctx.theme.overrideTokens(SOURCE, tokens);
              if (typeof previous === 'function') {
                try {
                  previous();
                } catch {
                  /* a newer layer already replaced this one */
                }
              }
              const preference = String(ctx.theme.getTheme().preference);
              if (!PALETTE_BY_ID.has(preference)) {
                try {
                  ctx.theme.setTheme(palette.id);
                } catch {
                  /* the shell may refuse the write; the token layer still holds */
                }
              }
            } finally {
              inPaint = false;
            }
          };
          paint = paintLayer;
          paintLayer(paletteForPreference(ctx.theme.getTheme().preference));
          const off = ctx.on('theme/change', () => {
            const preference = String(ctx.theme.getTheme().preference);
            const palette = PALETTE_BY_ID.get(preference);
            if (palette) {
              paintLayer(palette);
              return;
            }
            // A built-in theme was selected. Keep the console look (and its glyph
            // icons, which only an active registered theme can carry) by re-asserting
            // the palette theme that is already painted.
            const desired = PALETTE_BY_KEY.get(activeKey()) || DEFAULT_PALETTE;
            try {
              ctx.theme.setTheme(desired.id);
            } catch {
              /* the shell may refuse the write; the token layer still holds */
            }
          });
          return () => {
            if (typeof off === 'function') off();
            if (typeof layer === 'function') layer();
            paint = () => {};
          };
        });

        // 3. The console chrome: one style tag plus the root marker.
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-dsh-terminal-skin', '');
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => style.remove();
        });

        // 4. First run: adopt the green palette in the shell preference too, so the
        //    registered themes show as selected in Settings → Appearance.
        ctx.effect(() => {
          const preference = String(ctx.theme.getTheme().preference);
          if (THEME_IDS.includes(preference) || readStoredKey()) return () => {};
          try {
            ctx.theme.setTheme(DEFAULT_PALETTE.id);
          } catch (error) {
            log('setTheme failed', error && error.message);
          }
          return () => {};
        });

        // 5. Ctrl+B collapses the sidebar (the toggle already exists in the shell).
        ctx.effect(() => {
          const onKeyDown = (event) => {
            const key = typeof event.key === 'string' ? event.key.toLowerCase() : '';
            if (key !== 'b' || event.altKey || !(event.ctrlKey || event.metaKey)) return;
            event.preventDefault();
            event.stopPropagation();
            ctx.layout.toggleSidebar();
          };
          window.addEventListener('keydown', onKeyDown, true);
          return () => window.removeEventListener('keydown', onKeyDown, true);
        });

        // 6. No global hotkey for the palette: the switch lives in Settings → Plugins → 终端皮肤,
        //    so nothing collides with other applications' shortcuts.

        // 7. The status line rides in the composer dock slot.
        ctx.effect(() => {
          try {
            return ctx.slots.inject('conversation.composer.dock', () =>
              ctx.slots.register(
                {
                  name: 'conversation.composer.dock',
                  id: 'terminal-statusbar',
                  order: 20,
                  label: '终端状态行',
                },
                TerminalStatusBar,
              ),
            );
          } catch (error) {
            log('status bar slot failed', error && error.message);
            return () => {};
          }
        });

        // 8. Settings → Plugins gains one tab for the skin's own preference.
        ctx.effect(() => {
          try {
            return ctx.slots.inject('settings.plugins.tab', () =>
              ctx.slots.register(
                {
                  name: 'settings.plugins.tab',
                  id: 'terminal-skin',
                  order: 40,
                  label: '终端皮肤',
                },
                TerminalSkinSettings,
              ),
            );
          } catch (error) {
            log('settings tab failed', error && error.message);
            return () => {};
          }
        });

        // 8b. Balance block sits in the sidebar footer, right above the account row.
        ctx.effect(() => {
          try {
            return ctx.slots.inject('sidebar.footer.action', () =>
              ctx.slots.register(
                {
                  name: 'sidebar.footer.action',
                  id: 'terminal-account',
                  order: 10,
                  label: '余额',
                },
                TerminalAccount,
              ),
            );
          } catch (error) {
            log('account block failed', error && error.message);
            return () => {};
          }
        });

        // 9. A small handle for scripted checks and for the user's own shortcuts.
        ctx.effect(() => {
          const handle = {
            palettes: PALETTES.map((palette) => palette.key),
            current: () => document.documentElement.getAttribute(ROOT_ATTRIBUTE),
            paint: (key) => {
              const palette = PALETTE_BY_KEY.get(key) || DEFAULT_PALETTE;
              try {
                ctx.theme.setTheme(palette.id);
              } catch {
                /* the shell may refuse the write; paint anyway below */
              }
              paint(palette);
              return document.documentElement.getAttribute(ROOT_ATTRIBUTE);
            },
            snapshot: () => {
              try {
                const theme = ctx.theme.getTheme();
                return {
                  preference: theme.preference,
                  active: theme.active && theme.active.id,
                  registered: (theme.themes || []).map((entry) => entry.id),
                  icons: theme.active && theme.active.icons ? Object.keys(theme.active.icons).length : 0,
                };
              } catch (error) {
                return `error: ${error && error.message}`;
              }
            },
            adopt: (key) => {
              try {
                ctx.theme.setTheme((PALETTE_BY_KEY.get(key) || DEFAULT_PALETTE).id);
                return 'ok';
              } catch (error) {
                return `error: ${error && error.message}`;
              }
            },
            probeIcons: (value) => {
              try {
                const dispose = ctx.theme.register({
                  id: 'terminal-probe-icons',
                  colorScheme: 'dark',
                  tokens: {},
                  icons: { 'dsw-icon-plus-outline-regular': value },
                });
                dispose();
                return 'accepted';
              } catch (error) {
                return `error: ${error && error.message}`;
              }
            },
            contrast: () => readContrast(),
            setContrast: (mode) => {
              writeContrast(mode);
              const key = document.documentElement.getAttribute(ROOT_ATTRIBUTE) || DEFAULT_PALETTE.key;
              paint(PALETTE_BY_KEY.get(key) || DEFAULT_PALETTE);
              return readContrast();
            },
          };
          window.__dshTerminalSkin = handle;
          return () => {
            if (window.__dshTerminalSkin === handle) delete window.__dshTerminalSkin;
          };
        });
      },
    };
  },
});
