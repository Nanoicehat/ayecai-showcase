<template>
  <div class="tree-node">
    <div
      class="tree-item"
      :class="{ active: selectedCategory === node.path }"
      :style="{ paddingLeft: `${12 + depth * 16}px` }"
    >
      <button
        v-if="node.children.length > 0"
        class="tree-toggle"
        @click.stop="expanded = !expanded"
      >
        <span class="toggle-arrow" :class="{ collapsed: !expanded }">▶</span>
      </button>
      <span v-else class="tree-toggle-placeholder"></span>

      <span class="tree-label" @click="$emit('select', node.path)">
        {{ node.name }}
      </span>
    </div>

    <div v-if="expanded && node.children.length > 0" class="tree-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.path"
        :node="child"
        :depth="depth + 1"
        :selected-category="selectedCategory"
        @select="(path: string) => $emit('select', path)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TreeNodeData } from './SolutionsTree.vue'

defineProps<{
  node: TreeNodeData
  depth: number
  selectedCategory: string
}>()

defineEmits<{
  select: [path: string]
}>()

const expanded = ref(true)
</script>

<style scoped>
.tree-node {
  user-select: none;
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: all 0.15s ease;
}

.tree-item:hover {
  background: var(--color-bg-card, #f5f5f5);
  color: var(--color-text);
}

.tree-item.active {
  background: var(--color-bg-card, #f0f0f0);
  color: var(--color-primary, #5b9bd5);
  font-weight: 600;
}

.tree-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.toggle-arrow {
  font-size: 10px;
  color: var(--color-text-secondary);
  transition: transform 0.2s ease;
  display: inline-block;
  transform: rotate(90deg);
}

.toggle-arrow.collapsed {
  transform: rotate(0deg);
}

.tree-toggle-placeholder {
  width: 18px;
  flex-shrink: 0;
}

.tree-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.tree-children {
  overflow: hidden;
}
</style>
