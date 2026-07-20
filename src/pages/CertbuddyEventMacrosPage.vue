<template>
  <article class="documentation-page">
    <h2>Event Macros Reference</h2>
    <p>
      Event handlers support template macros in both <code>event_code</code> and
      <code>event_params</code>. Macro syntax is:
      <code>&#123;&#123;path.to.value&#125;&#125;</code>.
    </p>

    <h3>Context Objects</h3>
    <table>
      <thead>
        <tr>
          <th>Root</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>event_id</code></td>
          <td>Current event type string.</td>
          <td><code>&#123;&#123;event_id&#125;&#125;</code></td>
        </tr>
        <tr>
          <td><code>user_id</code></td>
          <td>Target user id passed to dispatch.</td>
          <td><code>&#123;&#123;user_id&#125;&#125;</code></td>
        </tr>
        <tr>
          <td><code>listener_id</code></td>
          <td>Current listener id.</td>
          <td><code>&#123;&#123;listener_id&#125;&#125;</code></td>
        </tr>
        <tr>
          <td><code>payload</code></td>
          <td>Full event payload object.</td>
          <td><code>&#123;&#123;payload.domain&#125;&#125;</code></td>
        </tr>
        <tr>
          <td><code>params</code></td>
          <td>Rendered event_params object.</td>
          <td><code>&#123;&#123;params.timeout_seconds&#125;&#125;</code></td>
        </tr>
        <tr>
          <td>Top-level payload keys</td>
          <td>
            Convenience aliases: payload keys are also available at root level when no conflict exists.
          </td>
          <td><code>&#123;&#123;domain&#125;&#125;</code> (same as <code>&#123;&#123;payload.domain&#125;&#125;</code>)</td>
        </tr>
      </tbody>
    </table>

    <h3>Resolution Rules</h3>
    <ul>
      <li>Dot notation is supported for nested values: <code>&#123;&#123;payload.meta.error_code&#125;&#125;</code>.</li>
      <li>List indexes are supported: <code>&#123;&#123;payload.items.0.name&#125;&#125;</code>.</li>
      <li>Missing values render as an empty string.</li>
      <li>Objects/lists render as JSON strings when used in string templates.</li>
    </ul>

    <h3>Where Macros Are Applied</h3>
    <ul>
      <li><code>shell_script</code>: rendered in script text and in <code>event_params</code> values.</li>
      <li><code>webhook</code>: rendered in URL, headers/query params, body template, and extra params.</li>
    </ul>

    <h3>Examples</h3>
    <h4>Shell Script</h4>
    <pre v-pre><code>event_code: "echo domain={{payload.domain}} cert={{payload.certificate_id}}"
event_params:
{
  "env": {
    "REQ_ID": "{{payload.request_id}}"
  }
}</code></pre>

    <h4>Webhook</h4>
    <pre v-pre><code>event_params:
{
  "url": "https://hooks.example.com/{{event_id}}",
  "headers": {
    "X-User": "{{user_id}}"
  }
}

event_code:
{
  "listener": "{{listener_id}}",
  "payload": {{payload}}
}</code></pre>

    <h3>Best Practices</h3>
    <ul>
      <li>Prefer explicit paths like <code>&#123;&#123;payload.domain&#125;&#125;</code> for readability.</li>
      <li>Keep webhook JSON templates valid after macro replacement.</li>
      <li>Avoid shell injection risks when interpolating untrusted values in scripts.</li>
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

.documentation-page table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.documentation-page th,
.documentation-page td {
  border: 1px solid #e2e8f0;
  padding: 0.625rem;
  text-align: left;
  vertical-align: top;
}

.documentation-page th {
  background: #f7fafc;
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
