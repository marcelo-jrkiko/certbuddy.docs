<template>
  <article class="documentation-page not-found">
    <div class="error-container">
      <h2>Page Not Found</h2>
      <p>
        The documentation page you're looking for could not be loaded or does not exist.
      </p>
      <p>
        Please select a page from the menu on the left to get started.
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
.documentation-page {
  line-height: 1.6;
  color: #2d3748;
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.error-container {
  text-align: center;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 0.5rem;
  border-left: 4px solid #f56565;
}

.documentation-page h2 {
  font-size: 1.875rem;
  margin: 0 0 1.5rem 0;
  color: #c53030;
}

.documentation-page p {
  margin: 1rem 0;
  font-size: 1.0625rem;
}

.documentation-page p:first-of-type {
  margin-top: 0;
}
</style>
