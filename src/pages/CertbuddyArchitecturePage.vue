<template>
  <article class="documentation-page">
    <h2>Application Architecture</h2>
    <p>
      CertBuddy is a comprehensive full-stack certificate management platform with a modular architecture.
      This guide explains how all components work together.
    </p>

    <h3>System Overview</h3>
    <p>
      CertBuddy consists of three main layers:
    </p>
    <ul>
      <li><strong>Frontend</strong>: React + TypeScript web application</li>
      <li><strong>Backend Engine</strong>: Python Flask API for certificate operations</li>
      <li><strong>Data Backend</strong>: Directus headless CMS for data management</li>
    </ul>

    <h3>Frontend Architecture</h3>
    <p>
      The frontend is built with React using TanStack Router and TanStack Query for modern application state management.
    </p>
    <ul>
      <li><strong>Framework</strong>: React 18+ with TypeScript</li>
      <li><strong>Build Tool</strong>: Vite for fast development and optimized builds</li>
      <li><strong>UI Components</strong>: Radix UI primitives with custom styling</li>
      <li><strong>Routing</strong>: TanStack Router for type-safe routing</li>
      <li><strong>Data Fetching</strong>: TanStack Query for efficient API communication</li>
      <li><strong>Styling</strong>: Tailwind CSS for utility-first styling</li>
      <li><strong>Form Handling</strong>: React Hook Form with Zod validation</li>
    </ul>
    <p><strong>Location</strong>: <code>/src</code> directory in the root project folder</p>

    <h3>Backend Architecture</h3>
    <p>
      The backend engine is responsible for certificate lifecycle management and third-party integrations.
    </p>
    <ul>
      <li><strong>Framework</strong>: Flask with Python 3.8+</li>
      <li><strong>API Documentation</strong>: Flasgger (Swagger integration)</li>
      <li><strong>Authentication</strong>: Bearer token-based authentication</li>
      <li><strong>Task Scheduling</strong>: Automated renewal and maintenance tasks</li>
      <li><strong>Event System</strong>: Event-driven architecture for operations</li>
      <li><strong>Multi-CA Support</strong>: Abstracted CA integration layer</li>
    </ul>
    <p><strong>Location</strong>: <code>/backend</code> directory</p>

    <h3>Backend Components</h3>
    <ul>
      <li>
        <strong>Controllers</strong>: HTTP request handlers
        <ul>
          <li><code>CertificateController</code>: Certificate management endpoints</li>
          <li><code>EngineController</code>: Certificate request and status endpoints</li>
          <li><code>TasksController</code>: Task scheduling and management endpoints</li>
        </ul>
      </li>
      <li>
        <strong>Engine</strong>: Core certificate operations
        <ul>
          <li><code>CertificateRequester</code>: Handles certificate requests</li>
          <li><code>EventDispatcher</code>: Manages system events</li>
          <li><code>Scheduler</code>: Task scheduling and execution</li>
        </ul>
      </li>
      <li>
        <strong>Helpers</strong>: Utility functions
        <ul>
          <li><code>Auth</code>: Authentication and authorization</li>
          <li><code>DataBackend</code>: Directus integration</li>
          <li><code>CertificateViewer</code>: Certificate inspection and parsing</li>
        </ul>
      </li>
    </ul>

    <h3>Data Backend (Directus)</h3>
    <p>
      Directus serves as the central data repository for all application data.
    </p>
    <ul>
      <li><strong>Authentication</strong>: Master token authentication for backend operations</li>
      <li><strong>Collections</strong>:
        <ul>
          <li><code>certificates</code>: Issued certificates and their metadata</li>
          <li><code>certificate_requests</code>: Request history and status</li>
          <li><code>configurations</code>: CA accounts and challenge configurations</li>
          <li><code>users</code>: User accounts and access management</li>
          <li><code>accounts</code>: Certificate Authority accounts</li>
        </ul>
      </li>
      <li><strong>Benefits</strong>:
        <ul>
          <li>Flexible schema management</li>
          <li>Built-in API for data access</li>
          <li>User and permission management</li>
          <li>Extensible for custom fields</li>
        </ul>
      </li>
    </ul>

    <h3>API Communication Flow</h3>
    <pre><code>Frontend (React)
    ↓ (API calls)
Backend Engine (Flask)
    ↓ (Bearer token auth)
Directus API
    ↓
PostgreSQL Database</code></pre>

    <h3>Certificate Request Flow</h3>
    <pre><code>1. User submits certificate request from UI
2. Frontend sends request to Backend Engine
3. Engine validates configuration and domain
4. Engine communicates with Certificate Authority
5. Engine calls challenge method (DNS-01, HTTP-01, etc.)
6. CA validates domain ownership
7. Certificate is issued
8. Engine stores certificate in Directus
9. Frontend displays certificate details
10. Renewal tasks monitor expiration</code></pre>

    <h3>Key Design Patterns</h3>
    <ul>
      <li><strong>Separation of Concerns</strong>: Each layer has distinct responsibilities</li>
      <li><strong>Abstraction</strong>: CA and challenge implementations are abstracted</li>
      <li><strong>Event-Driven</strong>: Core operations trigger events for extensibility</li>
      <li><strong>Bearer Tokens</strong>: Stateless authentication for scalability</li>
      <li><strong>Task Scheduling</strong>: Automated maintenance operations</li>
      <li><strong>Multi-User Support</strong>: User isolation and scoped data access</li>
    </ul>

    <h3>Deployment Architecture</h3>
    <p>
      CertBuddy can be deployed using Docker Compose with the following services:
    </p>
    <ul>
      <li><strong>Frontend Container</strong>: Serves static React application</li>
      <li><strong>Backend Container</strong>: Runs Flask API server</li>
      <li><strong>Directus Container</strong>: Manages data and provides API</li>
      <li><strong>PostgreSQL Container</strong>: Persistent data storage</li>
    </ul>
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

.documentation-page ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.documentation-page li {
  margin: 0.75rem 0;
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
  background: #f7fafc;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  color: #c53030;
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
