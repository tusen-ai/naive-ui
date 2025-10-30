<markdown>
# Manual Position

Note: When using manual position, `trigger` must be set to `'manual'`.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { nextTick, ref } from 'vue'

const options = [
  {
    label: 'Jay Gatsby',
    key: 'jay gatsby'
  },
  {
    label: 'Daisy Buchanan',
    key: 'daisy buchanan'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Nick Carraway',
    key: 'nick carraway'
  },
  {
    label: 'Others',
    key: 'others1',
    children: [
      {
        label: 'Jordan Baker',
        key: 'jordan baker'
      },
      {
        label: 'Tom Buchanan',
        key: 'tom buchanan'
      },
      {
        label: 'Others',
        key: 'others2',
        children: [
          {
            label: 'Chicken',
            key: 'chicken'
          },
          {
            label: 'Beef',
            key: 'beef'
          }
        ]
      }
    ]
  }
]

const message = useMessage()

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

function handleSelect(key: string | number) {
  showDropdown.value = false
  message.info(String(key))
}

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

function onClickoutside() {
  message.info('clickoutside')
  showDropdown.value = false
}
</script>

<template>
  <div
    style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, 0.5)"
    @contextmenu="handleContextMenu"
  >
    Right Click
  </div>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="showDropdown"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
  />
</template>
