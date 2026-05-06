# CertBuddy Documentation Website

A modern documentation website built with **Vue 3**, **TypeScript**, and **Vite**. Features a responsive layout with a lateral navigation menu powered by static JSON configuration.

## Features

- ✨ **Vue 3 Composition API** with TypeScript support
- 📱 **Responsive Design** - Mobile-friendly layout
- 🎨 **Modern UI** - Clean and professional styling
- 🗂️ **JSON-Based Menu** - Configure documentation structure via static JSON
- 📄 **Component-Based Pages** - Each documentation page is a separate Vue component
- ⚡ **Fast Development** - Powered by Vite
- 🔄 **Hot Module Replacement (HMR)** - Instant updates during development

## Project Structure

```
certbuddy.docs/
├── src/
│   ├── components/
│   │   ├── Header.vue          # Header with logo, title, and version
│   │   ├── Footer.vue          # Footer with copyright
│   │   ├── SideMenu.vue        # Lateral navigation menu
│   │   └── MainLayout.vue      # Main layout component
│   ├── pages/
│   │   ├── IntroductionPage.vue
│   │   ├── InstallationPage.vue
│   │   ├── CoreFeaturesPage.vue
│   │   ├── AdvancedFeaturesPage.vue
│   │   ├── QuickStartPage.vue
│   │   ├── BestPracticesPage.vue
│   │   ├── RestApiPage.vue
│   │   ├── WebhooksPage.vue
│   │   ├── FaqPage.vue
│   │   ├── TroubleshootingPage.vue
│   │   └── NotFoundPage.vue
│   ├── config/
│   │   └── menu.json           # Menu structure configuration
│   ├── types/
│   │   └── menu.ts             # TypeScript types for menu
│   ├── App.vue                 # Root component
│   └── main.ts                 # Application entry point
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Installation

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn package manager

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The application will automatically open in your browser at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Configuration

### Menu Structure

The menu structure is defined in `src/config/menu.json`. You can customize it by adding, removing, or modifying sections and items:

```json
{
  "sections": [
    {
      "id": "getting-started",
      "title": "Getting Started",
      "items": [
        {
          "id": "introduction",
          "title": "Introduction",
          "component": "IntroductionPage"
        }
      ]
    }
  ]
}
```

### Creating Documentation Pages

1. Create a new Vue component in `src/pages/` directory
2. Add the corresponding entry in `src/config/menu.json`
3. The component will be automatically loaded when the menu item is clicked

Example:
```vue
<template>
  <article class="documentation-page">
    <h2>My New Page</h2>
    <p>Your documentation content here...</p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
.documentation-page {
  line-height: 1.6;
  color: #2d3748;
}
</style>
```

### Customizing Header

Edit `src/components/MainLayout.vue` to change the app title and version:

```vue
<Header 
  app-title="Your App Name" 
  version="2.0.0" 
/>
```

### Customizing Footer

Edit the footer text in `src/components/MainLayout.vue`:

```vue
<Footer 
  copyright-text="Your Company Name"
/>
```

## Styling

The documentation website uses a modern color scheme with:
- **Primary**: Indigo → Purple gradient (`#667eea` to `#764ba2`)
- **Dark**: Slate gray (`#2d3748`)
- **Light**: Off-white (`#f7fafc`)

Customize colors in component `<style>` sections.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Development Tips

1. **HMR Support**: Changes to Vue components will reflect instantly without page reload
2. **Type Safety**: Full TypeScript support ensures type-safe code
3. **Responsive Design**: Test with different screen sizes (especially < 768px and < 640px)
4. **Console Errors**: Check browser console for any component loading issues

## Adding New Sections

1. Create new page component in `src/pages/`
2. Add entry to `menu.json` under appropriate section or create new section
3. The menu will automatically update and the page will be accessible

Example menu entry:
```json
{
  "id": "my-feature",
  "title": "My Feature",
  "component": "MyFeaturePage"
}
```

## Deployment

The production build outputs to `dist/` directory. You can deploy this to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Simply upload the contents of the `dist/` folder to your hosting provider.

## License

Copyright © 2024 CertBuddy. All rights reserved.

## Support

For issues or questions, please contact support.

---

Built with ❤️ using Vue 3 + TypeScript
