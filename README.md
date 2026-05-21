# 🥜 nuts&cacao — Interactive Candy-Inspired Customizer Store

Welcome to **nuts&cacao**, a playful, vibrant e-commerce storefront that brings the fun and color of candy-customization to premium dry fruits, nuts, and chocolate button mixes.

Inspired by the bubbly, high-contrast, and candy-colored aesthetic of the M&M's US homepage, this application allows users to search products, sort by category bubbles, customize their own snack mixtures, and simulate a custom checkout jar.

## ✨ Features
- 🎨 **Playful candy theme**: Vibrant HSL colors, bubbly custom typography (**Lilita One** & **Fredoka**), and high-contrast borders.
- 🎛️ **Interactive Mix Builder**: Drag-and-drop or slider-controlled recipe builder to balance your nuts and cacao weights.
- 📦 **Sticker-style elements**: Tactile shadows, micro-animations, bouncy hover scale states, and spring transitions.
- 📱 **Fully responsive**: Staggered layout animations, responsive category bubbles, and drawer side-panels for cart details.

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Properties
- **Icons**: Lucide React



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```



