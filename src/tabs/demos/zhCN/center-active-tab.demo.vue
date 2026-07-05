<markdown>
# Tab滚动居中

控制活动标签是否居中显示。设置为 true 时，活动标签将滚动到滚动容器的中心位置
</markdown>

<script lang="ts" setup>
import type { TabsProps } from 'naive-ui'
import { ref } from 'vue'

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

    <n-tabs
      :type="type"
      animated
      :placement="placement"
      :style="
        placement === 'left' || placement === 'right'
          ? { height: '240px' }
          : undefined
      "
      :center-active-tab="true"
    >
      <n-tab-pane v-for="panel in panels" :key="panel" :name="panel">
        {{ panel }}
      </n-tab-pane>
    </n-tabs>

    <n-tabs
      :type="type"
      :placement="placement"
      :style="
        placement === 'left' || placement === 'right'
          ? { height: '240px' }
          : undefined
      "
      :center-active-tab="true"
    >
      <n-tab v-for="panel in panels" :key="panel" :name="panel">
        {{ panel }}
      </n-tab>
    </n-tabs>
  </n-space>
</template>
