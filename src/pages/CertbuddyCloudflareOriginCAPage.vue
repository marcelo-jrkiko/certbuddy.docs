<template>
  <article class="documentation-page">
    <h2>Cloudflare Origin CA</h2>
    <p>
      Cloudflare's private CA for issuing certificates to be used specifically with origin servers
      behind the Cloudflare reverse proxy. Fast and easy certificate issuance without validation challenges.
    </p>

    <h3>Overview</h3>
    <ul>
      <li><strong>Type</strong>: Private Certificate Authority</li>
      <li><strong>Scope</strong>: Cloudflare-hosted domains only</li>
      <li><strong>Cost</strong>: Free (with Cloudflare account)</li>
      <li><strong>Issuance Speed</strong>: Instant (no validation required)</li>
      <li><strong>Trust</strong>: Only trusted by Cloudflare infrastructure</li>
    </ul>

    <h3>Features</h3>
    <ul>
      <li><strong>Instant Certificate Generation</strong>: No waiting for validation</li>
      <li><strong>No Domain Validation</strong>: Automatic issuance for Cloudflare zones</li>
      <li><strong>Wildcard Support</strong>: Issue wildcard certificates</li>
      <li><strong>Easy Management</strong>: Simple one-click setup</li>
      <li><strong>Integration</strong>: Seamlessly integrates with Cloudflare SSL/TLS</li>
      <li><strong>Auto-Renewal</strong>: Supported through CertBuddy scheduler</li>
    </ul>

    <h3>Use Cases</h3>
    <ul>
      <li><strong>Origin Server Protection</strong>: Encrypt traffic from Cloudflare to origin</li>
      <li><strong>API Endpoints</strong>: Secure internal APIs behind Cloudflare</li>
      <li><strong>Multi-Tier Architecture</strong>: Secure communication between services</li>
      <li><strong>Development/Staging</strong>: Quick certificate generation for testing</li>
      <li><strong>Subdomain Certificates</strong>: Wildcard certs for multiple subdomains</li>
    </ul>

    <h3>Comparison: Cloudflare vs Public CAs</h3>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Cloudflare Origin CA</th>
          <th>Public CA (Let's Encrypt)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Validation</strong></td>
          <td>None required</td>
          <td>ACME challenge required</td>
        </tr>
        <tr>
          <td><strong>Issuance Time</strong></td>
          <td>Instant</td>
          <td>Minutes (after validation)</td>
        </tr>
        <tr>
          <td><strong>Trust by</strong></td>
          <td>Cloudflare only</td>
          <td>All browsers/clients</td>
        </tr>
        <tr>
          <td><strong>Use Case</strong></td>
          <td>Origin encryption</td>
          <td>End-user facing</td>
        </tr>
        <tr>
          <td><strong>Setup</strong></td>
          <td>Easy (API token)</td>
          <td>Moderate (challenge setup)</td>
        </tr>
        <tr>
          <td><strong>Cost</strong></td>
          <td>Free</td>
          <td>Free</td>
        </tr>
      </tbody>
    </table>

    <h3>Setup & Configuration</h3>

    <h4>Prerequisites</h4>
    <ul>
      <li>Active Cloudflare account</li>
      <li>Domain nameservers pointing to Cloudflare</li>
      <li>Cloudflare API token with appropriate permissions</li>
    </ul>

    <h4>Getting API Token</h4>
    <ol>
      <li>Log in to Cloudflare dashboard</li>
      <li>Navigate to Profile → API Tokens</li>
      <li>Click "Create Token"</li>
      <li>Select "Edit zone DNS" template or create custom</li>
      <li>Grant permissions for:
        <ul>
          <li>Zone.SSL and Certificates: Edit</li>
          <li>Zone.Zone: Read</li>
        </ul>
      </li>
      <li>Set zone resources to specific domains or "All zones"</li>
      <li>Create and copy token</li>
    </ol>

    <h4>Configuring in CertBuddy</h4>
    <ol>
      <li>Go to Settings → Certificate Authorities</li>
      <li>Click "Add CA"</li>
      <li>Select "Cloudflare Origin CA"</li>
      <li>Paste API token</li>
      <li>Click "Test Configuration"</li>
      <li>Save</li>
    </ol>

    <h3>Requesting a Certificate</h3>

    <h4>Via CertBuddy Dashboard</h4>
    <ol>
      <li>Navigate to Certificates</li>
      <li>Click "Request Certificate"</li>
      <li>Enter domain (must be on Cloudflare)</li>
      <li>Select "Cloudflare Origin CA" as provider</li>
      <li>Select "Cloudflare Origin CA" as certificate type</li>
      <li>Choose certificate validity period</li>
      <li>Submit request</li>
      <li>Certificate appears in list instantly</li>
    </ol>

    <h3>Certificate Management</h3>

    <h4>Viewing Certificates</h4>
    <ul>
      <li>All issued certificates listed in dashboard</li>
      <li>Shows issuance date and expiration</li>
      <li>Display certificate details</li>
      <li>Download certificate and key</li>
    </ul>

    <h4>Certificate Renewal</h4>
    <p>
      CertBuddy automatically renews certificates before expiration:
    </p>
    <ul>
      <li>Renewal occurs 24 hours before expiration</li>
      <li>New certificate is issued instantly</li>
      <li>No manual intervention required</li>
      <li>Old certificate can be deactivated safely</li>
    </ul>

    <h4>Deactivating Certificates</h4>
    <ul>
      <li>Mark certificate as inactive in dashboard</li>
      <li>Certificate remains in Directus for history</li>
      <li>Can be reactivated if needed</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>API Tokens</strong>: Use specific tokens, not global API key</li>
      <li><strong>Permissions</strong>: Grant minimum required permissions</li>
      <li><strong>Rotation</strong>: Rotate API tokens periodically</li>
      <li><strong>Monitoring</strong>: Check certificate expiration dates</li>
      <li><strong>Automation</strong>: Enable automatic renewal in CertBuddy</li>
      <li><strong>Staging</strong>: Test certificate generation in staging first</li>
    </ul>

    <h3>Implementing Origin Certificates</h3>

    <h4>On Your Origin Server</h4>
    <ol>
      <li>Download certificate and private key from CertBuddy</li>
      <li>Upload to your web server</li>
      <li>Configure HTTPS:
        <ul>
          <li><strong>Nginx</strong>: Update ssl_certificate and ssl_certificate_key</li>
          <li><strong>Apache</strong>: Update SSLCertificateFile and SSLCertificateKeyFile</li>
          <li><strong>Other</strong>: Follow your server's SSL configuration</li>
        </ul>
      </li>
      <li>Reload web server</li>
      <li>Verify with: <code>curl -v https://yourdomain.com</code></li>
    </ol>

    <h4>Cloudflare Configuration</h4>
    <ol>
      <li>Go to Cloudflare dashboard</li>
      <li>Navigate to SSL/TLS → Origin Server</li>
      <li>Ensure Cloudflare certificate is installed</li>
      <li>Set SSL/TLS encryption mode to "Full (Strict)"</li>
      <li>Verify certificate is valid</li>
    </ol>

    <h3>Troubleshooting</h3>

    <h4>API Token Not Working</h4>
    <ul>
      <li>Verify API token is correct and not expired</li>
      <li>Check token has correct permissions</li>
      <li>Ensure token has access to the zone</li>
      <li>Try regenerating API token</li>
    </ul>

    <h4>Certificate Request Fails</h4>
    <ul>
      <li>Verify domain is on Cloudflare</li>
      <li>Check domain nameservers</li>
      <li>Ensure domain is not expired</li>
      <li>Verify API token permissions</li>
    </ul>

    <h4>Certificate Not Trusted</h4>
    <ul>
      <li>Cloudflare Origin CA certificates are ONLY for origin servers</li>
      <li>Use public CA (Let's Encrypt) for end-user facing certificates</li>
      <li>Ensure Cloudflare is proxying the domain</li>
      <li>Check browser security settings</li>
    </ul>

    <h3>Security Considerations</h3>
    <ul>
      <li>API tokens are sensitive - keep them secure</li>
      <li>Use environment variables, not hardcoded tokens</li>
      <li>Rotate tokens regularly</li>
      <li>Only grant necessary permissions to tokens</li>
      <li>Monitor certificate issuance logs</li>
      <li>Ensure origin server uses HTTPS (Full Strict mode)</li>
    </ul>

    <h3>Resources</h3>
    <ul>
      <li><a href="https://dash.cloudflare.com/" target="_blank">Cloudflare Dashboard</a></li>
      <li><a href="https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/" target="_blank">Origin CA Documentation</a></li>
      <li><a href="https://support.cloudflare.com/hc/en-us/articles/115000479507" target="_blank">Origin CA Setup Guide</a></li>
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

.documentation-page ul,
.documentation-page ol {
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

.documentation-page a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.documentation-page a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.comparison-table thead {
  background: #667eea;
  color: white;
}

.comparison-table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
}

.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.documentation-page strong {
  color: #1a202c;
}
</style>
