<template>
  <div class="layout-wrapper">
    <Header :app-title="appTitle" :version="version" />
    
    <div class="layout-container">
      <SideMenu
        :sections="menuSections"
        :active-item-id="activeItemId"
        @select-item="handleSelectItem"
      />
      
      <main class="content-area">
        <div class="content-wrapper">
          <component
            :is="currentComponent"
            :key="currentComponent"
          />
        </div>
      </main>
    </div>
    
    <Footer :copyright-text="copyrightText" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue';
import Header from '@/components/Header.vue';
import SideMenu from '@/components/SideMenu.vue';
import Footer from '@/components/Footer.vue';
import type { MenuConfig, MenuItem } from '@/types/menu';
import menuConfigJson from '@/config/menu.json';

interface Props {
  appTitle?: string;
  version?: string;
  copyrightText?: string;
}

withDefaults(defineProps<Props>(), {
  appTitle: 'CertBuddy Documentation',
  version: '1.0.0',
  copyrightText: 'CertBuddy',
});

const menuConfig = menuConfigJson as MenuConfig;
const activeItemId = ref<string>('');
const currentComponent = ref<any>(null);

const menuSections = computed(() => menuConfig.sections);

const handleSelectItem = (item: MenuItem) => {
  activeItemId.value = item.id;
  loadComponent(item.component);
};

const loadComponent = async (componentName: string) => {
  try {
    currentComponent.value = defineAsyncComponent(
      () => import(`@/pages/${componentName}.vue`)
    );
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
    currentComponent.value = defineAsyncComponent(
      () => import('@/pages/NotFoundPage.vue')
    );
  }
};

onMounted(() => {
  // Load first item on mount
  if (menuSections.value.length > 0) {
    const firstItem = menuSections.value[0].items[0];
    if (firstItem) {
      handleSelectItem(firstItem);
    }
  }
});
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.layout-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background: white;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .content-wrapper {
    padding: 1rem;
  }
}
</style>
