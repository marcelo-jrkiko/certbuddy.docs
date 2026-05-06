<template>
  <article class="documentation-page">
    <h2>Webhooks</h2>
    <p>
      Use webhooks to receive real-time notifications about certificate events.
    </p>
    <h3>Webhook Events</h3>
    <ul>
      <li>certificate.created</li>
      <li>certificate.renewed</li>
      <li>certificate.expiring_soon</li>
      <li>certificate.expired</li>
    </ul>
    <h3>Setting Up Webhooks</h3>
    <p>
      Go to your dashboard settings and configure your webhook URL. CertBuddy will send POST
      requests to your URL whenever events occur.
    </p>
    <h3>Webhook Format</h3>
    <pre><code>{
  "event": "certificate.expiring_soon",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "certificate_id": "cert_123",
    "name": "example.com",
    "expires_at": "2024-02-15"
  }
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

.documentation-page ul {
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
