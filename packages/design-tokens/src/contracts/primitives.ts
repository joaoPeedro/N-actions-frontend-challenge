export interface PrimitiveColors {
  gray: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  blue: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  red: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  green: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
}

export interface PrimitiveSpacing {
  50: string;
  100: string;
  150: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
}

export interface PrimitiveTypography {
  fontFamilies: {
    body: string;
    heading: string;
    mono: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    display: string;
  };
  fontWeights: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeights: {
    none: string;
    tight: string;
    normal: string;
    loose: string;
  };
}

export interface PrimitiveRadius {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface PrimitiveElevation {
  none: string;
  sm: string;
  md: string;
  lg: string;
}

export interface PrimitiveMotion {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
  };
}

export interface PrimitiveBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface PrimitiveTheme {
  colors: PrimitiveColors;
  spacing: PrimitiveSpacing;
  typography: PrimitiveTypography;
  radius: PrimitiveRadius;
  elevation: PrimitiveElevation;
  motion: PrimitiveMotion;
  breakpoints: PrimitiveBreakpoints;
}
