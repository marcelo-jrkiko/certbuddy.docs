<template>
  <article class="documentation-page">
    <h2>HTTP-01 Challenge: SFTP File</h2>
    <p>
      HTTP-01 with SFTP storage allows domain validation across multiple remote servers.
      Challenge files are created via SFTP on a remote server and served via HTTP. Suitable for
      multi-server, cloud, and distributed deployments.
    </p>

    <h3>How It Works</h3>
    <ol>
      <li>You request a certificate for example.com</li>
      <li>Certificate Authority generates a random token</li>
      <li>CertBuddy connects to remote server via SFTP</li>
      <li>Creates file: <code>/.well-known/acme-challenge/{token}</code> on remote server</li>
      <li>File contains verification string</li>
      <li>Certificate Authority makes HTTP request to your domain</li>
      <li>Remote server serves the challenge file</li>
      <li>If content matches, domain is validated</li>
      <li>Certificate is issued</li>
      <li>CertBuddy deletes challenge file via SFTP</li>
    </ol>

    <h3>Features</h3>
    <ul>
      <li><strong>Multi-Server</strong>: Validate from any SFTP-accessible server</li>
      <li><strong>SSH Key Auth</strong>: Secure key-based authentication</li>
      <li><strong>Remote Execution</strong>: No local file access needed</li>
      <li><strong>Path Variables</strong>: Support for {$domain}, {$key}, {$now}</li>
      <li><strong>Cloud Ready</strong>: Works with cloud platforms</li>
      <li><strong>Secure</strong>: SSH encryption for all transfers</li>
    </ul>

    <h3>Advantages</h3>
    <ul>
      <li>Works with multiple remote servers</li>
      <li>Secure SSH key-based authentication</li>
      <li>Automatic path variable substitution</li>
      <li>No need for direct filesystem access on CertBuddy</li>
      <li>Suitable for containerized/cloud deployments</li>
      <li>Highly flexible configuration</li>
      <li>Works across network boundaries</li>
    </ul>

    <h3>Disadvantages</h3>
    <ul>
      <li><strong>More Complex</strong>: Requires SSH setup</li>
      <li><strong>No Wildcard</strong>: Cannot issue wildcard certificates</li>
      <li><strong>SFTP Server Required</strong>: Remote server must have SFTP</li>
      <li><strong>SSH Credentials</strong>: Must manage SSH keys securely</li>
      <li><strong>Network Dependency</strong>: Requires network connectivity to remote</li>
    </ul>

    <h3>Prerequisites</h3>
    <ul>
      <li><strong>SSH Key Pair</strong>: Generate RSA or Ed25519 key</li>
      <li><strong>Remote SFTP Server</strong>: SSH server with SFTP access</li>
      <li><strong>User Account</strong>: User account on remote server</li>
      <li><strong>Write Permissions</strong>: Access to challenge directory</li>
      <li><strong>Web Server</strong>: HTTP server to serve challenges</li>
      <li><strong>Port 80 Open</strong>: HTTP port accessible from internet</li>
    </ul>

    <h3>Setup Instructions</h3>

    <h4>Step 1: Generate SSH Key Pair</h4>
    <p>
      Generate a new SSH key on your CertBuddy server (or use existing):
    </p>
    <pre><code>ssh-keygen -t rsa -b 4096 -f ~/.ssh/certbuddy_rsa -N ""
# or for newer systems:
ssh-keygen -t ed25519 -f ~/.ssh/certbuddy_ed25519 -N ""

# Verify keys
ls -la ~/.ssh/certbuddy*</code></pre>

    <h4>Step 2: Deploy Public Key to Remote Server</h4>
    <p>
      Add the public key to remote server's authorized_keys:
    </p>
    <pre><code># Copy public key to remote server
ssh-copy-id -i ~/.ssh/certbuddy_rsa user@remote-server.com

# Or manually:
cat ~/.ssh/certbuddy_rsa.pub | ssh user@remote-server.com "cat >> ~/.ssh/authorized_keys"

# Set correct permissions
ssh user@remote-server.com "chmod 600 ~/.ssh/authorized_keys"</code></pre>

    <h4>Step 3: Create Challenge Directory on Remote Server</h4>
    <pre><code># SSH into remote server
ssh user@remote-server.com

# Create challenge directory
mkdir -p /var/www/certbuddy-challenges/.well-known/acme-challenge
chmod 755 /var/www/certbuddy-challenges
chmod 755 /var/www/certbuddy-challenges/.well-known
chmod 755 /var/www/certbuddy-challenges/.well-known/acme-challenge

# Exit
exit</code></pre>

    <h4>Step 4: Configure Web Server on Remote Server</h4>

    <h5>Nginx Configuration</h5>
    <pre><code># SSH into remote server
ssh user@remote-server.com

# Edit: nano /etc/nginx/sites-available/default
server {
  listen 80;
  server_name example.com;

  # Serve challenge files
  location /.well-known/acme-challenge/ {
    root /var/www/certbuddy-challenges;
    allow all;
  }

  # Other locations
  location / {
    return 301 https://example.com$request_uri;
  }
}

# Test and reload
sudo nginx -t
sudo systemctl reload nginx</code></pre>

    <h5>Apache Configuration</h5>
    <pre><code># Similar Apache configuration
# Add to /etc/apache2/sites-available/000-default.conf
Alias /.well-known/acme-challenge/ /var/www/certbuddy-challenges/.well-known/acme-challenge/

&lt;Directory /var/www/certbuddy-challenges&gt;
  Allow from all
&lt;/Directory&gt;</code></pre>

    <h4>Step 5: Test SSH Access</h4>
    <pre><code># Test SSH connection from CertBuddy server
ssh -i ~/.ssh/certbuddy_rsa user@remote-server.com "echo 'SSH access working'"

# Test SFTP
sftp -i ~/.ssh/certbuddy_rsa user@remote-server.com
  sftp> cd /var/www/certbuddy-challenges
  sftp> ls
  sftp> quit</code></pre>

    <h4>Step 6: Configure in CertBuddy</h4>
    <ol>
      <li>Go to Settings → Challenge Methods</li>
      <li>Click "Add Challenge"</li>
      <li>Select "HTTP-01 (SFTP File)"</li>
      <li>Enter configuration:
        <ul>
          <li><strong>SFTP Host</strong>: remote-server.com</li>
          <li><strong>SFTP Port</strong>: 22 (default)</li>
          <li><strong>SFTP User</strong>: user</li>
          <li><strong>SFTP Path</strong>: /var/www/certbuddy-challenges</li>
          <li><strong>Private Key</strong>: Upload ~/.ssh/certbuddy_rsa</li>
        </ul>
      </li>
      <li>Click "Test Configuration"</li>
      <li>Verify: "Configuration valid"</li>
      <li>Save</li>
    </ol>

    <h3>Path Variables</h3>
    <p>
      SFTP paths support dynamic variable substitution:
    </p>
    <table class="variables-table">
      <thead>
        <tr>
          <th>Variable</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>{$domain}</code></td>
          <td>Domain being validated</td>
          <td>example.com</td>
        </tr>
        <tr>
          <td><code>{$key}</code></td>
          <td>Challenge token</td>
          <td>abc123xyz...</td>
        </tr>
        <tr>
          <td><code>{$now}</code></td>
          <td>Current timestamp</td>
          <td>1234567890</td>
        </tr>
      </tbody>
    </table>

    <h4>Example Paths</h4>
    <pre><code>Default:
/var/www/certbuddy-challenges

By Domain:
/var/www/{$domain}/certbuddy-challenges

With Timestamp:
/var/www/certbuddy-challenges/{$now}

Complex:
/var/www/domains/{$domain}/challenges/{$key}</code></pre>

    <h3>Requesting Certificates</h3>

    <h4>Single Domain via SFTP</h4>
    <pre><code># Go to Certificates → Request
Domain: example.com
Challenge: HTTP-01 (SFTP)
SFTP Host: remote-server.com
CA: Let's Encrypt</code></pre>

    <h3>Advanced Configuration</h3>

    <h4>Multiple Remote Servers</h4>
    <p>
      Create multiple SFTP challenge configurations for different servers:
    </p>
    <pre><code># Production server
Name: SFTP Production
Host: prod-server.com

# Staging server
Name: SFTP Staging
Host: staging-server.com

# Backup server
Name: SFTP Backup
Host: backup-server.com</code></pre>

    <h4>SSH Key Permissions</h4>
    <p>
      Ensure SSH key has correct permissions:
    </p>
    <pre><code># Private key: 600 (read/write for owner only)
chmod 600 ~/.ssh/certbuddy_rsa

# Public key: 644 (readable by all)
chmod 644 ~/.ssh/certbuddy_rsa.pub

# Verify on remote:
ssh user@remote-server.com
  ls -la ~/.ssh/authorized_keys  # Should be 600
  cat ~/.ssh/authorized_keys     # Should contain your public key</code></pre>

    <h3>Validation Flow</h3>
    <pre><code class="flow">CertBuddy (with SSH key)
  ↓ SSH connection
Remote Server (SFTP)
  ↓ Create file
/.well-known/acme-challenge/{token}
  ↓
Let's Encrypt
  ↓ HTTP request
http://example.com/.well-known/acme-challenge/{token}
  ↓
Your Domain's Web Server
  ↓ Serves file from /var/www/certbuddy-challenges
File Content
  ↓
If matches expected token
Domain Validated ✓
Issue Certificate</code></pre>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>SSH Keys</strong>: Use dedicated key for CertBuddy</li>
      <li><strong>Permissions</strong>: Set SSH key to 600, directory to 755</li>
      <li><strong>Key Rotation</strong>: Rotate SSH keys quarterly</li>
      <li><strong>User Restrictions</strong>: Use limited SSH user if possible</li>
      <li><strong>Monitoring</strong>: Monitor SSH access logs</li>
      <li><strong>Firewall</strong>: Restrict SFTP port access</li>
      <li><strong>Testing</strong>: Test SFTP connectivity before production</li>
      <li><strong>Backups</strong>: Keep SSH key backup secure</li>
    </ul>

    <h3>Automatic Renewal</h3>
    <p>
      CertBuddy automatically handles renewal with SFTP HTTP-01:
    </p>
    <ul>
      <li>Renewal task checks for expiring certificates</li>
      <li>Establishes SFTP connection to remote server</li>
      <li>Creates new challenge file</li>
      <li>Let's Encrypt validates via HTTP</li>
      <li>Certificate issued</li>
      <li>Cleans up challenge file via SFTP</li>
    </ul>

    <h3>Troubleshooting</h3>

    <h4>SFTP Connection Fails</h4>
    <pre><code>1. Test SSH directly: ssh -i key user@host "echo ok"
2. Verify host is reachable: ping host
3. Check SSH port: telnet host 22
4. Verify SSH key permissions: ls -la key
5. Check authorized_keys on remote: cat ~/.ssh/authorized_keys</code></pre>

    <h4>Challenge File Not Created</h4>
    <pre><code>1. Test SFTP manually: sftp -i key user@host
2. Check directory exists: ls /var/www/certbuddy-challenges
3. Verify write permissions: touch test.txt
4. Check disk space: df -h
5. Review CertBuddy logs for SFTP errors</code></pre>

    <h4>HTTP Validation Fails</h4>
    <pre><code>1. Verify challenge file exists: ls -la /var/www/certbuddy-challenges/
2. Test HTTP access: curl http://example.com/.well-known/acme-challenge/test
3. Check web server config: nginx -t
4. View web server logs: tail -f /var/log/nginx/access.log
5. Verify domain points to server</code></pre>

    <h4>SSH Key Issues</h4>
    <pre><code>1. Check key permissions: ls -l ~/.ssh/certbuddy_rsa
2. Verify key format: ssh-keygen -y -f key (should not error)
3. Test with explicit key: ssh -i ~/.ssh/certbuddy_rsa user@host
4. Check key in authorized_keys: grep "YOUR-KEY" ~/.ssh/authorized_keys
5. Verify key not expired/revoked</code></pre>

    <h3>Security Considerations</h3>
    <ul>
      <li><strong>SSH Keys</strong>: Protect private keys as you would passwords</li>
      <li><strong>Key Scope</strong>: Use restricted SSH user with limited permissions</li>
      <li><strong>Firewall</strong>: Restrict SSH access by IP if possible</li>
      <li><strong>Logging</strong>: Monitor SSH access logs regularly</li>
      <li><strong>Key Backup</strong>: Keep secure backup of SSH key</li>
      <li><strong>Key Rotation</strong>: Rotate keys on regular schedule</li>
      <li><strong>No Password SSH</strong>: Ensure key authentication is set up correctly</li>
    </ul>

    <h3>Scaling to Many Servers</h3>
    <p>
      For managing many servers:
    </p>
    <ul>
      <li>Create centralized challenge directory on shared storage</li>
      <li>Or use DNS-01 method for better scalability</li>
      <li>Use load balancer to distribute challenge requests</li>
      <li>Configure multiple SFTP targets for redundancy</li>
    </ul>

    <h3>Resources</h3>
    <ul>
      <li><a href="https://tools.ietf.org/html/rfc8555#section-8.3" target="_blank">ACME HTTP-01 Challenge (RFC)</a></li>
      <li><a href="https://man.openbsd.org/ssh_config" target="_blank">SSH Configuration Manual</a></li>
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

.variables-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.variables-table thead {
  background: #667eea;
  color: white;
}

.variables-table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
}

.variables-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9375rem;
}

.variables-table tbody tr:last-child td {
  border-bottom: none;
}

.flow {
  background: none !important;
  font-size: 0.85rem;
  white-space: pre;
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
