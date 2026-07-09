import type { SemanticTypography } from "../../../../../contracts/semantic";
import { typography } from "../../../primitives/typography";

export const semanticTypography: SemanticTypography = {
  typography: {
    body: {
      family: typography.fontFamilies.body,
      size: typography.fontSizes.base,
      weight: typography.fontWeights.normal,
    },
    heading: {
      family: typography.fontFamilies.heading,
      size: typography.fontSizes.xxl,
      weight: typography.fontWeights.bold,
    },
  },
};
