# Prompt Builder Studio

Prompt Builder Studio is a full-stack web application designed to help users visually configure UI design aspects and generate tailored prompts for AI coding tools. These prompts can then be used to build custom web or mobile interfaces.

## Project Structure

The project is organized into two main parts:

-   `/client`: Contains the frontend React application built with Create React App, TypeScript, Tailwind CSS, Framer Motion, and Zustand for state management.
-   `/server`: Contains a Node.js backend built with Express and TypeScript. (Currently minimal, intended for future expansion like saving prompt presets).

## Getting Started

### Prerequisites

-   Node.js (v16 or later recommended)
-   npm (comes with Node.js)

### Client (Frontend)

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm start
    ```
    This will open the app in your default browser, usually at `http://localhost:3000`.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    Static assets will be generated in the `client/build` directory.

### Server (Backend)

The backend is currently minimal and primarily serves as a placeholder for future features.

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server (using ts-node):**
    ```bash
    npx ts-node src/index.ts
    ```
    Alternatively, you can compile the TypeScript and then run the JavaScript:
    ```bash
    npm run tsc # (Assuming you add a "tsc": "tsc" script to server/package.json or run npx tsc directly)
    node dist/index.js
    ```
    The server will typically start on `http://localhost:3001`.

## Core Functionality

The app allows users to configure various UI design aspects through a series of selectors:

1.  **Layout Type:** Web / Mobile
    -   Templates: Hero, Features, Onboarding, etc.
2.  **Layout Configuration:** Card, List, Grid, etc.
3.  **Framing Style:** Fullscreen, Browser Mockup, etc.
4.  **Visual Style:** Flat, Minimalist, Material Design, etc.
5.  **Theme Mode:** Light, Dark, Auto, Toggleable
6.  **Accent Color:** Selectable Tailwind colors
7.  **Background Color:** Transparent, Solid Colors, Gradients (UI for gradient picker is basic)
8.  **Border Settings:** Color, Radius, Style
9.  **Shadow Depth:** None, Small, Medium, etc.
10. **Typography Options:** Font families, specific heading/body fonts
11. **Text Sizes:** Ranges for Heading, Subheading, Body
12. **Effects & Animations:** Type, Trigger, Duration, Delay, etc.

Based on these selections, a detailed textual prompt is generated, suitable for use with AI coding assistants.

### Features

-   Dynamic prompt generation based on UI selections.
-   Copy generated prompt to clipboard.
-   Export generated prompt as a Markdown file.
-   Basic animations for UI elements using Framer Motion.

## Tech Stack

-   **Frontend:**
    -   React (with Create React App, TypeScript)
    -   Tailwind CSS
    -   Framer Motion (for animations)
    -   Zustand (for state management)
-   **Backend (Minimal):**
    -   Node.js
    -   Express
    -   TypeScript
-   **Development:**
    -   Jest & React Testing Library (for frontend tests)
    -   ESLint

## Future Enhancements (Potential)

-   Implement backend functionality to save and load user prompt presets.
-   Develop a live preview area that visually reflects the selected options.
-   Expand customization options for gradients, images, and complex animations.
-   Add more templates and style options.
-   User authentication for saving presets.
