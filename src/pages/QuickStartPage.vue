<template>
  <article class="documentation-page">
    <h2>Quick Start Guide</h2>
    <p>
      This quick start follows the current CertBuddy workflow used by the engine and dashboard.
    </p>

    <h3>Step 1: Configure Environment</h3>
    <p>
      Set core backend variables and start services.
    </p>
    <pre><code>ENGINE_API_PORT=3000
DIRECTUS_URL=http://localhost:8055
ENGINE_MASTER_TOKEN=your_token
ENGINE_RENEWAL_CHECK_INTERVAL=24
ENGINE_RENEWAL_BEFORE_EXPIRE_HOURS=24</code></pre>

    <h3>Step 2: Add Challenge and CA Configs</h3>
    <p>
      Create at least one challenge config and one CA config in the dashboard.
      Typical production pair:
    </p>
    <ul>
      <li><strong>Challenge</strong>: <code>CLOUDFLARE_DNS</code></li>
      <li><strong>CA</strong>: <code>LETSENCRYPT</code></li>
    </ul>

    <h3>Step 3: Request a Certificate</h3>
    <p>
      Submit a request and keep the returned <code>thread_id</code>.
    </p>
    <pre><code>POST /engine/request_certificate
{
  "domain": "example.com",
  "challenge_type": "CLOUDFLARE_DNS",
  "certificate_authority": "LETSENCRYPT",
  "config": {
    "tags": ["prod", "web"]
  }
}</code></pre>

    <h3>Step 4: Track Request Status</h3>
    <p>
      Poll until completion:
    </p>
    <pre><code>GET /engine/request_status/:thread_id</code></pre>

    <h3>Step 5: Handle Interaction Requests (When Needed)</h3>
    <p>
      Interactive challenges like <code>MANUAL_DNS</code> create pending interaction requests.
      Review and answer them in the Interaction Requests screen.
    </p>

    <h3>Step 6: Configure Event Listeners</h3>
    <p>
      Add shell or webhook listeners for events like <code>cert.issued</code> and <code>cert.failed</code>.
    </p>

    <h3>Step 7: Verify Renewals</h3>
    <p>
      Trigger tasks and confirm renewal logs and events after first issuance.
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
