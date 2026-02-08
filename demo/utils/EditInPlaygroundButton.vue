<script lang="ts">
import type { PropType } from 'vue'
import { strFromU8, strToU8, zlibSync } from 'fflate'
import { defineComponent } from 'vue'
import { appCode, playgroundUrl } from './playground'

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

function serialized(data: string): string {
  const originCode = {
    'App.vue': appCode,
    'Demo.vue': data
  }
  return utoa(JSON.stringify(originCode))
}

export default defineComponent({
  name: 'PlaygroundButton',
  props: {
    code: {
      type: String,
      required: true
    },
    size: String as PropType<any>,
    depth: String
  },
  setup(props) {
    return {
      handleClick() {
        const serializedState = serialized(props.code)
        window.open(`${playgroundUrl}/#${serializedState}`, '_blank')
      }
    }
  }
})
</script>

<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    :depth="depth"
    @click="handleClick"
  >
    <template #icon>
      <n-icon size="14">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 16 16"
        >
          <g fill="none">
            <path
              d="M5.745 3.064A.5.5 0 0 0 5 3.5v9a.5.5 0 0 0 .745.436l8-4.5a.5.5 0 0 0 0-.871l-8-4.5zM4 3.5a1.5 1.5 0 0 1 2.235-1.307l8 4.5a1.5 1.5 0 0 1 0 2.615l-8 4.5A1.5 1.5 0 0 1 4 12.5v-9z"
              fill="currentColor"
            />
          </g>
        </svg>
      </n-icon>
    </template>
  </n-button>
</template>
