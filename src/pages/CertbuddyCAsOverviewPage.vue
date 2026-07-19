<template>
  <article class="documentation-page">
    <h2>Certificate Authorities Overview</h2>
    <p>
      CertBuddy supports multiple Certificate Authorities (CAs) for issuing SSL/TLS certificates.
      Each CA has different features, validation methods, and configuration requirements.
    </p>

    <h3>Supported CAs</h3>
    <div class="ca-cards">
      <div class="ca-card">
        <h4>Let's Encrypt</h4>
        <p>Free, widely-used Certificate Authority providing DV certificates with ACME protocol.</p>
        <ul>
          <li>✓ Free certificates</li>
          <li>✓ Wildcard support</li>
          <li>✓ SAN support</li>
          <li>✓ 90-day validity</li>
        </ul>
        <p><router-link to="/lets-encrypt">View Details →</router-link></p>
      </div>
      
      <div class="ca-card">
        <h4>Cloudflare Origin CA</h4>
        <p>Private CA for issuing certificates for origin servers behind Cloudflare.</p>
        <ul>
          <li>✓ Free certificates</li>
          <li>✓ Instant issuance</li>
          <li>✓ No validation required</li>
          <li>✓ Cloudflare only</li>
        </ul>
        <p><router-link to="/cloudflare-origin">View Details →</router-link></p>
      </div>

      <div class="ca-card">
        <h4>Self Signed CA</h4>
        <p>Built-in self-signed certificate issuer for internal and development usage.</p>
        <ul>
          <li>✓ No external CA dependency</li>
          <li>✓ Fast local issuance</li>
          <li>✓ No ownership challenge required</li>
          <li>✗ Not publicly trusted</li>
        </ul>
        <p>Use challenge type <code>EMPTY</code>.</p>
      </div>
    </div>

    <h3>Quick Comparison</h3>
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
          <td><strong>Validation</strong></td>
          <td>Required (ACME challenge)</td>
          <td>Not required</td>
        </tr>
        <tr>
          <td><strong>Trusted</strong></td>
          <td>Publicly trusted</td>
          <td>Private CA (Cloudflare only)</td>
        </tr>
        <tr>
          <td><strong>Wildcard</strong></td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td><strong>Setup Complexity</strong></td>
          <td>Moderate</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td><strong>Best For</strong></td>
          <td>Public internet TLS</td>
          <td>Cloudflare-proxied origins</td>
        </tr>
      </tbody>
    </table>

    <h3>Self Signed Summary</h3>
    <p>
      The engine also provides <code>SELF_SIGNED</code> authority with configurable defaults
      such as validity days and key size. It is ideal for local, private or lab deployments.
    </p>

    <h3>Choosing a CA</h3>
    <ul>
      <li><strong>Let's Encrypt</strong>: Use for public-facing websites</li>
      <li><strong>Cloudflare Origin CA</strong>: Use for domains on Cloudflare</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li>Maintain multiple CA accounts for redundancy</li>
      <li>Monitor CA rate limits</li>
      <li>Keep API credentials secure</li>
      <li>Rotate credentials regularly</li>
      <li>Test CA configuration before production</li>
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

.ca-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.ca-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.ca-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.ca-card h4 {
  margin-top: 0;
  color: #667eea;
}

.ca-card ul {
  font-size: 0.9375rem;
  margin: 1rem 0;
}

.ca-card a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.ca-card a:hover {
  color: #764ba2;
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

@media (max-width: 768px) {
  .ca-cards {
    grid-template-columns: 1fr;
  }
}
</style>
