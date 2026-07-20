<template>
  <article class="documentation-page">
    <h2>Handler: Webhook</h2>
    <p>
      The <code>webhook</code> handler sends HTTP requests when events are dispatched.
      Request URL and behavior are configured through <code>event_params</code>.
    </p>

    <h3>Required Fields</h3>
    <ul>
      <li><code>handler</code>: must be <code>webhook</code>.</li>
      <li><code>event_id</code>: event type to bind to.</li>
      <li><code>event_params.url</code>: target URL (required).</li>
      <li><code>event_code</code>: request body template (optional, but recommended).</li>
    </ul>

    <h3>event_params Options</h3>
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>url</code></td>
          <td>string</td>
          <td>none</td>
          <td>Destination endpoint URL.</td>
        </tr>
        <tr>
          <td><code>method</code></td>
          <td>string</td>
          <td><code>POST</code></td>
          <td>HTTP method. Any valid method is accepted.</td>
        </tr>
        <tr>
          <td><code>headers</code></td>
          <td>object</td>
          <td><code>{}</code></td>
          <td>Request headers object.</td>
        </tr>
        <tr>
          <td><code>query</code></td>
          <td>object</td>
          <td><code>null</code></td>
          <td>Query-string params passed to the request.</td>
        </tr>
        <tr>
          <td><code>timeout_seconds</code></td>
          <td>number</td>
          <td><code>10</code></td>
          <td>HTTP request timeout.</td>
        </tr>
        <tr>
          <td><code>verify_ssl</code></td>
          <td>boolean</td>
          <td><code>true</code></td>
          <td>Enable TLS certificate verification.</td>
        </tr>
        <tr>
          <td><code>body_format</code></td>
          <td>string</td>
          <td><code>json</code></td>
          <td>
            When <code>json</code>, <code>event_code</code> must render valid JSON.
            Otherwise body is sent as plain text/binary data.
          </td>
        </tr>
      </tbody>
    </table>

    <h3>How It Works</h3>
    <ol>
      <li>Dispatcher builds and enriches payload context.</li>
      <li><code>event_params</code> values are rendered using macros.</li>
      <li><code>event_code</code> is rendered to produce the request body.</li>
      <li>
        If <code>body_format = json</code>, body is parsed as JSON and sent via
        the request JSON field.
      </li>
      <li>
        For non-JSON formats, rendered body is sent as raw request data.
      </li>
      <li>Any HTTP status code <code>&gt;= 400</code> marks handler execution as failed.</li>
    </ol>

    <h3>Macro Access In Requests</h3>
    <ul>
      <li>URL macros: <code>https://hooks.example.com/&#123;&#123;event_id&#125;&#125;</code></li>
      <li>Header macros: <code>{ "X-User": "&#123;&#123;user_id&#125;&#125;" }</code></li>
      <li>Body macros: <code>&#123;&#123;payload.domain&#125;&#125;</code>, <code>&#123;&#123;payload.error&#125;&#125;</code></li>
      <li>Param macros: <code>&#123;&#123;params.timeout_seconds&#125;&#125;</code></li>
    </ul>

    <h3>Example Listener</h3>
    <pre v-pre><code>{
  "name": "Notify issuance webhook",
  "event_id": "cert.issued",
  "handler": "webhook",
  "event_params": {
    "url": "https://hooks.example.com/cert-events",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "X-Event": "{{event_id}}"
    },
    "query": {
      "listener": "{{listener_id}}"
    },
    "timeout_seconds": 10,
    "verify_ssl": true,
    "body_format": "json"
  },
  "event_code": "{\n  \"event\": \"{{event_id}}\",\n  \"user\": \"{{user_id}}\",\n  \"domain\": \"{{payload.domain}}\",\n  \"certificate_id\": \"{{payload.certificate_id}}\"\n}"
}</code></pre>

    <h3>Validation Notes</h3>
    <ul>
      <li><code>event_params.url</code> is mandatory.</li>
      <li><code>event_params.headers</code> must be an object.</li>
      <li>
        With <code>body_format = json</code>, invalid JSON output in <code>event_code</code>
        triggers a validation error.
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
