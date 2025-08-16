# AI Development Rules for Navodaya AI Prep App

This document outlines the core technologies and development guidelines for maintaining consistency and quality in the Navodaya AI Prep application.

## Tech Stack Overview

*   **Framework:** React.js
*   **Language:** TypeScript (though current files are JSX, new development should favor TSX)
*   **Routing:** React Router DOM
*   **Styling:** Tailwind CSS for all styling, ensuring responsive designs.
*   **UI Components:** shadcn/ui (pre-installed and preferred for common UI elements).
*   **Headless UI:** Radix UI (underpins shadcn/ui components).
*   **Icons:** lucide-react for all iconography.
*   **Build Tool:** Vite
*   **Font:** Poppins (imported via Google Fonts in `index.css`).

## Library Usage Rules

1.  **Styling:**
    *   **Always** use Tailwind CSS classes for all styling. Avoid inline styles or separate CSS modules unless absolutely necessary for very specific, isolated cases (which should be rare).
    *   Ensure all designs are responsive and adapt well to different screen sizes.

2.  **UI Components:**
    *   **Prioritize shadcn/ui components.** These are pre-configured and styled with Tailwind CSS, providing a consistent look and feel.
    *   If a required component is not available in shadcn/ui, or if significant customization is needed that would involve modifying a shadcn/ui component directly, **create a new, custom component** in `src/components/`. Do not modify existing shadcn/ui component files.
    *   Keep components small and focused, ideally under 100 lines of code.

3.  **Icons:**
    *   Use icons from the `lucide-react` library.

4.  **Routing:**
    *   All client-side routing should be handled using `react-router-dom`.
    *   Keep the main route definitions within `src/App.jsx` (or `src/App.tsx` if converted).

5.  **File Structure:**
    *   Source code resides in the `src/` directory.
    *   Pages should be placed in `src/pages/`.
    *   Reusable components should be placed in `src/components/`.
    *   **Every new component or hook must be created in its own dedicated file.** Do not add new components to existing files.
    *   Directory names must be all lower-case (e.g., `src/pages`, `src/components`).

6.  **Code Quality & Principles:**
    *   **Simplicity and Elegance:** Aim for the simplest, most elegant solution. Avoid over-engineering.
    *   **Completeness:** All implemented features must be fully functional with complete code; no placeholders or partial implementations.
    *   **Error Handling:** Do not implement `try/catch` blocks for error handling unless specifically requested. Errors should generally bubble up.
    *   **Toasts:** Use toast notifications to inform users about important events (e.g., success messages, errors).

7.  **External Integrations (e.g., Auth, Database, Server-side functions):**
    *   If a feature requires authentication, database interaction, or server-side logic (e.g., handling API keys), the user must first be prompted to add Supabase integration.