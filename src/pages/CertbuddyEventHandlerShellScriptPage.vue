<template>
  <article class="documentation-page">
    <h2>Handler: Shell Script</h2>
    <p>
      The <code>shell_script</code> handler executes a script command from
      <code>event_code</code> using an executable (default <code>/bin/bash</code>).
    </p>

    <h3>Required Fields</h3>
    <ul>
      <li><code>handler</code>: must be <code>shell_script</code>.</li>
      <li><code>event_id</code>: the event type to bind to.</li>
      <li><code>event_code</code>: script content to execute.</li>
    </ul>

    <h3>event_params Options</h3>
    <p>
      <code>event_params</code> can be a JSON object (or JSON string that parses into an object).
    </p>
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
          <td><code>executable</code></td>
          <td>string</td>
          <td><code>/bin/bash</code></td>
          <td>Command used to run <code>-c &lt;script&gt;</code>.</td>
        </tr>
        <tr>
          <td><code>cwd</code></td>
          <td>string</td>
          <td>current process dir</td>
          <td>Working directory for command execution.</td>
        </tr>
        <tr>
          <td><code>timeout_seconds</code></td>
          <td>number</td>
          <td><code>60</code></td>
          <td>Maximum execution time before timeout.</td>
        </tr>
        <tr>
          <td><code>env</code></td>
          <td>object</td>
          <td><code>{}</code></td>
          <td>Extra environment variables merged with process env.</td>
        </tr>
      </tbody>
    </table>

    <h3>How It Works</h3>
    <ol>
      <li>Dispatcher resolves the listener and builds a context.</li>
      <li><code>event_params</code> is parsed and rendered with macros.</li>
      <li><code>event_code</code> is rendered with macros and trimmed.</li>
      <li>The handler runs <code>[executable, "-c", script]</code>.</li>
      <li>If exit code is non-zero, the handler throws an execution error.</li>
    </ol>

    <h3>Macro Access In Scripts</h3>
    <p>Commonly used macros in script templates:</p>
    <ul>
      <li><code>&#123;&#123;event_id&#125;&#125;</code></li>
      <li><code>&#123;&#123;user_id&#125;&#125;</code></li>
      <li><code>&#123;&#123;listener_id&#125;&#125;</code></li>
      <li><code>&#123;&#123;payload.domain&#125;&#125;</code></li>
      <li><code>&#123;&#123;payload.request_id&#125;&#125;</code></li>
      <li><code>&#123;&#123;params.timeout_seconds&#125;&#125;</code></li>
    </ul>

    <h3>Example Listener</h3>
    <pre v-pre><code>{
  "name": "Log issued certificates",
  "event_id": "cert.issued",
  "handler": "shell_script",
  "event_params": {
    "timeout_seconds": 30,
    "cwd": "/tmp",
    "env": {
      "DOMAIN": "{{payload.domain}}",
      "CERT_ID": "{{payload.certificate_id}}"
    }
  },
  "event_code": "echo \"[{{event_id}}] domain={{payload.domain}} cert={{payload.certificate_id}}\""
}</code></pre>

    <h3>Validation Notes</h3>
    <ul>
      <li>An empty <code>event_code</code> is rejected.</li>
      <li>If <code>event_params</code> is a string, it must be valid JSON object text.</li>
      <li>Use macros carefully to avoid generating invalid shell syntax.</li>
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
