<template>
  <article class="documentation-page">
    <h2>Configuration Guide</h2>
    <p>
      CertBuddy uses environment variables for configuration. All settings are defined in the
      <code>.env</code> file at the root of the project.
    </p>

    <h3>Environment File Setup</h3>
    <p>
      Create a <code>.env</code> file in the project root:
    </p>
    <pre><code>cp .env.sample .env
# Edit .env with your settings</code></pre>

    <h3>Directus Backend Configuration</h3>

    <h4>DIRECTUS_URL</h4>
    <ul>
      <li><strong>Type</strong>: String (URL)</li>
      <li><strong>Default</strong>: <code>http://localhost:8055</code></li>
      <li><strong>Description</strong>: URL of your Directus instance</li>
      <li><strong>Example</strong>: <code>https://directus.yourdomain.com</code></li>
    </ul>

    <h4>ENGINE_MASTER_TOKEN</h4>
    <ul>
      <li><strong>Type</strong>: String (secret token)</li>
      <li><strong>Default</strong>: None (required)</li>
      <li><strong>Description</strong>: Master authentication token for Directus API</li>
      <li><strong>Security</strong>: Keep this secure, never commit to git</li>
      <li><strong>Note</strong>: Must have permissions to manage collections and records</li>
    </ul>

    <h3>Engine API Configuration</h3>

    <h4>ENGINE_API_PORT</h4>
    <ul>
      <li><strong>Type</strong>: Integer</li>
      <li><strong>Default</strong>: <code>3000</code></li>
      <li><strong>Description</strong>: Port for Flask backend API server</li>
      <li><strong>Example</strong>: <code>3000, 8080, 5000</code></li>
    </ul>

    <h4>DEBUG</h4>
    <ul>
      <li><strong>Type</strong>: Boolean (<code>True</code> or <code>False</code>)</li>
      <li><strong>Default</strong>: <code>False</code></li>
      <li><strong>Description</strong>: Enable development mode with detailed logging</li>
      <li><strong>Warning</strong>: Never enable in production</li>
      <li><strong>Development</strong>: Set to <code>True</code> for debugging</li>
    </ul>

    <h3>Certificate Renewal Configuration</h3>

    <h4>ENGINE_RENEWAL_CHECK_INTERVAL</h4>
    <ul>
      <li><strong>Type</strong>: Integer (hours)</li>
      <li><strong>Default</strong>: <code>24</code></li>
      <li><strong>Description</strong>: How often the renewal task checks for expiring certificates</li>
      <li><strong>Example</strong>: <code>24, 12, 6</code></li>
      <li><strong>Note</strong>: Shorter intervals increase system load</li>
    </ul>

    <h4>ENGINE_RENEWAL_BEFORE_EXPIRE_HOURS</h4>
    <ul>
      <li><strong>Type</strong>: Integer (hours)</li>
      <li><strong>Default</strong>: <code>24</code></li>
      <li><strong>Description</strong>: Hours before expiration to trigger renewal</li>
      <li><strong>Example</strong>: <code>24 (1 day), 72 (3 days)</code></li>
      <li><strong>Recommendation</strong>: Minimum 24 hours</li>
    </ul>

    <h3>Certificate Auto Cleanup Configuration</h3>

    <h4>ENGINE_AUTO_CLEANUP_ENABLED</h4>
    <ul>
      <li><strong>Type</strong>: Boolean (<code>True</code> or <code>False</code>)</li>
      <li><strong>Default</strong>: <code>False</code></li>
      <li><strong>Description</strong>: Enable automatic cleanup of old requests</li>
    </ul>

    <h4>ENGINE_AUTO_CLEANUP_INTERVAL</h4>
    <ul>
      <li><strong>Type</strong>: Integer (hours)</li>
      <li><strong>Default</strong>: <code>4</code></li>
      <li><strong>Description</strong>: How often the cleanup task runs</li>
      <li><strong>Note</strong>: Only used if <code>ENGINE_AUTO_CLEANUP_ENABLED=True</code></li>
    </ul>

    <h4>ENGINE_AUTO_CLEANUP_BEFORE_EXPIRE_DAYS</h4>
    <ul>
      <li><strong>Type</strong>: Integer (days)</li>
      <li><strong>Default</strong>: <code>120</code></li>
      <li><strong>Description</strong>: Delete requests older than N days after expiration</li>
      <li><strong>Example</strong>: <code>120, 90, 180</code></li>
    </ul>

    <h3>Example .env File</h3>
    <pre><code># Directus Configuration
DIRECTUS_URL=https://directus.example.com
ENGINE_MASTER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Engine API Configuration
ENGINE_API_PORT=3000
DEBUG=False

# Certificate Renewal Configuration
ENGINE_RENEWAL_CHECK_INTERVAL=24
ENGINE_RENEWAL_BEFORE_EXPIRE_HOURS=24

# Certificate Auto Cleanup Configuration
ENGINE_AUTO_CLEANUP_ENABLED=True
ENGINE_AUTO_CLEANUP_INTERVAL=4
ENGINE_AUTO_CLEANUP_BEFORE_EXPIRE_DAYS=120</code></pre>

    <h3>Docker Deployment Configuration</h3>
    <p>
      When using Docker Compose, you can pass environment variables through multiple methods:
    </p>

    <h4>Method 1: Using .env File</h4>
    <p>
      Docker Compose automatically reads the <code>.env</code> file:
    </p>
    <pre><code>docker-compose -f docker-compose.dev.yml up</code></pre>

    <h4>Method 2: Direct Environment</h4>
    <pre><code>docker run -e DIRECTUS_URL=http://directus:8055 \
  -e ENGINE_MASTER_TOKEN=secret \
  certbuddy-backend</code></pre>

    <h4>Method 3: Compose File Override</h4>
    <pre><code>environment:
  - DIRECTUS_URL=http://directus:8055
  - ENGINE_MASTER_TOKEN=${ENGINE_MASTER_TOKEN}
  - ENGINE_API_PORT=3000</code></pre>

    <h3>Configuration Best Practices</h3>
    <ul>
      <li><strong>Version Control</strong>: Never commit <code>.env</code> file</li>
      <li><strong>Add to .gitignore</strong>:
        <pre><code>.env
.env.local
.env.*.local</code></pre>
      </li>
      <li><strong>Template File</strong>: Maintain <code>.env.sample</code> for documentation</li>
      <li><strong>Strong Tokens</strong>: Use cryptographically secure tokens</li>
      <li><strong>Rotation</strong>: Rotate tokens periodically</li>
      <li><strong>Logging</strong>: Check logs for configuration errors</li>
      <li><strong>Testing</strong>: Test configs before production deployment</li>
    </ul>

    <h3>Troubleshooting Configuration</h3>

    <h4>Connection to Directus Failed</h4>
    <pre><code>- Check DIRECTUS_URL is correct and reachable
- Verify ENGINE_MASTER_TOKEN has correct permissions
- Check Directus is running and accessible
- Review backend logs for network errors</code></pre>

    <h4>API Port Already in Use</h4>
    <pre><code>- Change ENGINE_API_PORT to an available port
- Kill process using the port
- Check for other instances of CertBuddy</code></pre>

    <h4>Renewal Tasks Not Running</h4>
    <pre><code>- Verify ENGINE_RENEWAL_CHECK_INTERVAL is set
- Check DEBUG logs for task initialization errors
- Ensure backend is running continuously</code></pre>

    <h3>Production Configuration</h3>
    <p>For production deployments:</p>
    <ul>
      <li>Set <code>DEBUG=False</code></li>
      <li>Use strong, unique tokens</li>
      <li>Set appropriate renewal intervals (24+ hours)</li>
      <li>Enable auto cleanup if desired</li>
      <li>Use secure Directus URL (HTTPS)</li>
      <li>Monitor and log all configuration changes</li>
      <li>Set up secrets management (not plaintext .env)</li>
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
  font-weight: 600;
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

.documentation-page code {
  font-family: 'Courier New', monospace;
  background: #f7fafc;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  color: #c53030;
}

.documentation-page pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.documentation-page pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.documentation-page strong {
  color: #1a202c;
}
</style>
