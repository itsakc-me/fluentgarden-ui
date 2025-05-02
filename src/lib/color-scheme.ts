export interface ColorScheme {
  name: string;
  description: string;
  colors: {
    /* Base Colors */
    background: string,
    foreground: string,

    card: string,
    card_foreground: string,

    popover: string,
    popover_foreground: string,

    /* Primary Colors */
    primary: string,
    primary_foreground: string,

    /* Secondary Colors */
    secondary: string,
    secondary_foreground: string,

    /* Muted Colors */
    muted: string,
    muted_foreground: string,

    /* Accent Colors */
    accent: string,
    accent_foreground: string,

    /* Destructive Colors */
    destructive: string,
    destructive_foreground: string,

    /* Border, Input, Ring */
    border: string,
    input: string,
    ring: string,

    /* Radius */
    radius: string,
    /* Sidebar */
    sidebar_background: string,
    sidebar_foreground: string,
    sidebar_primary: string,
    sidebar_primary_foreground: string,
    sidebar_accent: string,
    sidebar_accent_foreground: string,
    sidebar_border: string,
    sidebar_ring: string
  };
  darkColors?: {
    background: string,
    foreground: string,

    card: string,
    card_foreground: string,

    popover: string,
    popover_foreground: string,

    primary: string,
    primary_foreground: string,

    secondary: string,
    secondary_foreground: string,

    muted: string,
    muted_foreground: string,

    accent: string,
    accent_foreground: string,

    destructive: string,
    destructive_foreground: string,

    border: string,
    input: string,
    ring: string,

    sidebar_background: string,
    sidebar_foreground: string,
    sidebar_primary: string,
    sidebar_primary_foreground: string,
    sidebar_accent: string,
    sidebar_accent_foreground: string,
    sidebar_border: string,
    sidebar_ring: string
  };
}

export function ColorScheme(scheme: ColorScheme): string {
  const css = `
    :root {
      /* Base Colors */
      --background: ${scheme.colors.background};
      --foreground: ${scheme.colors.foreground};

      --card: ${scheme.colors.card};
      --card-foreground: ${scheme.colors.card_foreground};

      --popover: ${scheme.colors.popover};
      --popover-foreground: ${scheme.colors.popover_foreground};

      /* Primary Colors */
      --primary: ${scheme.colors.primary};
      --primary-foreground: ${scheme.colors.primary_foreground};

      /* Secondary Colors */
      --secondary: ${scheme.colors.secondary};
      --secondary-foreground: ${scheme.colors.secondary_foreground};

      /* Muted Colors */
      --muted: ${scheme.colors.muted};
      --muted-foreground: ${scheme.colors.muted_foreground};

      /* Accent Colors */
      --accent: ${scheme.colors.accent};
      --accent-foreground: ${scheme.colors.accent_foreground};

      /* Destructive Colors */
      --destructive: ${scheme.colors.destructive};
      --destructive-foreground: ${scheme.colors.destructive_foreground};

      /* Border, Input, Ring */
      --border: ${scheme.colors.border};
      --input: ${scheme.colors.input};
      --ring: ${scheme.colors.ring};

      /* Radius */
      --radius: ${scheme.colors.radius};
      /* Sidebar */
      --sidebar-background: ${scheme.colors.sidebar_background};
      --sidebar-foreground: ${scheme.colors.sidebar_foreground};
      --sidebar-primary: ${scheme.colors.sidebar_primary};
      --sidebar-primary-foreground: ${scheme.colors.sidebar_primary_foreground};
      --sidebar-accent: ${scheme.colors.sidebar_accent};
      --sidebar-accent-foreground: ${scheme.colors.sidebar_accent_foreground};
      --sidebar-border: ${scheme.colors.sidebar_border};
      --sidebar-ring: ${scheme.colors.sidebar_ring};
    }
  `;

  if (scheme.darkColors) {
    css.concat(`
      .dark {
        --background: ${scheme.darkColors.background};
        --foreground: ${scheme.darkColors.foreground};
  
        --card: ${scheme.darkColors.card};
        --card-foreground: ${scheme.darkColors.card_foreground};
  
        --popover: ${scheme.darkColors.popover};
        --popover-foreground: ${scheme.darkColors.popover_foreground};
  
        --primary: ${scheme.darkColors.primary};
        --primary-foreground: ${scheme.darkColors.primary_foreground};
  
        --secondary: ${scheme.darkColors.secondary};
        --secondary-foreground: ${scheme.darkColors.secondary_foreground};
  
        --muted: ${scheme.darkColors.muted};
        --muted-foreground: ${scheme.darkColors.muted_foreground};
  
        --accent: ${scheme.darkColors.accent};
        --accent-foreground: ${scheme.darkColors.accent_foreground};
  
        --destructive: ${scheme.darkColors.destructive};
        --destructive-foreground: ${scheme.darkColors.destructive_foreground};
  
        --border: ${scheme.darkColors.border};
        --input: ${scheme.darkColors.input};
        --ring: ${scheme.darkColors.ring};
  
        --sidebar-background: ${scheme.darkColors.sidebar_background};
        --sidebar-foreground: ${scheme.darkColors.sidebar_foreground};
        --sidebar-primary: ${scheme.darkColors.sidebar_primary};
        --sidebar-primary-foreground: ${scheme.darkColors.sidebar_primary_foreground};
        --sidebar-accent: ${scheme.darkColors.sidebar_accent};
        --sidebar-accent-foreground: ${scheme.darkColors.sidebar_accent_foreground};
        --sidebar-border: ${scheme.darkColors.sidebar_border};
        --sidebar-ring: ${scheme.darkColors.sidebar_ring};
      }
    `);
  }

  return css;
}
