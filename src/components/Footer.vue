<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        &copy; {{ currentYear }} {{ copyrightText }}. All rights reserved.
      </p>
      <p class="footer-info">
        Documentation powered by <strong>Vue 3 + TypeScript</strong>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  copyrightText?: string;
}

withDefaults(defineProps<Props>(), {
  copyrightText: 'CertBuddy',
});

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: #2d3748;
  color: #e2e8f0;
  padding: 2rem;
  margin-top: auto;
  border-top: 1px solid #4a5568;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.copyright {
  font-size: 0.875rem;
  margin: 0.5rem 0;
  opacity: 0.8;
}

.footer-info {
  font-size: 0.8rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.7;
}

strong {
  opacity: 0.95;
}

@media (max-width: 768px) {
  .footer {
    padding: 1.5rem;
  }

  .copyright {
    font-size: 0.8rem;
  }

  .footer-info {
    font-size: 0.75rem;
  }
}
</style>
