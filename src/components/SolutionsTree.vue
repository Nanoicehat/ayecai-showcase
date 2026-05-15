<template>
  <nav class="solutions-tree">
    <div
      class="tree-item root-item"
      :class="{ active: !selectedCategory }"
      @click="$emit('select', '')"
    >
      <span class="tree-icon">📂</span>
      <span class="tree-label">全部</span>
    </div>

    <TreeNode
      v-for="node in tree"
      :key="node.path"
      :node="node"
      :depth="0"
      :selected-category="selectedCategory"
      @select="(path: string) => $emit('select', path)"
    />
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TreeNode from './TreeNode.vue'

export interface TreeNodeData {
  name: string
  path: string
  children: TreeNodeData[]
}

interface Article {
  category: string
}

const props = defineProps<{
  articles: Article[]
  selectedCategory: string
}>()

defineEmits<{
  select: [path: string]
}>()

const tree = computed(() => {
  const categories = new Set<string>()
  for (const article of props.articles) {
    if (article.category) {
      const parts = article.category.split('/')
      for (let i = 1; i <= parts.length; i++) {
        categories.add(parts.slice(0, i).join('/'))
      }
    }
  }

  const root: TreeNodeData[] = []
  const nodeMap = new Map<string, TreeNodeData>()

  const sorted = [...categories].sort()
  for (const cat of sorted) {
    const parts = cat.split('/')
    const name = parts[parts.length - 1]
    const node: TreeNodeData = { name, path: cat, children: [] }
    nodeMap.set(cat, node)

    if (parts.length === 1) {
      root.push(node)
    } else {
      const parentPath = parts.slice(0, -1).join('/')
      const parent = nodeMap.get(parentPath)
      if (parent) {
        parent.children.push(node)
      }
    }
  }

  return root
})
</script>

<style scoped>
.solutions-tree {
  padding: var(--spacing-sm) 0;
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
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

.root-item {
  margin-bottom: 4px;
  font-weight: 500;
}

.tree-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.tree-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
