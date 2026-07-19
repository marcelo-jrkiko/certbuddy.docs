<template>
  <article class="documentation-page">
    <h2>Challenge Methods Overview</h2>
    <p>
      Challenge methods are used for domain validation when requesting certificates from
      Certificate Authorities. CertBuddy supports multiple challenge types for different deployment scenarios.
    </p>

    <h3>Supported Challenge Methods</h3>
    <div class="challenge-cards">
      <div class="challenge-card">
        <h4>DNS-01 (Cloudflare)</h4>
        <p>DNS-based validation through Cloudflare API</p>
        <ul>
          <li>✓ Wildcard certificates</li>
          <li>✓ Multiple domains</li>
          <li>✓ Automated renewal</li>
          <li>✓ Works from anywhere</li>
        </ul>
        <p><a href="#dns-cloudflare">View Details →</a></p>
      </div>

      <div class="challenge-card">
        <h4>DNS-01 (Manual)</h4>
        <p>Manual DNS TXT validation with user approval</p>
        <ul>
          <li>✓ Works with any DNS provider</li>
          <li>✓ No DNS API token required</li>
          <li>✓ Uses interaction requests</li>
          <li>✗ Not automatic renewal friendly</li>
        </ul>
        <p><a href="#dns-manual">View Details →</a></p>
      </div>
      
      <div class="challenge-card">
        <h4>HTTP-01 (Local File)</h4>
        <p>HTTP validation using local filesystem</p>
        <ul>
          <li>✓ Simple setup</li>
          <li>✓ Single server</li>
          <li>✓ Direct filesystem access</li>
          <li>✓ Fast validation</li>
        </ul>
        <p><a href="#http-local">View Details →</a></p>
      </div>
      
      <div class="challenge-card">
        <h4>HTTP-01 (SFTP)</h4>
        <p>HTTP validation using remote SFTP server</p>
        <ul>
          <li>✓ Multi-server setup</li>
          <li>✓ Cloud deployments</li>
          <li>✓ SSH key auth</li>
          <li>✓ Remote validation</li>
        </ul>
        <p><a href="#http-sftp">View Details →</a></p>
      </div>

      <div class="challenge-card">
        <h4>No Challenge</h4>
        <p>No validation required (Private CAs)</p>
        <ul>
          <li>✓ Instant issuance</li>
          <li>✓ Cloudflare Origin CA</li>
          <li>✓ Private CAs</li>
          <li>✓ No setup</li>
        </ul>
        <p><a href="#no-challenge">View Details →</a></p>
      </div>
    </div>

    <h3>Quick Selection Guide</h3>
    <table class="selection-table">
      <thead>
        <tr>
          <th>Your Setup</th>
          <th>Recommended</th>
          <th>Why</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Need wildcard certificate</td>
          <td>DNS-01 (Cloudflare)</td>
          <td>Only option for wildcards</td>
        </tr>
        <tr>
          <td>Single server, DNS access</td>
          <td>DNS-01 (Cloudflare)</td>
          <td>Automated and reliable</td>
        </tr>
        <tr>
          <td>No DNS API available</td>
          <td>DNS-01 (Manual)</td>
          <td>Works with manual operator approval</td>
        </tr>
        <tr>
          <td>Multi-server setup</td>
          <td>HTTP-01 (SFTP)</td>
          <td>Works across servers</td>
        </tr>
        <tr>
          <td>Simple single server</td>
          <td>HTTP-01 (Local File)</td>
          <td>Easiest to set up</td>
        </tr>
        <tr>
          <td>Cloudflare hosted domain</td>
          <td>No Challenge</td>
          <td>Fastest, instant issuance</td>
        </tr>
      </tbody>
    </table>

    <h3 id="dns-manual">Manual DNS Challenge Notes</h3>
    <p>
      The <code>MANUAL_DNS</code> challenge creates an interaction request with DNS record data
      (record name, token and record type). Issuance continues only after the request is answered.
    </p>
    <ul>
      <li><strong>Request Type</strong>: <code>dns_change</code></li>
      <li><strong>Default Timeout</strong>: 86400 seconds</li>
      <li><strong>Poll Interval</strong>: 30 seconds</li>
      <li><strong>Renewal</strong>: Not marked with <code>can-renew</code></li>
    </ul>

    <h3>Challenge Method Comparison</h3>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>DNS-01</th>
          <th>HTTP-01 (Local)</th>
          <th>HTTP-01 (SFTP)</th>
          <th>No Challenge</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Wildcard Support</strong></td>
          <td>✓</td>
          <td>✗</td>
          <td>✗</td>
          <td>✓*</td>
        </tr>
        <tr>
          <td><strong>Multi-Domain</strong></td>
          <td>✓</td>
          <td>✓</td>
          <td>✓</td>
          <td>Limited</td>
        </tr>
        <tr>
          <td><strong>Speed</strong></td>
          <td>Moderate</td>
          <td>Fast</td>
          <td>Moderate</td>
          <td>Instant</td>
        </tr>
        <tr>
          <td><strong>Setup Complexity</strong></td>
          <td>Moderate</td>
          <td>Easy</td>
          <td>Complex</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td><strong>Maintenance</strong></td>
          <td>Low</td>
          <td>Low</td>
          <td>Moderate</td>
          <td>None</td>
        </tr>
        <tr>
          <td><strong>Location</strong></td>
          <td>Anywhere</td>
          <td>Local only</td>
          <td>Anywhere</td>
          <td>N/A</td>
        </tr>
        <tr>
          <td><strong>Public HTTP 80</strong></td>
          <td>✗</td>
          <td>Required</td>
          <td>Required</td>
          <td>✗</td>
        </tr>
        <tr>
          <td><strong>API Credentials</strong></td>
          <td>Required</td>
          <td>None</td>
          <td>SSH key</td>
          <td>Varies</td>
        </tr>
      </tbody>
    </table>

    <h3>How Challenges Work</h3>
    <p>
      The general flow for any challenge type:
    </p>
    <pre class="flow"><code>1. You request a certificate
2. CA asks: "Prove you own this domain"
3. CertBuddy performs the challenge:
   - Places validation token (DNS or HTTP)
   - Notifies CA
4. CA verifies the token
5. CA issues certificate
6. CertBuddy cleans up the validation token</code></pre>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Production</strong>: Use DNS-01 for reliability and automation</li>
      <li><strong>Development</strong>: Use HTTP-01 (Local File) for simplicity</li>
      <li><strong>Multi-Server</strong>: Use SFTP or HTTP-01 through load balancer</li>
      <li><strong>Testing</strong>: Test challenge method before production</li>
      <li><strong>Monitoring</strong>: Monitor renewal task logs for failures</li>
      <li><strong>Documentation</strong>: Keep credentials in secure storage</li>
    </ul>

    <h3>Troubleshooting</h3>
    <ul>
      <li><strong>Validation fails</strong>: Check challenge setup in configuration</li>
      <li><strong>DNS not updating</strong>: Verify DNS API credentials and permissions</li>
      <li><strong>HTTP fails</strong>: Ensure port 80 is accessible, web server configured correctly</li>
      <li><strong>SFTP connection fails</strong>: Check SSH credentials, key permissions, firewall</li>
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
  margin: 0.75rem 0 0.5rem 0;
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

.documentation-page a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.documentation-page a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.challenge-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.challenge-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.challenge-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.challenge-card h4 {
  margin-top: 0;
  color: #667eea;
}

.challenge-card ul {
  font-size: 0.9375rem;
  margin: 1rem 0;
}

.selection-table,
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
}

.selection-table thead,
.comparison-table thead {
  background: #667eea;
  color: white;
}

.selection-table th,
.comparison-table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
}

.selection-table td,
.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.selection-table tbody tr:last-child td,
.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.flow {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.flow code {
  background: none;
  color: inherit;
  padding: 0;
  font-size: 0.9375rem;
}

.documentation-page strong {
  color: #1a202c;
}

@media (max-width: 768px) {
  .challenge-cards {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 0.8125rem;
  }
}
</style>
