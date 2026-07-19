<template>
  <article class="documentation-page">
    <h2>Event Listeners</h2>
    <p>
      Event listeners let you react to certificate lifecycle events using two handler types:
      <code>shell_script</code> and <code>webhook</code>.
    </p>

    <h3>Available Event IDs</h3>
    <ul>
      <li><code>cert.requested</code></li>
      <li><code>cert.issued</code></li>
      <li><code>cert.failed</code></li>
      <li><code>cert.expired</code></li>
      <li><code>cert.uploaded</code></li>
    </ul>

    <h3>Handler Types</h3>
    <h4>Shell Script</h4>
    <p>
      Executes <code>event_code</code> through an executable (default <code>/bin/bash</code>).
      Supports optional timeout, env vars and cwd via <code>event_params</code>.
    </p>

    <h4>Webhook</h4>
    <p>
      Sends HTTP requests using <code>event_params.url</code>, optional headers/query and
      JSON or text body generated from <code>event_code</code>.
    </p>

    <h3>Template Variables</h3>
    <p>
      Both handlers support macro templates like <code>&#123;&#123;event_id&#125;&#125;</code>, <code>&#123;&#123;user_id&#125;&#125;</code>,
      <code>&#123;&#123;payload.domain&#125;&#125;</code> and <code>&#123;&#123;params.timeout_seconds&#125;&#125;</code>.
    </p>

    <h3>Example Shell Listener</h3>
    <pre v-pre><code>{
  "name": "Log issued certs",
  "event_id": "cert.issued",
  "handler": "shell_script",
  "event_params": {
    "timeout_seconds": 30,
    "env": {
      "DOMAIN": "{{payload.domain}}"
    }
  },
  "event_code": "echo \"issued {{payload.domain}} cert={{payload.certificate_id}}\""
}</code></pre>

    <h3>Example Webhook Listener</h3>
  <pre v-pre><code>{
  "name": "Notify failed requests",
  "event_id": "cert.failed",
  "handler": "webhook",
  "event_params": {
    "url": "https://hooks.example.com/cert-events",
    "method": "POST",
    "body_format": "json",
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "event_code": "{\"event\":\"{{event_id}}\",\"domain\":\"{{payload.domain}}\",\"error\":\"{{payload.error}}\"}"
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

.documentation-page h4 {
  font-size: 1.0625rem;
  margin: 1rem 0 0.5rem 0;
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
