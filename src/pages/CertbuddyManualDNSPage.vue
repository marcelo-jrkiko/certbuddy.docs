<template>
  <article class="documentation-page">
    <h2>DNS-01 (Manual)</h2>
    <p>
      The <code>MANUAL_DNS</code> challenge is designed for providers where API automation
      is not available. CertBuddy pauses and waits for operator confirmation.
    </p>

    <h3>How It Works</h3>
    <ol>
      <li>Engine creates a pending interaction request with TXT record instructions.</li>
      <li>Operator updates DNS manually.</li>
      <li>Operator answers the interaction request.</li>
      <li>Issuance flow resumes and ACME validation continues.</li>
    </ol>

    <h3>Interaction Request Payload</h3>
    <pre><code>{
  "type": "dns_change",
  "request_data": {
    "domain": "example.com",
    "record_name": "_acme-challenge.example.com",
    "record_type": "TXT",
    "token": "..."
  },
  "status": "new"
}</code></pre>

    <h3>Configuration</h3>
    <pre><code>{
  "timeout_seconds": 86400,
  "poll_interval_seconds": 30
}</code></pre>

    <h3>Tradeoffs</h3>
    <ul>
      <li>Works with any DNS provider.</li>
      <li>Requires human action for each issuance.</li>
      <li>Not marked as automatic-renew compatible.</li>
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
</style>
