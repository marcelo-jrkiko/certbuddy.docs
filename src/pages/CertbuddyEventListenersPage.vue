<template>
  <article class="documentation-page">
    <h2>Event Listeners</h2>
    <p>
      Event listeners let you react to backend events by executing handlers when an
      event is dispatched. Certbuddy currently supports two handler types:
      <code>shell_script</code> and <code>webhook</code>.
    </p>

    <h3>How Dispatch Works</h3>
    <ol>
      <li>Backend code calls <code>EventDispatcher.dispatch(event_id, user_id, payload)</code>.</li>
      <li>The dispatcher loads listeners from <code>event_listener</code> storage.</li>
      <li>
        Listeners are filtered by:
        <ul>
          <li><code>listener.event_id == event_id</code></li>
          <li><code>listener.event_user == user_id</code> or <code>listener.is_global == true</code></li>
        </ul>
      </li>
      <li>
        The dispatcher enriches payload data with:
        <ul>
          <li><code>event_id</code></li>
          <li><code>user_id</code></li>
          <li><code>listener_id</code></li>
        </ul>
      </li>
      <li>
        The matching handler executes with rendered macros from <code>event_code</code> and
        <code>event_params</code>.
      </li>
    </ol>

    <h3>Supported Handler Types</h3>
    <ul>
      <li><code>shell_script</code>: executes a local command/script via an executable (default: <code>/bin/bash</code>).</li>
      <li><code>webhook</code>: performs an outbound HTTP request.</li>
    </ul>

    <h3>Where To Find The Detailed Docs</h3>
    <p>Use the new pages in the side menu:</p>
    <ul>
      <li><strong>Handler: Shell Script</strong>: parameters, defaults, runtime behavior and examples.</li>
      <li><strong>Handler: Webhook</strong>: HTTP options, body formats, SSL behavior and examples.</li>
      <li><strong>Macros Reference</strong>: all macro variables and template rendering rules.</li>
      <li><strong>Event Types &amp; Payloads</strong>: each event type and its default payload fields.</li>
    </ul>

    <h3>Important Behavior</h3>
    <h4>Failure Isolation</h4>
    <p>
      If one listener fails, dispatching continues for other listeners. Errors are logged,
      but they do not stop the event loop.
    </p>

    <h4>Payload Layering</h4>
    <p>
      Event payloads are composed from:
    </p>
    <ul>
      <li>Base dispatch payload from the caller.</li>
      <li>Automatically added fields from dispatcher (<code>event_id</code>, <code>user_id</code>, <code>listener_id</code>).</li>
      <li>Optional rendered fields from <code>event_params</code> exposed as <code>params.*</code>.</li>
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
