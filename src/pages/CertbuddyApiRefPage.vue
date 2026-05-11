<template>
  <article class="documentation-page">
    <h2>API Reference</h2>
    <p>
      CertBuddy provides a comprehensive REST API for all certificate management operations.
      All endpoints require Bearer token authentication.
    </p>

    <h3>Base URL</h3>
    <pre><code>http://localhost:3000</code></pre>

    <h3>Authentication</h3>
    <p>
      All API requests require a Bearer token in the Authorization header:
    </p>
    <pre><code>Authorization: Bearer YOUR_TOKEN</code></pre>

    <h3>Health Check</h3>
    <pre><code>GET /health</code></pre>
    <p><strong>Description</strong>: Verify the API is running</p>
    <p><strong>Response</strong>:</p>
    <pre><code>{
  "status": "healthy",
  "message": "CertBuddy API is running"
}</code></pre>

    <h3>Certificate Endpoints</h3>

    <h4>Get Certificates</h4>
    <pre><code>GET /certificates</code></pre>
    <p><strong>Description</strong>: Get list of certificates for authenticated user</p>
    <p><strong>Headers</strong>: Authorization</p>
    <p><strong>Response</strong>: Array of certificate objects</p>

    <h4>Match Certificate by Domain</h4>
    <pre><code>GET /certificates/match/:domain</code></pre>
    <p><strong>Description</strong>: Search for active certificates matching a domain</p>
    <p><strong>Parameters</strong>:</p>
    <ul>
      <li><code>domain</code> (path): Domain name to search for</li>
    </ul>
    <p><strong>Response</strong>: Array of matching certificates</p>

    <h4>Download Certificate</h4>
    <pre><code>GET /certificates/:certificate_id/download</code></pre>
    <p><strong>Description</strong>: Download certificate and key files as ZIP</p>
    <p><strong>Parameters</strong>:</p>
    <ul>
      <li><code>certificate_id</code> (path): ID of certificate to download</li>
    </ul>
    <p><strong>Response</strong>: ZIP file containing certificate and key</p>

    <h3>Engine Endpoints</h3>

    <h4>Get Event Types</h4>
    <pre><code>GET /engine/events/ids</code></pre>
    <p><strong>Description</strong>: Get available system events</p>
    <p><strong>Response</strong>:</p>
    <pre><code>{
  "cert.uploaded": "When a certificate is uploaded...",
  "cert.expired": "When a certificate is marked as expired...",
  "cert.failed": "When a certificate request fails...",
  "cert.issued": "When a certificate is successfully issued...",
  "cert.requested": "When a certificate request is created..."
}</code></pre>

    <h4>Request Certificate</h4>
    <pre><code>POST /engine/request_certificate</code></pre>
    <p><strong>Description</strong>: Submit a new certificate request</p>
    <p><strong>Request Body</strong>:</p>
    <pre><code>{
  "domain": "example.com",
  "challenge_type": "dns-cloudflare",
  "certificate_authority": "lets-encrypt",
  "config": {
    "key": "value"
  }
}</code></pre>
    <p><strong>Response</strong>:</p>
    <pre><code>{
  "thread_id": "request-123",
  "status": "processing",
  "request_id": "cert-req-456"
}</code></pre>

    <h4>Get Request Status</h4>
    <pre><code>GET /engine/request_status/:thread_id</code></pre>
    <p><strong>Description</strong>: Get status of a certificate request</p>
    <p><strong>Parameters</strong>:</p>
    <ul>
      <li><code>thread_id</code> (path): ID of the request thread</li>
    </ul>
    <p><strong>Response</strong>:</p>
    <pre><code>{
  "status": "completed | processing | failed",
  "request_details": {
    "id": "cert-req-456",
    "domain": "example.com",
    "created_at": "2024-01-15T10:30:00Z",
    "expires_at": "2025-01-15T10:30:00Z"
  }
}</code></pre>

    <h3>Tasks Endpoints</h3>

    <h4>Get Available Tasks</h4>
    <pre><code>GET /tasks</code></pre>
    <p><strong>Description</strong>: Get list of available scheduled tasks</p>
    <p><strong>Response</strong>: Array of task objects with status and schedule info</p>

    <h4>Get Task Status</h4>
    <pre><code>GET /tasks/:task_id</code></pre>
    <p><strong>Description</strong>: Get status of a specific task</p>
    <p><strong>Parameters</strong>:</p>
    <ul>
      <li><code>task_id</code> (path): ID of the task</li>
    </ul>

    <h3>Response Status Codes</h3>
    <ul>
      <li><strong>200</strong>: Successful request</li>
      <li><strong>400</strong>: Bad request (invalid parameters)</li>
      <li><strong>401</strong>: Unauthorized (missing or invalid token)</li>
      <li><strong>404</strong>: Resource not found</li>
      <li><strong>500</strong>: Internal server error</li>
    </ul>

    <h3>Error Response Format</h3>
    <pre><code>{
  "error": "Error message describing what went wrong"
}</code></pre>

    <h3>Rate Limiting</h3>
    <p>
      Currently, CertBuddy does not implement rate limiting. For production deployments,
      consider implementing rate limiting at the reverse proxy level.
    </p>

    <h3>API Documentation</h3>
    <p>
      Interactive API documentation is available at:
    </p>
    <pre><code>http://localhost:3000/apidocs</code></pre>
    <p>This provides a Swagger UI for testing endpoints directly.</p>

    <h3>Common Use Cases</h3>

    <h4>Request a Certificate</h4>
    <pre><code>1. POST /engine/request_certificate
   - domain: "example.com"
   - challenge_type: "dns-cloudflare"
   - certificate_authority: "lets-encrypt"

2. GET /engine/request_status/:thread_id
   - Check status until completed

3. GET /certificates/match/example.com
   - Retrieve issued certificate details</code></pre>

    <h4>Download Certificate</h4>
    <pre><code>1. GET /certificates
   - Find desired certificate by domain

2. GET /certificates/:certificate_id/download
   - Download certificate and key files</code></pre>
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

.documentation-page strong {
  color: #1a202c;
}
</style>
