<template>
  <article class="documentation-page">
    <h2>DNS-01 Challenge: Cloudflare DNS</h2>
    <p>
      DNS-01 with Cloudflare provider is the most reliable and automated challenge method for
      domain validation. Perfect for wildcard certificates and automated renewals.
    </p>

    <h3>How It Works</h3>
    <ol>
      <li>You request a certificate (wildcard or multi-domain)</li>
      <li>Certificate Authority generates a random token</li>
      <li>CertBuddy calls Cloudflare API to create a TXT record</li>
      <li>TXT record contains the validation token</li>
      <li>Certificate Authority queries DNS to find the TXT record</li>
      <li>If record matches, domain is validated</li>
      <li>Certificate is issued</li>
      <li>CertBuddy deletes the TXT record from DNS</li>
    </ol>

    <h3>Features</h3>
    <ul>
      <li><strong>Wildcard Support</strong>: Issue wildcard certificates (*.example.com)</li>
      <li><strong>Multi-Domain</strong>: Many CNAMEs pointing to same server</li>
      <li><strong>Automatic Zone Discovery</strong>: Finds zone automatically</li>
      <li><strong>Automatic Cleanup</strong>: Deletes validation records after validation</li>
      <li><strong>No Public Access Needed</strong>: No need to open ports to internet</li>
      <li><strong>Reliable</strong>: Works from any location, high success rate</li>
      <li><strong>API-Based</strong>: Fully automated via API</li>
    </ul>

    <h3>Advantages</h3>
    <ul>
      <li>Works for wildcard certificates</li>
      <li>Works for multiple domains (SAN)</li>
      <li>No need for reverse proxy or public web server</li>
      <li>Can validate from any location</li>
      <li>Ideal for automated renewals</li>
      <li>Works on edge/CDN networks</li>
      <li>Fastest method for bulk renewals</li>
    </ul>

    <h3>Disadvantages</h3>
    <ul>
      <li>Requires Cloudflare DNS provider</li>
      <li>Requires Cloudflare API token</li>
      <li>Domain must have nameservers pointing to Cloudflare</li>
      <li>Slightly slower than HTTP-01 single request</li>
    </ul>

    <h3>Prerequisites</h3>
    <ul>
      <li><strong>Cloudflare Account</strong>: Active account with billing</li>
      <li><strong>Cloudflare Nameservers</strong>: Domain nameservers pointing to Cloudflare</li>
      <li><strong>API Token</strong>: Cloudflare API token with DNS edit permission</li>
      <li><strong>Zone Access</strong>: Token must have access to the zone</li>
    </ul>

    <h3>Getting Cloudflare API Token</h3>
    <ol>
      <li>Log in to Cloudflare dashboard</li>
      <li>Navigate to Profile → API Tokens</li>
      <li>Click "Create Token"</li>
      <li>Select "Edit zone DNS" template</li>
      <li>Or create custom token with:
        <ul>
          <li>Zone.DNS: Edit</li>
          <li>Zone.Zone: Read</li>
          <li>Account.All Zones: for global access (or specific zones)</li>
        </ul>
      </li>
      <li>Set expiration (recommended: 90+ days)</li>
      <li>Create token and copy immediately</li>
    </ol>

    <h3>Configuration in CertBuddy</h3>

    <h4>Step 1: Add Challenge Configuration</h4>
    <ol>
      <li>Go to Settings → Challenge Methods</li>
      <li>Click "Add Challenge"</li>
      <li>Select "DNS-01 (Cloudflare)"</li>
      <li>Enter configuration name (e.g., "Cloudflare DNS")</li>
    </ol>

    <h4>Step 2: Enter API Token</h4>
    <ol>
      <li>Paste your Cloudflare API token</li>
      <li>Click "Test Configuration"</li>
      <li>Verify: "Configuration valid"</li>
      <li>Save challenge configuration</li>
    </ol>

    <h4>Step 3: Use in Certificate Request</h4>
    <ol>
      <li>Request a new certificate</li>
      <li>Select certificate authority (Let's Encrypt)</li>
      <li>Select challenge method: "DNS-01 (Cloudflare)"</li>
      <li>Enter domain (must be on Cloudflare)</li>
      <li>Submit request</li>
      <li>CertBuddy automatically handles DNS validation</li>
    </ol>

    <h3>Requesting Certificates</h3>

    <h4>Single Domain</h4>
    <pre><code>Domain: example.com
Challenge: DNS-01 (Cloudflare)
CA: Let's Encrypt</code></pre>

    <h4>Wildcard Domain</h4>
    <pre><code>Domain: *.example.com
Challenge: DNS-01 (Cloudflare)
CA: Let's Encrypt</code></pre>

    <h4>Multiple Domains (SAN)</h4>
    <pre><code>Domains: example.com, *.example.com, www.example.com
Challenge: DNS-01 (Cloudflare)
CA: Let's Encrypt</code></pre>

    <h3>Behind the Scenes</h3>
    <p>
      When you request a certificate with DNS-01 Cloudflare challenge:
    </p>
    <pre><code class="flow">CertBuddy ─────────── Cloudflare API ─────────── Name Servers
           ↓ Create TXT                         ↓ Update DNS
         _acme-challenge.example.com = "token"
           ↓ Notify validation complete
Let's Encrypt ──────── Query DNS ──────────── Cloudflare DNS
              ↓ Find token
              If matches: Issue Certificate ✓</code></pre>

    <h3>Automatic Renewal</h3>
    <p>
      CertBuddy automatically renews certificates using DNS-01:
    </p>
    <ul>
      <li>Renewal task runs every 24 hours (configurable)</li>
      <li>Checks for certificates expiring within 24 hours (configurable)</li>
      <li>Automatically requests renewal with same settings</li>
      <li>DNS validation happens automatically</li>
      <li>New certificate replaces old one</li>
      <li>No manual intervention needed</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Token Security</strong>: Treat API tokens like passwords</li>
      <li><strong>Minimal Permissions</strong>: Use zone-specific token scope</li>
      <li><strong>Token Rotation</strong>: Rotate tokens annually</li>
      <li><strong>Monitoring</strong>: Check renewal logs regularly</li>
      <li><strong>Testing</strong>: Test with test certificate first</li>
      <li><strong>Backup</strong>: Have secondary challenge method configured</li>
      <li><strong>Staging</strong>: Test certificate requests in staging first</li>
    </ul>

    <h3>Troubleshooting</h3>

    <h4>Certificate Request Fails</h4>
    <pre><code>1. Verify domain is on Cloudflare
2. Check domain nameservers point to Cloudflare
3. Verify API token is correct
4. Check token has Zone.DNS edit permission
5. Ensure zone is active (not pending)
6. Check if Let's Encrypt rate limit not exceeded</code></pre>

    <h4>Validation Stays Pending</h4>
    <pre><code>1. Check Cloudflare DNS for _acme-challenge record
2. Verify record was created with correct value
3. Wait 1-2 minutes for DNS propagation
4. Check DNS propagation: dig _acme-challenge.example.com TXT
5. Review CertBuddy logs for errors</code></pre>

    <h4>API Token Error</h4>
    <pre><code>1. Regenerate API token from Cloudflare
2. Verify token has required permissions
3. Verify token scope includes your zone
4. Try testing connection again
5. Check token hasn't expired</code></pre>

    <h4>Renewal Fails</h4>
    <pre><code>1. Check renewal task is enabled
2. Verify certificate hasn't already renewed
3. Check API token is still valid
4. Review renewal task logs
5. Manually trigger renewal test</code></pre>

    <h3>Monitoring</h3>

    <h4>Check DNS Records</h4>
    <pre><code>dig _acme-challenge.example.com TXT

# Should show:
; <<>> DiG 9.11.3
;; status: NOERROR, id: 21345
; _acme-challenge.example.com. IN TXT
_acme-challenge.example.com. 120 IN TXT "validation-token-here"</code></pre>

    <h4>Check Certificate Status</h4>
    <pre><code>openssl s_client -connect example.com:443 -servername example.com</code></pre>

    <h3>Advanced Configuration</h3>

    <h4>Multiple API Tokens</h4>
    <p>
      Create multiple DNS-01 Cloudflare challenge configurations with different API tokens for:
    </p>
    <ul>
      <li>Different Cloudflare accounts</li>
      <li>Different domain zones</li>
      <li>Load balancing requests</li>
      <li>Redundancy and failover</li>
    </ul>

    <h4>Custom Retry Logic</h4>
    <p>
      CertBuddy automatically retries failed DNS validations:
    </p>
    <ul>
      <li>Initial attempt + 2 retries</li>
      <li>Wait period between retries</li>
      <li>Configurable timeout values</li>
    </ul>

    <h3>Rate Limits</h3>
    <ul>
      <li><strong>Cloudflare API</strong>: 1200 requests/5 minutes (usually not hit)</li>
      <li><strong>Let's Encrypt</strong>: 50 certs/domain/week</li>
      <li><strong>DNS TTL</strong>: Records cached, 60-120 seconds typical</li>
    </ul>

    <h3>Resources</h3>
    <ul>
      <li><a href="https://developers.cloudflare.com/api/operations/zone-dns-records-get" target="_blank">Cloudflare DNS API</a></li>
      <li><a href="https://tools.ietf.org/html/rfc8555#section-8.4" target="_blank">ACME DNS-01 Challenge (RFC)</a></li>
      <li><a href="https://letsencrypt.org/docs/challenge-types/" target="_blank">Let's Encrypt Challenge Types</a></li>
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

.flow {
  background: none !important;
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-wrap: break-word;
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
