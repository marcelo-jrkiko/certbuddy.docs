<template>
  <article class="documentation-page">
    <h2>Challenge Methods</h2>
    <p>
      Challenge methods are used for domain validation when requesting certificates.
      CertBuddy supports multiple challenge types for different deployment scenarios.
    </p>

    <h3>DNS-01 Challenge</h3>
    <p>
      DNS-01 is a DNS-based validation method where a TXT record is placed in your domain's
      DNS configuration to prove domain ownership. This is the most widely-used method for
      wildcard certificates and automated renewals.
    </p>

    <h4>How It Works</h4>
    <ol>
      <li>Certificate Authority generates a random token</li>
      <li>CertBuddy creates a TXT record in your DNS</li>
      <li>Certificate Authority verifies the TXT record</li>
      <li>Certificate is issued</li>
      <li>TXT record is automatically cleaned up</li>
    </ol>

    <h4>Advantages</h4>
    <ul>
      <li>Works for wildcard certificates</li>
      <li>Works for multiple domains (SAN)</li>
      <li>No need for reverse proxy or public web server</li>
      <li>Can validate from any location</li>
      <li>Ideal for automated renewals</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li>Requires DNS provider API access</li>
      <li>Slightly slower than HTTP-01</li>
      <li>Needs DNS credentials storage</li>
    </ul>

    <h3>DNS-01: Cloudflare Provider</h3>
    <p>
      Automatically manages DNS records for domains hosted on Cloudflare.
      CertBuddy handles all DNS operations through Cloudflare's API.
    </p>

    <h4>Features</h4>
    <ul>
      <li>Automatic zone discovery</li>
      <li>Automatic TXT record creation</li>
      <li>Automatic record cleanup</li>
      <li>Multi-domain support</li>
      <li>Fast validation</li>
    </ul>

    <h4>Configuration</h4>
    <ol>
      <li>Get Cloudflare API token (with Zone DNS edit permission)</li>
      <li>Add configuration in CertBuddy:
        <ul>
          <li>Select "Cloudflare DNS-01"</li>
          <li>Enter API token</li>
          <li>Save configuration</li>
        </ul>
      </li>
      <li>Use in certificate request</li>
    </ol>

    <h4>Requirements</h4>
    <ul>
      <li>Domain nameservers pointing to Cloudflare</li>
      <li>Active Cloudflare account</li>
      <li>Cloudflare API token</li>
    </ul>

    <h3>HTTP-01 Challenge</h3>
    <p>
      HTTP-01 validates domain ownership by serving a specific file over HTTP from the domain.
      The Certificate Authority fetches the file to verify validation.
    </p>

    <h4>How It Works</h4>
    <ol>
      <li>Certificate Authority generates a random token</li>
      <li>CertBuddy places a file at <code>/.well-known/acme-challenge/{token}</code></li>
      <li>Certificate Authority retrieves the file via HTTP</li>
      <li>Certificate is issued</li>
      <li>Challenge file is removed</li>
    </ol>

    <h4>Advantages</h4>
    <ul>
      <li>Simple setup</li>
      <li>Works without DNS access</li>
      <li>Fast validation</li>
      <li>Suit for development environments</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li>Cannot validate wildcard certificates</li>
      <li>Requires public web server access</li>
      <li>Requires HTTP port 80 open</li>
      <li>Cannot validate from behind reverse proxy easily</li>
    </ul>

    <h3>HTTP-01: Local File Provider</h3>
    <p>
      Creates challenge files on the local filesystem. Suitable for single-server setups
      with direct filesystem access.
    </p>

    <h4>Configuration</h4>
    <ol>
      <li>Create challenge directory:
        <pre><code>mkdir -p /var/www/certbuddy-challenges</code></pre>
      </li>
      <li>Configure in CertBuddy:
        <ul>
          <li>Select "Local File HTTP-01"</li>
          <li>Set base path: <code>/var/www/certbuddy-challenges</code></li>
          <li>Save configuration</li>
        </ul>
      </li>
      <li>Configure web server to serve from this directory:
        <pre><code>location /.well-known/acme-challenge/ {
  root /var/www/certbuddy-challenges;
}</code></pre>
      </li>
    </ol>

    <h4>Requirements</h4>
    <ul>
      <li>Filesystem access on the server</li>
      <li>Web server configured to serve challenge files</li>
      <li>HTTP port 80 accessible from the internet</li>
      <li>No firewall blocking acme-challenge requests</li>
    </ul>

    <h3>HTTP-01: SFTP File Provider</h3>
    <p>
      Creates challenge files via SFTP on a remote server. Suitable for multi-server
      or cloud deployments where direct filesystem access is not available.
    </p>

    <h4>Features</h4>
    <ul>
      <li>Remote server file creation</li>
      <li>SSH key-based authentication</li>
      <li>Automatic path variable substitution</li>
      <li>Secure private key handling</li>
      <li>Multi-server support</li>
    </ul>

    <h4>Configuration</h4>
    <ol>
      <li>Generate SSH key pair</li>
      <li>Add public key to remote server's authorized_keys</li>
      <li>Configure in CertBuddy:
        <ul>
          <li>Select "SFTP File HTTP-01"</li>
          <li>Set SFTP host: <code>sftp.example.com</code></li>
          <li>Set SFTP user: <code>certbuddy</code></li>
          <li>Set SFTP path: <code>/var/www/certbuddy-challenges</code></li>
          <li>Upload private key</li>
          <li>Save configuration</li>
        </ul>
      </li>
    </ol>

    <h4>Prerequisites</h4>
    <ul>
      <li>SSH/SFTP access to remote server</li>
      <li>SSH key pair for authentication</li>
      <li>Write permissions on remote path</li>
      <li>Secure private key permissions (600)</li>
    </ul>

    <h4>Path Variables</h4>
    <p>
      SFTP paths support variable substitution:
    </p>
    <ul>
      <li><code>{$domain}</code>: Domain name</li>
      <li><code>{$key}</code>: Challenge token</li>
      <li><code>{$now}</code>: Current timestamp</li>
    </ul>

    <h3>No Challenge</h3>
    <p>
      Some Certificate Authorities don't require validation. Challenge files are not needed.
    </p>

    <h4>Used By</h4>
    <ul>
      <li>Cloudflare Origin CA</li>
      <li>Other private/internal CAs</li>
    </ul>

    <h4>Configuration</h4>
    <p>
      Simply select "No Challenge" when requesting a certificate from a CA that supports it.
    </p>

    <h3>Choosing a Challenge Method</h3>
    <table class="challenge-table">
      <thead>
        <tr>
          <th>Scenario</th>
          <th>Recommended</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Wildcard Certificate</td>
          <td>DNS-01 (Cloudflare)</td>
          <td>Only option for wildcards</td>
        </tr>
        <tr>
          <td>Single Server, DNS Access</td>
          <td>DNS-01 (Cloudflare)</td>
          <td>Automated and reliable</td>
        </tr>
        <tr>
          <td>Multi-Server Setup</td>
          <td>SFTP HTTP-01</td>
          <td>Works across servers</td>
        </tr>
        <tr>
          <td>Simple Single Server</td>
          <td>Local File HTTP-01</td>
          <td>Easiest to set up</td>
        </tr>
        <tr>
          <td>Cloudflare Hosted Domain</td>
          <td>No Challenge</td>
          <td>Fastest option</td>
        </tr>
      </tbody>
    </table>

    <h3>Best Practices</h3>
    <ul>
      <li>Use DNS-01 for automated renewals</li>
      <li>Use Cloudflare DNS-01 if domains are on Cloudflare</li>
      <li>Store credentials securely in Directus</li>
      <li>Test challenge methods before production use</li>
      <li>Monitor challenge failures in logs</li>
      <li>Use SFTP over HTTP for remote servers</li>
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

.documentation-page table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.challenge-table {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.challenge-table thead {
  background: #667eea;
  color: white;
}

.challenge-table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
}

.challenge-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.challenge-table tbody tr:last-child td {
  border-bottom: none;
}

.documentation-page strong {
  color: #1a202c;
}
</style>
