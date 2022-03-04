<markdown>
# Manually positioned

Warning: when manually positioned, the `trigger` prop must be set to `'manual'`.
</markdown>

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

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { useMessage } from 'naive-ui'

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

export default defineComponent({
  setup () {
    const message = useMessage()

    const showDropdownRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)

    return {
      options,
      showDropdown: showDropdownRef,
      x: xRef,
      y: yRef,
      handleSelect (key: string | number) {
        showDropdownRef.value = false
        message.info(String(key))
      },
      handleContextMenu (e: MouseEvent) {
        e.preventDefault()
        showDropdownRef.value = false
        nextTick().then(() => {
          showDropdownRef.value = true
          xRef.value = e.clientX
          yRef.value = e.clientY
        })
      },
      onClickoutside () {
        message.info('clickoutside')
        showDropdownRef.value = false
      }
    }
  }
})
</script>
