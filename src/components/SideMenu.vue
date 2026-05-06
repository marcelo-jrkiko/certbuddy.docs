<template>
  <aside class="side-menu">
    <nav class="menu-nav">
      <div
        v-for="section in sections"
        :key="section.id"
        class="section"
      >
        <h3 class="section-title">{{ section.title }}</h3>
        <ul class="items-list">
          <li
            v-for="item in section.items"
            :key="item.id"
            class="menu-item"
          >
            <button
              class="menu-link"
              :class="{ active: isActive(item.id) }"
              @click="selectItem(item)"
            >
              {{ item.title }}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MenuSection, MenuItem } from '@/types/menu';

interface Props {
  sections: MenuSection[];
  activeItemId?: string;
}

interface Emits {
  (e: 'select-item', item: MenuItem): void;
}

const props = withDefaults(defineProps<Props>(), {
  activeItemId: '',
});

const emit = defineEmits<Emits>();

const isActive = computed(() => (itemId: string) => {
  return itemId === props.activeItemId;
});

const selectItem = (item: MenuItem) => {
  emit('select-item', item);
};
</script>

<style scoped>
.side-menu {
  width: 280px;
  background: #f7fafc;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  padding: 1.5rem 0;
  flex-shrink: 0;
}

.menu-nav {
  display: flex;
  flex-direction: column;
}

.section {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #718096;
  margin: 0 0 0.75rem 0;
  padding-left: 0.5rem;
}

.items-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.menu-item {
  margin: 0;
}

.menu-link {
  display: block;
  width: 100%;
  padding: 0.75rem 0.875rem;
  text-align: left;
  border: none;
  background: transparent;
  color: #4a5568;
  font-size: 0.9375rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.menu-link:hover {
  background: #edf2f7;
  color: #2d3748;
}

.menu-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

.menu-link.active:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a3a8d 100%);
}

@media (max-width: 768px) {
  .side-menu {
    width: 240px;
    padding: 1rem 0;
  }

  .section {
    padding: 0 0.75rem;
  }

  .menu-link {
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 640px) {
  .side-menu {
    display: none;
  }
}
</style>
