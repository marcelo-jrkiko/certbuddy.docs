<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <img :src="logoSrc" :alt="appTitle" class="logo" />
        <div class="title-info">
          <h1 class="app-title">{{ appTitle }}</h1>
          <span class="version">v{{ version }}</span>
        </div>
      </div>
      <a
        class="github-button"
        href="https://github.com/marcelo-jrkiko/certbuddy"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open CertBuddy repository on GitHub"
      >
        GitHub
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  appTitle?: string;
  version?: string;
  logoSrc?: string;
}

withDefaults(defineProps<Props>(), {
  appTitle: 'CertBuddy',
  version: '1.0.0',
  logoSrc: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%234f46e5%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2260%22 font-size=%2250%22 fill=%22white%22 text-anchor=%22middle%22 font-weight=%22bold%22%3ECB%3C/text%3E%3C/svg%3E',
});
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.title-info {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.app-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.version {
  font-size: 0.875rem;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.github-button {
  color: white;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.16);
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}

.github-button:hover {
  background: rgba(255, 255, 255, 0.24);
  border-color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 768px) {
  .header {
    padding: 1rem 1.5rem;
  }

  .header-content {
    gap: 0.75rem;
  }

  .logo-section {
    gap: 1rem;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .app-title {
    font-size: 1.25rem;
  }

  .github-button {
    padding: 0.45rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
