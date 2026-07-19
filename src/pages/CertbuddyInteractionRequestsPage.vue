<template>
  <article class="documentation-page">
    <h2>Interaction Requests</h2>
    <p>
      Interaction requests pause automated flows until a user reviews and answers a pending item.
      They are stored in the <code>interaction_request</code> collection.
    </p>

    <h3>Current Request Types</h3>
    <ul>
      <li><code>dns_change</code>: Manual DNS record action required.</li>
      <li><code>http_challenge_failed</code>: HTTP validation check failed and needs operator decision.</li>
    </ul>

    <h3>Status Model</h3>
    <ul>
      <li><code>new</code>: Waiting for user action.</li>
      <li><code>answer</code>: Approved/answered by user.</li>
      <li><code>rejected</code>: Explicitly rejected with optional reason.</li>
    </ul>

    <h3>Approval Flow</h3>
    <ol>
      <li>Challenge creates an interaction request.</li>
      <li>User opens Interaction Requests page and reviews details.</li>
      <li>User answers or rejects.</li>
      <li>Engine polling resumes and continues or fails with the supplied reason.</li>
    </ol>

    <h3>Directus Update Examples</h3>
    <pre><code>PATCH /items/interaction_request/:id
{
  "status": "answer",
  "response_data": {}
}

PATCH /items/interaction_request/:id
{
  "status": "rejected",
  "response_data": {
    "reason": "DNS record could not be added"
  }
}</code></pre>

    <h3>Operational Notes</h3>
    <ul>
      <li>Manual DNS default timeout is 24 hours.</li>
      <li>If timed out, issuance fails and emits <code>cert.failed</code>.</li>
      <li>Add event listeners to notify teams when manual action is pending.</li>
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
