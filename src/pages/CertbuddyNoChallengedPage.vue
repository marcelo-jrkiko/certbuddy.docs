<template>
  <article class="documentation-page">
    <h2>No Challenge</h2>
    <p>
      "No Challenge" is a special configuration used by Certificate Authorities that don't require domain
      validation, such as Cloudflare Origin CA. With this method, no validation files or DNS records are
      needed—CertBuddy directly issues certificates without domain proof.
    </p>

    <h3>How It Works</h3>
    <ol>
      <li>You request a certificate for example.com</li>
      <li>You select "No Challenge" as the validation method</li>
      <li>No validation is required from the Certificate Authority</li>
      <li>Certificate Authority issues certificate immediately</li>
      <li>Certificate is delivered directly to CertBuddy</li>
      <li>No challenge files created or verified</li>
      <li>Domain ownership not validated</li>
    </ol>

    <h3>Use Cases</h3>
    <ul>
      <li><strong>Cloudflare Origin CA</strong>: For internal certificates between your domain and Cloudflare Edge</li>
      <li><strong>Internal Services</strong>: Private certificates for internal-only domains</li>
      <li><strong>Trust Authority</strong>: When you control the CA and trust yourself</li>
      <li><strong>Self-Signed Scenarios</strong>: Organizations that manage their own PKI</li>
      <li><strong>Development Environments</strong>: Testing without public domain validation</li>
    </ul>

    <h3>Supported CAs</h3>
    <ul>
      <li><strong>Cloudflare Origin CA</strong>: Primary use case (most common)</li>
      <li><strong>Private CAs</strong>: Internal Certificate Authorities</li>
      <li><strong>Custom CAs</strong>: Any CA that doesn't require ACME challenges</li>
    </ul>

    <h3>Features</h3>
    <ul>
      <li><strong>No Validation</strong>: Immediate certificate issuance</li>
      <li><strong>No Files Needed</strong>: No webpage changes required</li>
      <li><strong>No DNS Changes</strong>: No DNS records to manage</li>
      <li><strong>No Network Latency</strong>: No waiting for validation</li>
      <li><strong>Flexible</strong>: Use any domain/subdomain</li>
      <li><strong>Internal Domains</strong>: Works with non-public domains</li>
    </ul>

    <h3>Advantages</h3>
    <ul>
      <li>Fastest method—certificates issued immediately</li>
      <li>No configuration complexity</li>
      <li>No infrastructure changes needed</li>
      <li>Works with internal/non-public domains</li>
      <li>Perfect for origin certificates (Cloudflare)</li>
      <li>Suitable for development and staging</li>
      <li>No ongoing validation required for renewal</li>
    </ul>

    <h3>Disadvantages</h3>
    <ul>
      <li><strong>No Public Trust</strong>: Certificates not trusted by browsers</li>
      <li><strong>Limited Scope</strong>: Only works with specific CAs</li>
      <li><strong>No Domain Validation</strong>: No proof you control the domain</li>
      <li><strong>Private Use Only</strong>: Not for public/internet-facing services</li>
      <li><strong>CA Dependent</strong>: Only works with Cloudflare Origin CA or similar</li>
    </ul>

    <h3>Prerequisites</h3>
    <ul>
      <li><strong>Private CA Setup</strong>: Cloudflare Origin CA or your own CA</li>
      <li><strong>CA Credentials</strong>: API key or other credentials (if needed)</li>
      <li><strong>Domain</strong>: Domain to issue certificate for</li>
      <li><strong>Internal Network</strong>: For internal/private domains</li>
    </ul>

    <h3>Configuration</h3>

    <h4>For Cloudflare Origin CA</h4>
    <ol>
      <li>Go to Settings → Challenge Methods</li>
      <li>Click "Add Challenge"</li>
      <li>Select "No Challenge"</li>
      <li>Name: "No Challenge - Origin CA" (optional)</li>
      <li>Save</li>
    </ol>

    <p>
      That's it! No configuration needed. The Certificate Authority handles everything.
    </p>

    <h4>For Private/Internal CAs</h4>
    <pre><code>1. Set up your internal CA
2. Configure CertBuddy to use "No Challenge"
3. Select your CA from the list
4. Request certificates for internal domains
5. Check CA logs for issuance confirmation</code></pre>

    <h3>Requesting Certificates</h3>

    <h4>With Cloudflare Origin CA</h4>
    <pre><code># Go to Certificates → Request
Domain: example.com (your Cloudflare-managed domain)
CA: Cloudflare Origin CA
Challenge: No Challenge

# Certificate issued immediately
# No validation needed</code></pre>

    <h4>Wildcard Certificates</h4>
    <p>
      Cloudflare Origin CA supports wildcard domains without validation:
    </p>
    <pre><code># Go to Certificates → Request
Domain: *.example.com
CA: Cloudflare Origin CA
Challenge: No Challenge

# Wildcard certificate issued without validation</code></pre>

    <h3>Certificate Characteristics</h3>

    <h4>Cloudflare Origin CA Certificates</h4>
    <table class="characteristics-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Validity Period</td>
          <td>15 years</td>
        </tr>
        <tr>
          <td>Issuer</td>
          <td>Cloudflare Origin CA</td>
        </tr>
        <tr>
          <td>Trust Level</td>
          <td>Not in browsers (Cloudflare-only)</td>
        </tr>
        <tr>
          <td>Usage</td>
          <td>Cloudflare Edge to Your Origin</td>
        </tr>
        <tr>
          <td>Validation</td>
          <td>None required</td>
        </tr>
        <tr>
          <td>Renewal</td>
          <td>Manual when expiring</td>
        </tr>
      </tbody>
    </table>

    <h3>Cloudflare Origin CA Setup</h3>

    <h4>Step 1: Create Origin CA Key in Cloudflare</h4>
    <ol>
      <li>Login to Cloudflare Dashboard</li>
      <li>Go to SSL/TLS → Origin Server</li>
      <li>Click "Create Certificate"</li>
      <li>Select: "Generate private key and certificate with Cloudflare" OR "Use my private key"</li>
      <li>Configure certificate details</li>
      <li>Click "Create"</li>
      <li>Copy the certificate and private key</li>
    </ol>

    <h4>Step 2: Add to CertBuddy</h4>
    <ol>
      <li>Go to Certificates → Add</li>
      <li>Domain: Your domain</li>
      <li>CA: Cloudflare Origin CA</li>
      <li>Challenge: No Challenge</li>
      <li>Paste certificate and private key</li>
      <li>Save</li>
    </ol>

    <h4>Step 3: Configure Cloudflare SSL/TLS</h4>
    <ol>
      <li>In Cloudflare Dashboard: SSL/TLS → Overview</li>
      <li>Set SSL/TLS encryption mode to "Full (strict)"</li>
      <li>Go to Origin Server</li>
      <li>Ensure certificate is installed on your origin server</li>
    </ol>

    <h3>Installation on Your Origin Server</h3>

    <h4>Nginx Configuration</h4>
    <pre><code># Copy certificate files to server
/etc/nginx/certs/origin.crt     # Certificate from Cloudflare
/etc/nginx/certs/origin.key     # Private key

# Configure Nginx
server {
  listen 443 ssl http2;
  server_name example.com;

  ssl_certificate /etc/nginx/certs/origin.crt;
  ssl_certificate_key /etc/nginx/certs/origin.key;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;

  location / {
    proxy_pass http://localhost:8080;
  }
}

# Reload Nginx
nginx -t && systemctl reload nginx</code></pre>

    <h4>Apache Configuration</h4>
    <pre><code># Copy certificate files
/etc/apache2/certs/origin.crt
/etc/apache2/certs/origin.key

# Configure Apache
&lt;VirtualHost *:443&gt;
  ServerName example.com
  SSLEngine on
  SSLCertificateFile /etc/apache2/certs/origin.crt
  SSLCertificateKeyFile /etc/apache2/certs/origin.key
  SSLProtocol TLSv1.2 TLSv1.3
  SSLCipherSuite HIGH:!aNULL:!MD5

  ProxyPass / http://localhost:8080/
  ProxyPassReverse / http://localhost:8080/
&lt;/VirtualHost&gt;

# Enable SSL module and reload
a2enmod ssl
systemctl reload apache2</code></pre>

    <h3>Verification</h3>

    <h4>Test Certificate</h4>
    <pre><code># Check certificate details
openssl x509 -in /path/to/origin.crt -text -noout

# Verify issuer
issuer=Cloudflare Origin CA

# Verify hostname
CN = example.com

# Check validity
Not Before: ...
Not After: ...</code></pre>

    <h4>Verify SSL/TLS Connection</h4>
    <pre><code># Test from your origin server
openssl s_client -connect localhost:443

# Should show:
# - Server certificate
# - Issuer: Cloudflare Origin CA
# - CN: example.com

# In browser:
# - URL bar shows green lock (when accessed through Cloudflare)
# - Certificate chain validates</code></pre>

    <h3>Renewal and Rotation</h3>

    <h4>When to Renew</h4>
    <p>
      Cloudflare Origin CA certificates have 15-year validity, but best practices recommend:
    </p>
    <ul>
      <li>Rotate every 1-2 years for security</li>
      <li>Monitor expiration in CertBuddy</li>
      <li>Plan renewal in advance</li>
      <li>Test renewal process in staging first</li>
    </ul>

    <h4>Renewal Process</h4>
    <ol>
      <li>Create new certificate in Cloudflare Origin Server</li>
      <li>Store in CertBuddy</li>
      <li>Update web server configuration</li>
      <li>Reload web server</li>
      <li>Verify new certificate is active</li>
      <li>Remove old certificate</li>
    </ol>

    <h3>Multiple Certificates</h3>
    <p>
      You can manage multiple Origin CA certificates:
    </p>
    <pre><code># Example: Multiple domains/subdomains
example.com -> origin-example.com.crt
api.example.com -> origin-api.crt
admin.example.com -> origin-admin.crt

# Or single wildcard covering all
*.example.com -> origin-wildcard.crt</code></pre>

    <h3>Troubleshooting</h3>

    <h4>Certificate Not Trusted</h4>
    <p>
      This is expected! Cloudflare Origin CA certificates are not trusted by browsers.
      They're only used between Cloudflare and your origin server.
    </p>
    <ul>
      <li>Browsers should NOT show certificate warnings</li>
      <li>They access through Cloudflare's certificate instead</li>
      <li>Only your origin server needs the Origin CA certificate</li>
    </ul>

    <h4>Cloudflare Showing SSL Errors</h4>
    <pre><code>1. Verify SSL mode is "Full (strict)" in Cloudflare
2. Check certificate is installed on origin
3. Verify hostname matches certificate CN
4. Check certificate validity: not expired
5. Verify ports: 443 accessible from Cloudflare IPs
6. Check web server logs for SSL errors</code></pre>

    <h4>Mixed Content Warnings</h4>
    <p>
      If users see warnings, ensure:
    </p>
    <ul>
      <li>All resources loaded over HTTPS</li>
      <li>Cloudflare SSL mode set correctly</li>
      <li>Origin server using HTTPS</li>
    </ul>

    <h3>Security Considerations</h3>
    <ul>
      <li><strong>Private Key Storage</strong>: Keep private key secure on origin server</li>
      <li><strong>File Permissions</strong>: Certificate key should be readable only by web server</li>
      <li><strong>Access Control</strong>: Limit who can access certificates</li>
      <li><strong>Regular Rotation</strong>: Rotate certificates periodically</li>
      <li><strong>Monitoring</strong>: Track certificate expiration</li>
      <li><strong>Backup</strong>: Keep secure backup of certificates</li>
    </ul>

    <h3>Performance Notes</h3>
    <ul>
      <li>No validation delays—immediate certificate issuance</li>
      <li>15-year validity means less frequent updates</li>
      <li>Reduced infrastructure overhead</li>
      <li>Works well for stable internal certificates</li>
    </ul>

    <h3>Comparison with Other Methods</h3>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Aspect</th>
          <th>No Challenge</th>
          <th>HTTP-01</th>
          <th>DNS-01</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Speed</td>
          <td>Instant</td>
          <td>Slower</td>
          <td>Slower</td>
        </tr>
        <tr>
          <td>Validation</td>
          <td>None</td>
          <td>Required</td>
          <td>Required</td>
        </tr>
        <tr>
          <td>Complexity</td>
          <td>Simple</td>
          <td>Medium</td>
          <td>Complex</td>
        </tr>
        <tr>
          <td>Wildcard Support</td>
          <td>Yes*</td>
          <td>No</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Public Trust</td>
          <td>No</td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>

    <p><small>* Wildcard support depends on CA (Cloudflare supports it)</small></p>

    <h3>When to Use No Challenge</h3>
    <ul>
      <li>Using Cloudflare Origin CA</li>
      <li>Internal/private domain certificates</li>
      <li>Trust-based certificate distribution</li>
      <li>Private PKI infrastructure</li>
      <li>High-frequency certificate provisioning</li>
      <li>Development and staging environments</li>
    </ul>

    <h3>When NOT to Use No Challenge</h3>
    <ul>
      <li>Public internet-facing services (use Let's Encrypt instead)</li>
      <li>When domain ownership validation needed</li>
      <li>Certificates that need browser trust</li>
      <li>Public APIs or services</li>
      <li>When compliance requires domain validation</li>
    </ul>

    <h3>Resources</h3>
    <ul>
      <li><a href="https://developers.cloudflare.com/ssl/origin-configuration/origin-ca" target="_blank">Cloudflare Origin CA Documentation</a></li>
      <li><a href="https://support.cloudflare.com/hc/en-us/articles/200170416" target="_blank">Cloudflare SSL/TLS Setup</a></li>
      <li><a href="https://tools.ietf.org/html/rfc5280" target="_blank">X.509 Certificate Specification (RFC)</a></li>
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

.documentation-page h5 {
  font-size: 0.9375rem;
  margin: 0.75rem 0 0.5rem 0;
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

.characteristics-table,
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.characteristics-table thead,
.comparison-table thead {
  background: #667eea;
  color: white;
}

.characteristics-table th,
.comparison-table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
}

.characteristics-table td,
.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9375rem;
}

.characteristics-table tbody tr:last-child td,
.comparison-table tbody tr:last-child td {
  border-bottom: none;
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

.documentation-page small {
  color: #718096;
  font-size: 0.875rem;
}
</style>
