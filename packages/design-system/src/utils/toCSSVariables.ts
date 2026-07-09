import type { ResolvedTheme } from "@dt/design-tokens";

export function toCSSVariables(theme: ResolvedTheme): string {
  const { semantic, primitives } = theme;
  const { radius, elevation } = primitives;

  return `/* Generated from design tokens. Do not edit manually. */
/* Brand: ${theme.name} (mode: ${theme.mode}) */
:root {
  /* Brand Theme Colors (Semantic mapped) */
  --ds-color-primary: ${semantic.colors.color.action.primary};
  --ds-color-primary-hover: ${semantic.colors.color.action.primaryHover};
  --ds-color-danger: ${semantic.colors.color.action.danger};
  --ds-color-danger-hover: ${semantic.colors.color.action.dangerHover};

  --ds-color-neutral-dark: ${semantic.colors.color.neutrals.dark};
  --ds-color-neutral-medium: ${semantic.colors.color.neutrals.medium};
  --ds-color-neutral-light: ${semantic.colors.color.neutrals.light};
  --ds-color-neutral-extra-light: ${semantic.colors.color.neutrals.extraLight};

  /* Semantic Mappings */
  --ds-color-text-primary: ${semantic.colors.color.text.primary};
  --ds-color-text-secondary: ${semantic.colors.color.text.secondary};
  --ds-color-text-subtle: ${semantic.colors.color.text.subtle};
  --ds-color-text-on-primary: ${semantic.colors.color.text.onPrimary};

  --ds-color-surface-default: ${semantic.colors.color.surface.default};
  --ds-color-surface-subtle: ${semantic.colors.color.surface.subtle};
  --ds-color-surface-card: ${semantic.colors.color.surface.card};

  --ds-color-border-default: ${semantic.colors.color.border.default};
  --ds-color-border-subtle: ${semantic.colors.color.border.subtle};

  --ds-color-action-primary: ${semantic.colors.color.action.primary};
  --ds-color-action-primary-hover: ${semantic.colors.color.action.primaryHover};
  --ds-color-action-danger: ${semantic.colors.color.action.danger};
  --ds-color-action-danger-hover: ${semantic.colors.color.action.dangerHover};

  --ds-color-status-live: ${semantic.colors.color.status.live};
  --ds-color-status-live-subtle: ${semantic.colors.color.status.liveSubtle};
  --ds-color-status-upcoming: ${semantic.colors.color.status.upcoming};
  --ds-color-status-upcoming-subtle: ${semantic.colors.color.status.upcomingSubtle};

  /* Spacing */
  --ds-space-layout-gutter: ${semantic.spacing.space.layout.gutter};
  --ds-space-layout-gap: ${semantic.spacing.space.layout.gap};
  --ds-space-card-padding: ${semantic.spacing.space.card.padding};
  --ds-space-card-gap: ${semantic.spacing.space.card.gap};

  /* Typography */
  --ds-font-family-body: ${semantic.typography.typography.body.family};
  --ds-font-family-heading: ${semantic.typography.typography.heading.family};
  --ds-font-size-base: ${semantic.typography.typography.body.size};
  --ds-font-size-heading: ${semantic.typography.typography.heading.size};

  /* Radius */
  --ds-radius-sm: ${radius.sm};
  --ds-radius-md: ${radius.md};
  --ds-radius-lg: ${radius.lg};
  --ds-radius-xl: ${radius.xl};
  --ds-radius-full: ${radius.full};

  /* Elevation */
  --ds-elevation-sm: ${elevation.sm};
  --ds-elevation-md: ${elevation.md};
  --ds-elevation-lg: ${elevation.lg};
}
`;
}
