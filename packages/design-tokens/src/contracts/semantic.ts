export interface SemanticColors {
  color: {
    text: {
      primary: string;
      secondary: string;
      subtle: string;
      onPrimary: string;
    };
    surface: {
      default: string;
      subtle: string;
      card: string;
    };
    border: {
      default: string;
      subtle: string;
    };
    action: {
      primary: string;
      primaryHover: string;
      danger: string;
      dangerHover: string;
    };
    status: {
      live: string;
      liveSubtle: string;
      upcoming: string;
      upcomingSubtle: string;
    };
    neutrals: {
      dark: string;
      medium: string;
      light: string;
      extraLight: string;
    };
  };
}

export interface SemanticSpacing {
  space: {
    layout: {
      gutter: string;
      gap: string;
      pagePadding: string;
    };
    card: {
      padding: string;
      gap: string;
    };
  };
}

export interface SemanticTypography {
  typography: {
    body: {
      family: string;
      size: string;
      weight: string;
    };
    heading: {
      family: string;
      size: string;
      weight: string;
    };
  };
}

export interface SemanticTheme {
  colors: SemanticColors;
  spacing: SemanticSpacing;
  typography: SemanticTypography;
}
