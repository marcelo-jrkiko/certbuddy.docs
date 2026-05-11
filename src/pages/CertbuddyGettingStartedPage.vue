<template>
  <article class="documentation-page">
    <h2>Getting Started</h2>
    <p>
      Welcome to CertBuddy! This guide will help you get up and running with the certificate management platform.
    </p>

    <h3>System Requirements</h3>
    <ul>
      <li><strong>Python</strong>: 3.8 or higher (for backend)</li>
      <li><strong>Node.js/Bun</strong>: Latest stable version (for frontend)</li>
      <li><strong>Docker</strong>: 20.10+ (recommended for deployment)</li>
      <li><strong>Directus</strong>: Self-hosted or cloud instance for data backend</li>
      <li><strong>PostgreSQL</strong>: 12+ (database for Directus)</li>
    </ul>

    <h3>Quick Setup</h3>
    <ol>
      <li>Clone the repository:
        <pre><code>git clone https://github.com/certbuddy/certbuddy.git
cd certbuddy</code></pre>
      </li>
      <li>Install dependencies:
        <pre><code># Backend dependencies
pip install -r backend/requirements.txt

# Frontend dependencies
npm install</code></pre>
      </li>
      <li>Configure environment variables:
        <pre><code>cp .env.sample .env
# Edit .env with your configuration</code></pre>
      </li>
      <li>Start the development servers:
        <pre><code># In one terminal
npm run dev  # Frontend on http://localhost:5173

# In another terminal
python backend/app.py  # Backend on http://localhost:3000</code></pre>
      </li>
    </ol>

    <h3>Prerequisites</h3>
    <p>Before starting, ensure you have:</p>
    <ul>
      <li>A Directus instance running and accessible</li>
      <li>A master token for Directus authentication</li>
      <li>Access to at least one Certificate Authority (Let's Encrypt, Cloudflare, etc.)</li>
      <li>A domain with DNS access for challenge verification</li>
    </ul>

    <h3>Docker Deployment</h3>
    <p>For production or isolated environments, use Docker Compose:</p>
    <pre><code>docker-compose -f docker-compose.dev.yml up --build</code></pre>
    <p>This will start all services including the frontend, backend, and supporting services.</p>

    <h3>First Steps</h3>
    <p>Once CertBuddy is running:</p>
    <ol>
      <li>Create a user account in Directus</li>
      <li>Add Certificate Authority credentials in the Dashboard</li>
      <li>Configure challenge methods for domain validation</li>
      <li>Request your first certificate through the UI</li>
      <li>Monitor certificate status on the dashboard</li>
    </ol>

    <h3>Health Check</h3>
    <p>Verify the backend is running correctly:</p>
    <pre><code>curl http://localhost:3000/health</code></pre>
    <p>Expected response:</p>
    <pre><code>{
  "status": "healthy",
  "message": "CertBuddy API is running"
}</code></pre>
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

.documentation-page strong {
  color: #1a202c;
}
</style>
