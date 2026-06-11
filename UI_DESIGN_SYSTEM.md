# Minimal Monochrome Design System

A unified, high-contrast, and accessibility-compliant design system engineered for portfolio showcases and developer web applications. This system prioritizes sleek dark surfaces, premium micro-animations, clear typography hierarchy, and flexible interaction states.

---

## 🎨 Color Palette & Tokens (CSS Variables)

The core theme uses a strict monochrome palette designed for WCAG AA contrast compliance (minimum 4.5:1 ratio for body text).

```css
:root {
  /* Backgrounds & Surfaces */
  --color-background: #050505;               /* Deepest dark background */
  --color-surface: #0c0c0c;                  /* Base component surface */
  --color-surface-container: #121212;        /* Standard element container */
  --color-surface-container-low: #0a0a0a;    /* Lower elevation surface */
  --color-surface-container-lowest: #050505; /* Deepest elevation surface */
  --color-surface-container-high: #1c1c1c;   /* Elevated surface (hover states) */
  --color-surface-container-highest: #262626;/* Highly elevated surface */
  
  /* Brand & Actions */
  --color-primary: #ffffff;                  /* Primary foreground/action color */
  --color-on-primary: #000000;               /* Contrast text on primary */
  --color-tertiary: #ffffff;                 /* Secondary action background */
  --color-on-tertiary: #000000;              /* Contrast text on tertiary */
  
  /* Text & Accessibility */
  --color-on-surface: #f3f4f6;               /* High legibility text (Silver-White) */
  --color-on-surface-variant: #a3a3a3;       /* Medium contrast text (Cool Gray) */
  --color-placeholder: #525252;              /* Muted text / placeholders */
  
  /* Borders & Outlines */
  --color-outline: #262626;                  /* Primary border line */
  --color-outline-variant: #1a1a1a;          /* Subtle divider line */
}
```

---

## ✍️ Typography Rules

We employ a clear distinction between expressive headlines and high-readability body copy:

*   **Headlines (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`)**
    *   **Font Family**: `'Outfit', sans-serif`
    *   **Visual Style**: Bold, geometric, high-impact structure.
    *   **Color**: `var(--color-primary)` (`#ffffff`)
*   **Body & UI Text**
    *   **Font Family**: `'Inter', sans-serif`
    *   **Visual Style**: Clean, highly-legible Neo-Grotesque spacing.
    *   **Color**: `var(--color-on-surface)` (`#f3f4f6`)
*   **Monospace & Code Blocks**
    *   **Font Family**: `'Fira Code', monospace`

---

## ⚡ Transitions & Shape System

Consistency in borders, spacing, and transition speeds ensures the interface feels responsive and alive.

*   **Border Radii**:
    *   `--radius-lg: 16px` — Used for standard cards and interactive grid elements.
    *   `--radius-xl: 24px` — Used for main content wrappers, modals, and showcase panels.
*   **Transition Curve**:
    *   `--transition-smooth: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
    *   *Rule*: Apply this transition to color, background-color, border-color, and box-shadow properties to guarantee smooth, non-linear hover feedback.

---

## ♿ Accessibility (WCAG AA Compliance)

1.  **Contrast Ratios**: Body text (`var(--color-on-surface)`) must always have a contrast ratio of at least 4.5:1 against the background/surfaces.
2.  **Focus States**: Never hide default outlines without providing a customized visual state. Keyboard navigation is supported globally using:
    ```css
    *:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 4px;
    }
    ```

---

## 🔘 The Back Buttons

The design system incorporates two distinct back navigation treatments, each with specific interactive physics and styling guidelines.

### 1. Outbound/Global Back Button (`.resume-link-btn`)
Used for crossing project boundaries (e.g., returning to a main resume page from a specific sub-project portfolio page).

*   **Visual Design**: A minimal, monochrome rounded pill button.
*   **Default State**:
    *   Background: `transparent`
    *   Border: `1px solid var(--color-primary)` (pure white)
    *   Text: `var(--color-primary)` (pure white)
*   **Hover State**:
    *   Background: `var(--color-primary)` (solid white)
    *   Text: `var(--color-on-primary)` (solid black)
    *   Shadow: `0 8px 24px rgba(255, 255, 255, 0.12)` (creates a subtle white glow effect)
*   **Micro-interactions (Framer Motion)**:
    *   Hover: Scale up slightly to `1.03`
    *   Click/Tap: Scale down slightly to `0.98`
*   **CSS Implementation**:
    ```css
    .resume-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      padding: 10px 24px;
      border-radius: 9999px; /* Rounded pill shape */
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .resume-link-btn:hover {
      background: var(--color-primary);
      color: var(--color-on-primary);
      box-shadow: 0 8px 24px rgba(255, 255, 255, 0.12);
    }
    ```

### 2. Internal/Viewer Back Button (`.back-link-btn`)
Used to navigate within the same application (e.g., returning from a detailed component showcase view to the parent dashboard/index page).

*   **Visual Design**: A compact, rounded rectangular card/button.
*   **Default State**:
    *   Background: `var(--color-surface-container)` (dark grey `#121212`)
    *   Border: `1px solid var(--color-outline)` (very dark grey `#262626`)
    *   Text: `var(--color-primary)` (white)
*   **Hover State**:
    *   Background: `var(--color-primary)` (solid white)
    *   Border: `1px solid var(--color-primary)`
    *   Text: `var(--color-on-primary)` (solid black)
*   **Micro-interactions (Framer Motion)**:
    *   Animate the inner back arrow icon (`<ArrowLeft />`) to translate leftward (`x: -2`) using a spring curve (`stiffness: 400`, `damping: 10`) on hover.
*   **CSS Implementation**:
    ```css
    .back-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--color-surface-container);
      border: 1px solid var(--color-outline);
      color: var(--color-primary);
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1rem;
      text-decoration: none;
      cursor: pointer;
      transition: var(--transition-smooth);
      flex-shrink: 0;
      white-space: nowrap;
    }
    .back-link-btn:hover {
      background: var(--color-primary);
      color: var(--color-on-primary);
      border-color: var(--color-primary);
    }
    ```

---

## 📦 Interactive Element States (Hover & Grid Cards)

Interactive items (such as feature blocks or showcase project cards) use scaling and outline highlights to guide the user's eye:

1.  **Component Cards (`.component-card`)**:
    *   Default: Background `var(--color-surface-container)`, Border `1px solid var(--color-outline)`.
    *   Hover: Background transitions to `var(--color-surface-container-high)` (`#1c1c1c`), Border highlights to solid white (`var(--color-primary)`), and a deep dark shadow is projected: `0 10px 24px rgba(0, 0, 0, 0.6)`.
2.  **Card Content Scaling**:
    *   Thumbnail wrapper overlays overflow hidden (`overflow: hidden`). On card hover, the image scales up by 5% (`transform: scale(1.05)`) with a `0.3s cubic-bezier(0.4, 0, 0.2, 1)` timing curve.
    *   Secondary elements like tags or action icons change color from gray (`var(--color-on-surface-variant)`) to white (`var(--color-primary)`).

---

## 🛠️ Third-Party Styles Integration (e.g., Material UI / Tailwind CSS)

To ensure cohesive presentation, external libraries are overridden to hook into the CSS variables.

### Material UI (MUI) Dark Overrides
Apply these classes or theme configurations globally to enforce the theme:

```css
/* Card & Paper surfaces */
.MuiPaper-root {
  background-color: var(--color-surface) !important;
  color: var(--color-on-surface) !important;
  border: 1px solid var(--color-outline) !important;
}

/* Accordion modifications */
.MuiAccordion-root {
  background-color: var(--color-surface-container-low) !important;
  border-color: var(--color-outline) !important;
}

/* Primary buttons */
.MuiButton-containedPrimary {
  background-color: var(--color-primary) !important;
  color: var(--color-on-primary) !important;
  font-weight: 700 !important;
}
.MuiButton-containedPrimary:hover {
  background-color: #e5e5e5 !important;
}

/* Text Input & Field outlines */
.MuiOutlinedInput-notchedOutline {
  border-color: var(--color-outline) !important;
}
.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
  border-color: var(--color-on-surface-variant) !important;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border-color: var(--color-primary) !important;
}
```

---

## 🎚️ Custom Scrollbars

We style browser scrollbars with custom monochrome tokens to match the dark canvas:

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-background);
}
::-webkit-scrollbar-thumb {
  background: var(--color-outline);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-on-surface-variant);
}
```
