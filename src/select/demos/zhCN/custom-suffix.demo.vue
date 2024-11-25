<markdown>
# 自定义箭头

整点不一样的。
</markdown>

<script lang="ts">
import Flash16Regular from '@vicons/fluent/Flash16Regular'
import FlashCheckmark16Regular from '@vicons/fluent/FlashCheckmark16Regular'
import MdSearch from '@vicons/ionicons4/MdSearch'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    MdSearch,
    Flash16Regular,
    FlashCheckmark16Regular
  },
  setup() {
    return {
      show1: ref(false),
      show2: ref(false),
      options: [
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: 'You Won\'t See',
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: 'I\'m looking through you',
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-select v-model:show="show1" placeholder="选择歌曲" :options="options">
      <template #arrow>
        <transition name="slide-left">
          <FlashCheckmark16Regular v-if="show1" />
          <Flash16Regular v-else />
        </transition>
      </template>
    </n-select>
    <n-select
      v-model:show="show2"
      filterable
      placeholder="选择歌曲"
      :options="options"
    >
      <template v-if="show2" #arrow>
        <MdSearch />
      </template>
    </n-select>
  </n-space>
</template>

<style>
:deep(.slide-left-enter-active),
:deep(.slide-left-leave-active) {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

:deep(.slide-left-enter-from),
:deep(.slide-left-leave-to) {
  position: absolute;
  opacity: 0;
}

:deep(.slide-left-enter-from) {
  transform: translateX(-10px);
}

:deep(.slide-left-leave-to) {
  transform: translateX(10px);
}
</style>
