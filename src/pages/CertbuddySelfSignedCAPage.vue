<template>
  <article class="documentation-page">
    <h2>Self Signed CA</h2>
    <p>
      CertBuddy includes a built-in <code>SELF_SIGNED</code> certificate authority for
      internal environments, labs and development scenarios.
    </p>

    <h3>When To Use</h3>
    <ul>
      <li>Private services behind VPN</li>
      <li>Development and integration testing</li>
      <li>Air-gapped or offline environments</li>
    </ul>

    <h3>Compatibility</h3>
    <p>
      Self Signed CA uses <code>EMPTY</code> challenge type (no domain validation flow).
    </p>

    <h3>Configuration Preset</h3>
    <pre><code>{
  "validity_days": 365,
  "key_size": 2048
}</code></pre>

    <h3>Request Example</h3>
    <pre><code>POST /engine/request_certificate
{
  "domain": "internal.example.local",
  "challenge_type": "EMPTY",
  "certificate_authority": "SELF_SIGNED"
}</code></pre>

    <h3>Important Notes</h3>
    <ul>
      <li>Certificates are not publicly trusted by browsers.</li>
      <li>Distribute your root trust carefully in internal environments.</li>
      <li>Use Let's Encrypt for public internet endpoints.</li>
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
