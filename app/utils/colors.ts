export const Colors = {
  light: {
    primary: "#34CCA5",
    secondary: "#3b82f6", // Blue
    background: "#ffffff",
    card: "#f6f6f6",
    text: "#1f2937",
    textSecondary: "#6b7280",
    border: "#d1d5db",
    notification: "#ef4444",
    success: "#10B981",
    warning: "#f59e0b",
    danger: "#ef4444",
    thirdColor: "#444c58",
    info: "#3b82f6",
    icons: "#444c58",
    inputs: "#fff",
    muted: "#f3f4f6",
    cardBackground: "#ffffff",
  },
  dark: {
    primary: "#34CCA5",
    secondary: "#3b82f6",
    background: "#000",
    card: "#04102C",
    text: "#fff",
    textSecondary: "#A6B3D1",
    border: "#444c58",
    thirdColor: "#505762",
    notification: "#ef4444",
    success: "#10B981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    icons: "#fff",
    inputs: "#000",
    muted: "#1f2937",
    cardBackground: "#111827",
  },
}

export const useThemeColors = (colorScheme: "light" | "dark" | undefined) => {
  const resolvedScheme = colorScheme || "light"
  return Colors[resolvedScheme]
}

