<markdown>
# 为节点绑定事件

使用 `node-props` 为节点绑定属性，比如点击事件或者右键菜单。
</markdown>

<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :node-props="nodeProps"
  />
  <n-dropdown
    trigger="manual"
    placement="bottom-start"
    :show="showDropdown"
    :options="(options as any)"
    :x="x"
    :y="y"
    @select="handleSelect"
    @clickoutside="handleClickoutside"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'
import { TreeOption, useMessage, DropdownOption } from 'naive-ui'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

export default defineComponent({
  setup () {
    const message = useMessage()
    const showDropdownRef = ref(false)
    const optionsRef = ref<DropdownOption[]>([])
    const xRef = ref(0)
    const yRef = ref(0)
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41']),
      showDropdown: showDropdownRef,
      x: xRef,
      y: yRef,
      options: optionsRef,
      handleSelect: () => {
        showDropdownRef.value = false
      },
      handleClickoutside: () => {
        showDropdownRef.value = false
      },
      nodeProps: ({ option }: { option: TreeOption }) => {
        return {
          onClick () {
            message.info('[Click] ' + option.label)
          },
          onContextmenu (e: MouseEvent): void {
            optionsRef.value = [option]
            showDropdownRef.value = true
            xRef.value = e.clientX
            yRef.value = e.clientY
            console.log(e.clientX, e.clientY)
            e.preventDefault()
          }
        }
      }
    }
  }
})
</script>
