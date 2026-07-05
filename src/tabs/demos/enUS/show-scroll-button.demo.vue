<markdown>
# Scroll Buttons

The scroll buttons are used to assist users in scrolling and switching when there are too many tabs.
</markdown>

<script lang="ts" setup>
import type { TabsProps } from 'naive-ui'
import { ref } from 'vue'

const showScrollButton = ref(true)
const panels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

const placement = ref<TabsProps['placement']>('top')
const type = ref<TabsProps['type']>('card')
</script>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="placement">
      <n-radio label="top" value="top" />
      <n-radio label="bottom" value="bottom" />
      <n-radio label="left" value="left" />
      <n-radio label="right" value="right" />
    </n-radio-group>

    <n-radio-group v-model:value="type">
      <n-radio label="card" value="card" />
      <n-radio label="bar" value="bar" />
      <n-radio label="line" value="line" />
    </n-radio-group>

    <n-space>
      <n-switch v-model:value="showScrollButton" />
      {{ showScrollButton ? '显示' : '隐藏' }}按钮
    </n-space>
    <n-tabs
      :type="type"
      animated
      :placement="placement"
      :style="
        placement === 'left' || placement === 'right'
          ? { height: '240px' }
          : undefined
      "
      :show-scroll-button="showScrollButton"
      style="height: 200px"
    >
      <n-tab-pane v-for="panel in panels" :key="panel" :name="panel">
        {{ panel }}
      </n-tab-pane>
    </n-tabs>

    <n-tabs
      :type="type"
      animated
      :placement="placement"
      :style="
        placement === 'left' || placement === 'right'
          ? { height: '240px' }
          : undefined
      "
      :show-scroll-button="showScrollButton"
    >
      <n-tab v-for="panel in panels" :key="panel" :name="panel">
        {{ panel }}
      </n-tab>
    </n-tabs>
  </n-space>
</template>
