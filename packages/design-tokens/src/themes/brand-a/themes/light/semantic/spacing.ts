import type { SemanticSpacing } from "../../../../../contracts/semantic";
import { spacing } from "../../../primitives/spacing";

export const semanticSpacing: SemanticSpacing = {
  space: {
    layout: {
      gutter: spacing[200],
      gap: spacing[400],
      pagePadding: spacing[400],
    },
    card: {
      padding: spacing[300],
      gap: spacing[150],
    },
  },
};
