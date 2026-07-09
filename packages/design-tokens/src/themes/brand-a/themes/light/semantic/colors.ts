import type { SemanticColors } from "../../../../../contracts/semantic";
import { colors } from "../../../primitives/colors";

export const semanticColors: SemanticColors = {
  color: {
    text: {
      primary: colors.gray[900],
      secondary: colors.gray[600],
      subtle: colors.gray[400],
      onPrimary: colors.gray[50],
    },
    surface: {
      default: "#ffffff",
      subtle: colors.gray[100],
      card: "#ffffff",
    },
    border: {
      default: colors.gray[200],
      subtle: colors.gray[100],
    },
    action: {
      primary: colors.gray[900],
      primaryHover: colors.gray[800],
      danger: colors.red[600],
      dangerHover: colors.red[700],
    },
    status: {
      live: colors.green[700],
      liveSubtle: colors.green[50],
      upcoming: colors.blue[700],
      upcomingSubtle: colors.blue[50],
    },
    neutrals: {
      dark: colors.gray[900],
      medium: colors.gray[600],
      light: colors.gray[200],
      extraLight: colors.gray[50],
    },
  },
};
