<script setup lang="ts">
interface TreeNode {
  id: number
  label: string
  nodes: TreeNode[]
  checked: boolean
  indeterminate: boolean
  flatMap: () => TreeNode[]
}

const props = defineProps<{
  nodes: any
}>()

const emit = defineEmits<{
  (e: 'trackedChecked', checkedKeys: number[]): void
}>()

function onNodeExpanded(node: TreeNode, state: any) {
  // console.log('state: ', state)
  // console.log('node: ', node)
}

function getCheckedNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes.flatMap((node: TreeNode) => {
    const childNodes = getCheckedNodes(node.nodes)
    return node.checked ? [node, ...childNodes] : childNodes
  })
}

const checkedNodes: any = ref<number[]>([])
function onUpdate(nodes: TreeNode[]) {
  console.log('nodes: ', nodes)
  checkedNodes.value = getCheckedNodes(nodes)
  emit('trackedChecked', checkedNodes.value)
}

const expandedKeys = ref<number[]>([])
const selectedKeys = ref<number[]>([])
const checkedKeys = ref<number[]>([])

watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys)
})

watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys)
  emit('trackedChecked', checkedKeys.value)
})

const searchText = ref('')
</script>

<template>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
    checkable
    :tree-data="nodes"
  >
    <template #title="{ title, key }">
      <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
      <template v-else>
        {{ title }}
      </template>
    </template>
  </a-tree>
</template>

<style>
a {
  color: inherit;
}
</style>
