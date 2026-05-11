<template>
  <article class="documentation-page">
    <h2>Let's Encrypt</h2>
    <p>
      Let's Encrypt is the most widely-used free Certificate Authority providing Domain Validation (DV) 
      certificates. Perfect for securing websites and applications with industry-standard SSL/TLS certificates.
    </p>

    <h3>Overview</h3>
    <ul>
      <li><strong>Type</strong>: Free, publicly-trusted CA</li>
      <li><strong>Founded</strong>: 2014</li>
      <li><strong>Protocol</strong>: ACME (Automated Certificate Management Environment) v2</li>
      <li><strong>Certificates Issued</strong>: Over 4 billion</li>
      <li><strong>Validation</strong>: Domain ownership verification required</li>
    </ul>

    <h3>Certificate Types</h3>
    <ul>
      <li><strong>Single Domain</strong>: Certificates for a single domain (e.g., example.com)</li>
      <li><strong>Wildcard</strong>: Certificates for domain and all subdomains (*.example.com)</li>
      <li><strong>Multi-Domain (SAN)</strong>: Certificates for multiple different domains</li>
    </ul>

    <h3>Features</h3>
    <ul>
      <li><strong>Automation</strong>: Fully automated certificate issuance via ACME</li>
      <li><strong>Free</strong>: No cost for certificates</li>
      <li><strong>Wildcard Support</strong>: Issue wildcard certificates</li>
      <li><strong>Multi-Domain</strong>: Subject Alternative Names (SAN) support</li>
      <li><strong>Renewal</strong>: Automatic renewal supported</li>
      <li><strong>Validity Period</strong>: 90 days (encourages automation)</li>
    </ul>

    <h3>Validation Methods</h3>
    <p>
      Let's Encrypt supports multiple domain validation methods (challenges). Choose based on your setup:
    </p>
    <ul>
      <li><strong>DNS-01</strong>: Recommended for automation and wildcard certificates</li>
      <li><strong>HTTP-01</strong>: Suitable for simple setups with direct HTTP access</li>
    </ul>

    <h3>Configuration</h3>
    <p>To use Let's Encrypt in CertBuddy:</p>
    <ol>
      <li>Go to Settings → Certificate Authorities</li>
      <li>Click "Add CA"</li>
      <li>Select "Let's Encrypt"</li>
      <li>Enter ACME credentials:
        <ul>
          <li>Email address for account notifications</li>
          <li>Agree to Let's Encrypt terms</li>
        </ul>
      </li>
      <li>Select a challenge method</li>
      <li>Save and test configuration</li>
    </ol>

    <h3>Rate Limits</h3>
    <p>
      Let's Encrypt enforces rate limits to protect their infrastructure:
    </p>
    <ul>
      <li><strong>50 certificates per domain per week</strong></li>
      <li><strong>5 duplicate certificates per week</strong></li>
      <li><strong>20 account creation attempts per IP per 3 hours</strong></li>
      <li><strong>25 instantiation requests per account per 3 hours</strong></li>
      <li><strong>5 failed authorizations per account per hour</strong></li>
    </ul>

    <h3>Prerequisites</h3>
    <ul>
      <li>Domain ownership or DNS access</li>
      <li>Valid email address for account notifications</li>
      <li>Challenge provider credentials (Cloudflare for DNS-01)</li>
      <li>HTTP port 80 open (for HTTP-01) or DNS API access (for DNS-01)</li>
    </ul>

    <h3>Use Cases</h3>
    <ul>
      <li><strong>Public Websites</strong>: HTTPS for web applications</li>
      <li><strong>APIs</strong>: Secure API endpoints</li>
      <li><strong>Email Services</strong>: Certificates for mail servers</li>
      <li><strong>IoT Devices</strong>: Lightweight certificate management</li>
      <li><strong>Microservices</strong>: Inter-service HTTPS communication</li>
    </ul>

    <h3>Managing Multiple Accounts</h3>
    <p>
      CertBuddy supports multiple Let's Encrypt accounts for:
    </p>
    <ul>
      <li>Distributing rate limits across accounts</li>
      <li>Organizing certificates by business unit</li>
      <li>Maintaining separate credentials per environment</li>
      <li>Redundancy and failover scenarios</li>
    </ul>

    <h3>Renewal Strategy</h3>
    <p>
      Let's Encrypt certificates expire after 90 days. Best practices:
    </p>
    <ul>
      <li>Enable CertBuddy automatic renewal (default: 24h before expiration)</li>
      <li>Set renewal check interval to 24h or less</li>
      <li>Monitor renewal task logs</li>
      <li>Test renewal process before production</li>
      <li>Set up alerts for renewal failures</li>
    </ul>

    <h3>Security Considerations</h3>
    <ul>
      <li>ACME account credentials give access to your domains</li>
      <li>Store credentials securely in Directus</li>
      <li>Use DNS-01 for private key protection</li>
      <li>Rotate credentials periodically</li>
      <li>Monitor certificate issuance logs</li>
    </ul>

    <h3>Troubleshooting</h3>

    <h4>Certificate Request Fails</h4>
    <ul>
      <li>Verify domain is publicly resolvable</li>
      <li>Check challenge method configuration</li>
      <li>Ensure DNS records are correct (for DNS-01)</li>
      <li>Verify HTTP port 80 is reachable (for HTTP-01)</li>
      <li>Check rate limit hasn't been exceeded</li>
    </ul>

    <h4>Renewal Not Working</h4>
    <ul>
      <li>Verify automatic renewal is enabled</li>
      <li>Check renewal task logs</li>
      <li>Ensure scheduler is running</li>
      <li>Verify challenge provider credentials are valid</li>
      <li>Check DNS records (for DNS-01)</li>
    </ul>

    <h3>Resources</h3>
    <ul>
      <li><a href="https://letsencrypt.org" target="_blank">Let's Encrypt official site</a></li>
      <li><a href="https://letsencrypt.org/docs/" target="_blank">Let's Encrypt documentation</a></li>
      <li><a href="https://tools.ietf.org/html/rfc8555" target="_blank">ACME RFC 8555</a></li>
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

.documentation-page ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
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

.documentation-page strong {
  color: #1a202c;
}
</style>
