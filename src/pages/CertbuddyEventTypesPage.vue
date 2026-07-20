<template>
  <article class="documentation-page">
    <h2>Event Types &amp; Default Payloads</h2>
    <p>
      This page documents event types currently dispatched by Certbuddy and the
      default payload shape available to handlers.
    </p>

    <h3>Dispatcher-Added Fields (All Events)</h3>
    <p>
      Every listener execution includes these fields, even when not explicitly
      provided by the dispatch caller:
    </p>
    <ul>
      <li><code>event_id</code>: dispatched event type</li>
      <li><code>user_id</code>: user id from dispatch call</li>
      <li><code>listener_id</code>: current event listener id</li>
    </ul>

    <h3>Certificate Events</h3>

    <h4><code>cert.requested</code></h4>
    <p>Dispatched when certificate request processing starts.</p>
    <pre v-pre><code>{
  "request_id": "&lt;certificate_request_id&gt;",
  "domain": "example.com",
  "user_id": "&lt;user_id&gt;",
  "event_id": "cert.requested",
  "listener_id": "&lt;listener_id&gt;"
}</code></pre>

    <h4><code>cert.issued</code></h4>
    <p>Dispatched after a certificate is issued and saved.</p>
    <pre v-pre><code>{
  "request_id": "&lt;certificate_request_id&gt;",
  "domain": "example.com",
  "user_id": "&lt;user_id&gt;",
  "certificate_id": "&lt;certificate_id&gt;",
  "event_id": "cert.issued",
  "listener_id": "&lt;listener_id&gt;"
}</code></pre>

    <h4><code>cert.failed</code></h4>
    <p>Dispatched when request processing fails.</p>
    <pre v-pre><code>{
  "request_id": "&lt;certificate_request_id&gt;",
  "domain": "example.com",
  "user_id": "&lt;user_id&gt;",
  "error": "&lt;error_message&gt;",
  "event_id": "cert.failed",
  "listener_id": "&lt;listener_id&gt;"
}</code></pre>

    <h4><code>cert.expired</code></h4>
    <p>Dispatched when renewal flow starts for an expiring certificate.</p>
    <pre v-pre><code>{
  "request_id": "&lt;certificate_id&gt;",
  "domain": "example.com",
  "user_id": "&lt;user_id&gt;",
  "event_id": "cert.expired",
  "listener_id": "&lt;listener_id&gt;"
}</code></pre>

    <h4><code>cert.uploaded</code></h4>
    <p>Dispatched when a certificate/key pair is manually uploaded.</p>
    <pre v-pre><code>{
  "domain": "example.com",
  "user_id": "&lt;user_id&gt;",
  "certificate_id": "&lt;certificate_id&gt;",
  "event_id": "cert.uploaded",
  "listener_id": "&lt;listener_id&gt;"
}</code></pre>

    <h3>Interaction Request Events</h3>
    <p>
      These events are dispatched by interaction request flows. They are not currently
      listed in the <code>/engine/events/ids</code> endpoint, but they are emitted by backend code.
    </p>

    <h4><code>interaction_request.created</code></h4>
    <p>Dispatched when an interaction request record is created.</p>
    <pre v-pre><code>{
  "request_id": "&lt;interaction_request_id&gt;",
  "type": "dns.change",
  "event_id": "interaction_request.created",
  "user_id": "&lt;user_id&gt;",
  "listener_id": "&lt;listener_id&gt;"
}</code></pre>

    <h4><code>interaction_request.timeout</code></h4>
    <p>Dispatched when waiting for interaction response exceeds timeout.</p>
    <pre v-pre><code>{
  "request_id": "&lt;interaction_request_id&gt;",
  "status": "new",
  "event_id": "interaction_request.timeout",
  "user_id": "&lt;user_id&gt;",
  "listener_id": "&lt;listener_id&gt;"
}</code></pre>

    <h3>Notes</h3>
    <ul>
      <li>Additional fields may appear depending on future backend changes.</li>
      <li>
        Payload macros can be accessed either as <code>&#123;&#123;payload.field&#125;&#125;</code> or,
        for top-level keys, as <code>&#123;&#123;field&#125;&#125;</code>.
      </li>
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
