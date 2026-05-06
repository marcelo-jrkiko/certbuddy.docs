<template>
  <article class="documentation-page">
    <h2>FAQ</h2>
    <h3>What file formats do you support?</h3>
    <p>
      CertBuddy supports PEM, DER, and PKCS#7 certificate formats.
    </p>
    <h3>Can I export my certificates?</h3>
    <p>
      Yes, you can export certificates in various formats directly from your dashboard.
    </p>
    <h3>What is the renewal period?</h3>
    <p>
      You can configure renewal periods from 30 days before expiration up to 90 days before.
    </p>
    <h3>Is my data secure?</h3>
    <p>
      Yes, all data is encrypted both in transit and at rest using industry-standard encryption protocols.
    </p>
    <h3>Do you provide an API?</h3>
    <p>
      Yes, we provide a comprehensive REST API with detailed documentation and SDKs for popular languages.
    </p>
    <h3>What happens to my certificates if I cancel?</h3>
    <p>
      You can export all your certificates before cancellation. They remain yours to use.
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
</style>
