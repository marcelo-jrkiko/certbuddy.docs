<template>
  <article class="documentation-page">
    <h2>HTTP-01 Challenge: Local File</h2>
    <p>
      HTTP-01 with local file storage is the simplest challenge method. Challenge files are
      created on the local filesystem and served via HTTP. Only suitable for single-server setups.
    </p>

    <h3>How It Works</h3>
    <ol>
      <li>You request a certificate for example.com</li>
      <li>Certificate Authority generates a random token</li>
      <li>CertBuddy creates a file: <code>/.well-known/acme-challenge/{token}</code></li>
      <li>File contains verification string</li>
      <li>Certificate Authority makes HTTP request to fetch the file</li>
      <li>If file and content match, domain is validated</li>
      <li>Certificate is issued</li>
      <li>CertBuddy deletes the challenge file</li>
    </ol>

    <h3>Features</h3>
    <ul>
      <li><strong>Simple Setup</strong>: Just configure a local path</li>
      <li><strong>No External API</strong>: No need for DNS/cloud provider API</li>
      <li><strong>Fast</strong>: Quick HTTP validation</li>
      <li><strong>Local Control</strong>: Full filesystem control</li>
      <li><strong>Direct Access</strong>: Works on single server only</li>
    </ul>

    <h3>Advantages</h3>
    <ul>
      <li>Simple and straightforward setup</li>
      <li>No API credentials needed</li>
      <li>Works without DNS provider account</li>
      <li>Fast validation (HTTP-only)</li>
      <li>Suitable for development/testing</li>
      <li>Direct filesystem control</li>
    </ul>

    <h3>Disadvantages</h3>
    <ul>
      <li><strong>Single Server Only</strong>: Cannot validate multiple servers simultaneously</li>
      <li><strong>No Wildcard</strong>: Cannot issue wildcard certificates</li>
      <li><strong>Public HTTP Required</strong>: Requires port 80 open and accessible from internet</li>
      <li><strong>Web Server Configuration</strong>: Must configure web server to serve challenge files</li>
      <li><strong>Downtime Risk</strong>: Service must be running during validation</li>
    </ul>

    <h3>Prerequisites</h3>
    <ul>
      <li><strong>Filesystem Access</strong>: Write access to challenge directory</li>
      <li><strong>Web Server</strong>: Nginx, Apache, or other HTTP server</li>
      <li><strong>Port 80 Open</strong>: HTTP port must be accessible from internet</li>
      <li><strong>Domain DNS</strong>: Domain must point to your server</li>
      <li><strong>No Firewall Blocking</strong>: Port 80 requests must reach server</li>
    </ul>

    <h3>Setup Instructions</h3>

    <h4>Step 1: Create Challenge Directory</h4>
    <pre><code># Create directory
mkdir -p /var/www/certbuddy-challenges

# Set permissions
chmod 755 /var/www/certbuddy-challenges

# Verify
ls -la /var/www/certbuddy-challenges</code></pre>

    <h4>Step 2: Configure Web Server</h4>

    <h5>Nginx Configuration</h5>
    <pre><code>server {
  listen 80;
  server_name example.com;

  # Serve challenge files
  location /.well-known/acme-challenge/ {
    root /var/www/certbuddy-challenges;
  }

  # Other locations
  location / {
    return 301 https://example.com$request_uri;
  }
}</code></pre>

    <h5>Apache Configuration</h5>
    <pre><code>&lt;VirtualHost *:80&gt;
  ServerName example.com
  
  # Serve challenge files
  Alias /.well-known/acme-challenge/ /var/www/certbuddy-challenges/.well-known/acme-challenge/
  
  &lt;Directory /var/www/certbuddy-challenges&gt;
    Allow from all
  &lt;/Directory&gt;
  
  # Other requests
  RewriteEngine On
  RewriteCond %{REQUEST_URI} !^/.well-known/acme-challenge/
  RewriteRule ^(.*)$ https://example.com$1 [R=301,L]
&lt;/VirtualHost&gt;</code></pre>

    <h4>Step 3: Reload Web Server</h4>
    <pre><code># Nginx
sudo systemctl reload nginx

# Apache
sudo systemctl reload apache2</code></pre>

    <h4>Step 4: Configure in CertBuddy</h4>
    <ol>
      <li>Go to Settings → Challenge Methods</li>
      <li>Click "Add Challenge"</li>
      <li>Select "HTTP-01 (Local File)"</li>
      <li>Set challenge path: <code>/var/www/certbuddy-challenges</code></li>
      <li>Click "Test Configuration"</li>
      <li>Verify: "Configuration valid"</li>
      <li>Save</li>
    </ol>

    <h3>Testing Configuration</h3>

    <h4>Test Challenge Setup</h4>
    <pre><code># Create test file
echo "test-string" > /var/www/certbuddy-challenges/.well-known/acme-challenge/test
chmod 644 /var/www/certbuddy-challenges/.well-known/acme-challenge/test

# Test HTTP access
curl http://example.com/.well-known/acme-challenge/test
# Should output: test-string

# Clean up
rm /var/www/certbuddy-challenges/.well-known/acme-challenge/test</code></pre>

    <h3>Requesting Certificates</h3>

    <h4>Single Domain</h4>
    <pre><code># Go to Certificates → Request
Domain: example.com
Challenge: HTTP-01 (Local File)
CA: Let's Encrypt</code></pre>

    <h4>Certificate with Subdomains</h4>
    <pre><code># Each subdomain needs separate HTTP access
Domains: example.com, www.example.com, api.example.com
Challenge: HTTP-01 (Local File)
CA: Let's Encrypt</code></pre>

    <h3>How Validation Happens</h3>
    <p>
      During HTTP-01 validation:
    </p>
    <pre><code class="flow">CertBuddy
  ↓
  Creates file: /.well-known/acme-challenge/{token}
  Content: "token.signature"
  ↓
Let's Encrypt
  ↓
  Makes HTTP request: http://example.com/.well-known/acme-challenge/{token}
  ↓
  Receives expected content? 
  ↓ YES
  Domain Validated ✓
  Issue Certificate</code></pre>

    <h3>Limitations & Constraints</h3>

    <h4>Cannot Validate These Cases</h4>
    <ul>
      <li><strong>Wildcard domains</strong>: Use DNS-01 instead</li>
      <li><strong>Multiple servers</strong>: Use SFTP or shared storage</li>
      <li><strong>Behind firewall</strong>: Port 80 must be public</li>
      <li><strong>Dynamic IPs</strong>: Domain must point to current IP</li>
      <li><strong>Load balancer without file sync</strong>: All servers need same files</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Dedicated Path</strong>: Use separate directory for challenges only</li>
      <li><strong>Permissions</strong>: Set correct file permissions (644 for files, 755 for dirs)</li>
      <li><strong>Ownership</strong>: Let web server write to challenge directory</li>
      <li><strong>Monitoring</strong>: Check that challenge files are created/deleted</li>
      <li><strong>Testing</strong>: Test manually before automation</li>
      <li><strong>Cleanup</strong>: Ensure old challenge files are cleaned up</li>
      <li><strong>Logging</strong>: Monitor web server access logs during validation</li>
    </ul>

    <h3>Automatic Renewal</h3>
    <p>
      CertBuddy supports automatic renewal with HTTP-01 local file:
    </p>
    <ul>
      <li>Renewal task checks for expiring certificates</li>
      <li>Automatically requests renewal with same challenge method</li>
      <li>Creates new challenge file</li>
      <li>Let's Encrypt validates new challenge</li>
      <li>New certificate is issued</li>
      <li>Challenge file automatically cleaned up</li>
    </ul>

    <h3>Troubleshooting</h3>

    <h4>Certificate Request Fails "Challenge Not Reachable"</h4>
    <pre><code>1. Verify port 80 is open: sudo ufw status
2. Check firewall rules: sudo iptables -L
3. Test local access: curl http://localhost/.well-known/acme-challenge/test
4. Test from another machine: curl http://example.com/.well-known/acme-challenge/test
5. Check web server logs: tail -f /var/log/nginx/access.log
6. Verify domain points to your server: nslookup example.com</code></pre>

    <h4>Web Server Not Serving Files</h4>
    <pre><code>1. Verify directory exists: ls -la /var/www/certbuddy-challenges
2. Check file permissions: ls -la /var/www/certbuddy-challenges/test
3. Verify web server config: nginx -t (or apache2ctl -t)
4. Check web server status: systemctl status nginx
5. View web server error logs</code></pre>

    <h4>Challenge Files Not Created</h4>
    <pre><code>1. Check CertBuddy has write permissions to directory
2. Verify path is correct in configuration
3. Check CertBuddy logs for errors
4. Manually test file creation:
   touch /var/www/certbuddy-challenges/test.txt
5. Verify disk space: df -h</code></pre>

    <h4>Renewal Fails</h4>
    <pre><code>1. Check if port 80 is still open
2. Test manual challenge file serving
3. Verify domain still resolves correctly
4. Check renewal task is enabled
5. Review logs for specific error messages</code></pre>

    <h3>Security Considerations</h3>
    <ul>
      <li><strong>File Permissions</strong>: Set challenge directory to 755, files 644</li>
      <li><strong>Ownership</strong>: Use dedicated user for CertBuddy</li>
      <li><strong>Isolation</strong>: Don't mix challenge files with site content</li>
      <li><strong>Cleanup</strong>: Ensure challenge files are deleted after validation</li>
      <li><strong>Logging</strong>: Monitor for unusual challenge activity</li>
    </ul>

    <h3>Scaling Beyond Single Server</h3>
    <p>
      If you need HTTP-01 with multiple servers:
    </p>
    <ul>
      <li><strong>Option 1</strong>: Use SFTP HTTP-01 method</li>
      <li><strong>Option 2</strong>: Use shared storage (NFS, S3)</li>
      <li><strong>Option 3</strong>: Use DNS-01 method instead</li>
      <li><strong>Option 4</strong>: Validate on primary, distribute certificate</li>
    </ul>

    <h3>Resources</h3>
    <ul>
      <li><a href="https://tools.ietf.org/html/rfc8555#section-8.3" target="_blank">ACME HTTP-01 Challenge (RFC)</a></li>
      <li><a href="https://letsencrypt.org/docs/challenge-types/" target="_blank">Let's Encrypt Challenge Types</a></li>
      <li><a href="https://nginx.org/en/docs/" target="_blank">Nginx Documentation</a></li>
      <li><a href="https://httpd.apache.org/docs/" target="_blank">Apache Documentation</a></li>
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

.flow {
  background: none !important;
  font-size: 0.85rem;
  whitespace: pre;
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
