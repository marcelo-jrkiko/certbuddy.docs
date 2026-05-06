<template>
  <article class="documentation-page">
    <h2>REST API</h2>
    <p>
      CertBuddy provides a comprehensive REST API for integrating with your applications.
    </p>
    <h3>Authentication</h3>
    <p>
      Use API tokens to authenticate your requests. Include your token in the Authorization header.
    </p>
    <h3>Base URL</h3>
    <pre><code>https://api.certbuddy.com/v1</code></pre>
    <h3>Example Request</h3>
    <pre><code>GET /api/v1/certificates
Authorization: Bearer YOUR_API_TOKEN</code></pre>
    <h3>Response Format</h3>
    <p>
      All responses are returned in JSON format with appropriate HTTP status codes.
    </p>
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
