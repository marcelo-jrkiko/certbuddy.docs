<template>
  <article class="documentation-page">
    <h2>Certificate Authorities</h2>
    <p>
      CertBuddy supports multiple Certificate Authorities (CAs) for issuing SSL/TLS certificates.
      Each CA has different features, validation methods, and configuration requirements.
    </p>

    <h3>Let's Encrypt</h3>
    <p>
      The most widely-used free Certificate Authority providing DV (Domain Validation) certificates.
      Perfect for securing websites and applications with industry-standard SSL/TLS certificates.
    </p>

    <h4>Features</h4>
    <ul>
      <li><strong>Certificate Types</strong>: Single domain and wildcard certificates</li>
      <li><strong>Multi-Domain</strong>: SAN (Subject Alternative Name) support for multiple domains</li>
      <li><strong>Validation</strong>: DNS-01 challenges (HTTP-01 in development)</li>
      <li><strong>Protocol</strong>: ACME (Automated Certificate Management Environment) v2</li>
      <li><strong>Issuance</strong>: Automated certificate generation</li>
      <li><strong>Renewal</strong>: Automatic renewal available</li>
      <li><strong>Cost</strong>: Free</li>
    </ul>

    <h4>Configuration</h4>
    <p>To use Let's Encrypt, you need to:</p>
    <ol>
      <li>Create a Let's Encrypt account (stored in Directus)</li>
      <li>Configure ACME credentials in CertBuddy</li>
      <li>Choose a challenge method (Cloudflare DNS-01 recommended)</li>
      <li>Request certificate through the dashboard</li>
    </ol>

    <h4>Prerequisites</h4>
    <ul>
      <li>Domain ownership or DNS access</li>
      <li>Valid email address for account notifications</li>
      <li>Challenge provider credentials (Cloudflare for DNS-01)</li>
    </ul>

    <h4>Rate Limits</h4>
    <ul>
      <li>50 certs per domain per week</li>
      <li>5 duplicate certs per week</li>
      <li>20 account creation attempts per IP per 3 hours</li>
    </ul>

    <h3>Cloudflare Origin CA</h3>
    <p>
      Cloudflare's private CA for issuing certificates specifically for origin servers
      behind Cloudflare's reverse proxy. Fast and easy certificate issuance.
    </p>

    <h4>Features</h4>
    <ul>
      <li><strong>Certificate Types</strong>: Domain and wildcard certificates</li>
      <li><strong>Validation</strong>: No challenge required (direct issuance)</li>
      <li><strong>Scope</strong>: Only works with domains on Cloudflare</li>
      <li><strong>Issuance Speed</strong>: Instant certificate generation</li>
      <li><strong>Cost</strong>: Free (with Cloudflare account)</li>
      <li><strong>Security</strong>: Private CA, certificates only valid with Cloudflare</li>
    </ul>

    <h4>Configuration</h4>
    <p>To use Cloudflare Origin CA:</p>
    <ol>
      <li>Create a Cloudflare API token with appropriate permissions</li>
      <li>Configure the token in CertBuddy</li>
      <li>Select "Cloudflare Origin CA" as the CA</li>
      <li>Select "No Challenge" as the validation method</li>
      <li>Request certificate for a Cloudflare-hosted domain</li>
    </ol>

    <h4>Prerequisites</h4>
    <ul>
      <li>Active Cloudflare account</li>
      <li>Domain nameservers pointing to Cloudflare</li>
      <li>API token with Zone.SSL and Certificates permission</li>
    </ul>

    <h4>Benefits</h4>
    <ul>
      <li>No DNS validation required</li>
      <li>Instant certificate issuance</li>
      <li>Seamless integration with Cloudflare SSL/TLS</li>
      <li>Easy renewal and management</li>
    </ul>

    <h3>Comparing Certificate Authorities</h3>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Let's Encrypt</th>
          <th>Cloudflare Origin CA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cost</strong></td>
          <td>Free</td>
          <td>Free</td>
        </tr>
        <tr>
          <td><strong>Validation Required</strong></td>
          <td>Yes (DNS-01 or HTTP-01)</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>Certificate Validity</strong></td>
          <td>Publicly trusted (90 days)</td>
          <td>Cloudflare only (private CA)</td>
        </tr>
        <tr>
          <td><strong>Wildcard Support</strong></td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td><strong>SAN Support</strong></td>
          <td>Yes</td>
          <td>Limited</td>
        </tr>
        <tr>
          <td><strong>Setup Complexity</strong></td>
          <td>Moderate (needs challenge setup)</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td><strong>Best Use Case</strong></td>
          <td>Public websites, general use</td>
          <td>Origin servers with Cloudflare</td>
        </tr>
      </tbody>
    </table>

    <h3>Adding CA Credentials</h3>
    <p>
      To use a Certificate Authority:
    </p>
    <ol>
      <li>Navigate to Settings → Certificate Authorities in the dashboard</li>
      <li>Click "Add Provider"</li>
      <li>Select the Certificate Authority</li>
      <li>Enter the required credentials:
        <ul>
          <li><strong>Let's Encrypt</strong>: ACME account credentials</li>
          <li><strong>Cloudflare</strong>: API token</li>
        </ul>
      </li>
      <li>Save configuration</li>
      <li>Test the connection</li>
    </ol>

    <h3>Managing Multiple CA Accounts</h3>
    <p>
      CertBuddy supports managing multiple accounts for each Certificate Authority.
      This allows you to:
    </p>
    <ul>
      <li>Distribute certificate requests across accounts</li>
      <li>Manage rate limits more effectively</li>
      <li>Organize certificates by business unit or domain</li>
      <li>Maintain separation of concerns for security</li>
    </ul>

    <h3>Future CA Support</h3>
    <p>
      CertBuddy's modular architecture supports easy addition of new Certificate Authorities.
      Planned additions include:
    </p>
    <ul>
      <li>DigiCert</li>
      <li>GlobalSign</li>
      <li>Comodo/Sectigo</li>
      <li>Custom ACME providers</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li>Use Let's Encrypt for public-facing websites</li>
      <li>Use Cloudflare Origin CA for Cloudflare-hosted domains</li>
      <li>Maintain multiple accounts for redundancy</li>
      <li>Monitor CA rate limits and usage</li>
      <li>Keep API credentials secure and rotated</li>
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

.documentation-page table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.comparison-table {
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
