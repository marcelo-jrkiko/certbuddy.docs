<template>
  <article class="documentation-page">
    <h2>Installation</h2>
    <p>
      Get started with CertBuddy by following these simple installation steps.
    </p>
    <h3>Prerequisites</h3>
    <ul>
      <li>Node.js 14.0 or higher</li>
      <li>npm or yarn package manager</li>
      <li>Git</li>
    </ul>
    <h3>Installation Steps</h3>
    <ol>
      <li>Clone the repository</li>
      <li>Install dependencies</li>
      <li>Configure your environment</li>
      <li>Run the application</li>
    </ol>
    <h3>Docker Installation</h3>
    <p>
      If you prefer using Docker, you can pull the official CertBuddy image:
    </p>
    <pre><code>docker pull certbuddy/app:latest
docker run -p 3000:3000 certbuddy/app:latest</code></pre>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
.documentation-page {
  line-height: 1.6;
  color: #2d3748;
}

.documentation-page h2 {
  font-size: 1.875rem;
  margin: 0 0 1.5rem 0;
  color: #1a202c;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.documentation-page h3 {
  font-size: 1.3125rem;
  margin: 1.5rem 0 0.75rem 0;
  color: #2d3748;
}

.documentation-page p {
  margin: 1rem 0;
}

.documentation-page ul,
.documentation-page ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.documentation-page li {
  margin: 0.5rem 0;
}

.documentation-page pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.documentation-page code {
  font-family: 'Courier New', monospace;
}

.documentation-page pre code {
  background: none;
  color: inherit;
  padding: 0;
}
</style>
