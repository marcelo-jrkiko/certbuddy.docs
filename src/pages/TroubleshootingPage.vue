<template>
  <article class="documentation-page">
    <h2>Troubleshooting</h2>
    <h3>Certificate Upload Fails</h3>
    <p>
      <strong>Issue:</strong> Unable to upload certificate file.
    </p>
    <p>
      <strong>Solution:</strong> Ensure your certificate is in a supported format (PEM, DER, or PKCS#7)
      and not corrupted. Try re-exporting from your certificate provider.
    </p>
    <h3>Notifications Not Received</h3>
    <p>
      <strong>Issue:</strong> Not receiving expiration alert emails.
    </p>
    <p>
      <strong>Solution:</strong> Check your notification settings in the dashboard. Verify your email address
      and check spam folders. Contact support if the issue persists.
    </p>
    <h3>API Authentication Failed</h3>
    <p>
      <strong>Issue:</strong> Getting 401 Unauthorized errors.
    </p>
    <p>
      <strong>Solution:</strong> Verify your API token is correct and hasn't expired. Generate a new token
      if needed from the API settings page.
    </p>
    <h3>Certificate Not Showing in Dashboard</h3>
    <p>
      <strong>Issue:</strong> Recently added certificate doesn't appear immediately.
    </p>
    <p>
      <strong>Solution:</strong> The certificate may be processing. Wait a few moments and refresh the page.
      If it still doesn't appear, try uploading again or contact support.
    </p>
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

.documentation-page p {
  margin: 1rem 0;
}

.documentation-page strong {
  color: #1a202c;
}
</style>
