<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import type { TabsProps } from 'naive-ui'
import { unstableTabsRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableTabsRtl]
const placement = ref<TabsProps['placement']>('top')
const type = ref<TabsProps['type']>('line')
const value = ref('oasis')
const panels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-switch v-model:value="rtlEnabled" />
      Rtl
    </n-space>
    <n-radio-group v-model:value="placement">
      <n-radio label="top" value="top" />
      <n-radio label="bottom" value="bottom" />
      <n-radio label="left" value="left" />
      <n-radio label="right" value="right" />
      <n-radio label="start" value="start" />
      <n-radio label="end" value="end" />
    </n-radio-group>
    <n-radio-group v-model:value="type">
      <n-radio label="line" value="line" />
      <n-radio label="bar" value="bar" />
      <n-radio label="card" value="card" />
      <n-radio label="segment" value="segment" />
    </n-radio-group>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space vertical>
        <n-tabs
          v-model:value="value"
          :type="type"
          animated
          :placement="placement"
          :style="
            placement === 'left'
              || placement === 'right'
              || placement === 'start'
              || placement === 'end'
              ? { height: '240px' }
              : undefined
          "
        >
          <template #prefix>
            Prefix
          </template>
          <template #suffix>
            Suffix
          </template>
          <n-tab-pane name="oasis" tab="Oasis">
            Wonderwall
          </n-tab-pane>
          <n-tab-pane name="beatles" tab="The Beatles">
            Hey Jude
          </n-tab-pane>
          <n-tab-pane name="jay" tab="Jay Chou">
            Qilixiang
          </n-tab-pane>
        </n-tabs>

        <n-tabs type="card" closable default-value="1">
          <n-tab-pane
            v-for="panel in [1, 2, 3, 4]"
            :key="panel"
            :name="String(panel)"
            :tab="`Tab ${panel}`"
          >
            Content {{ panel }}
          </n-tab-pane>
        </n-tabs>

        <n-tabs
          type="card"
          show-scroll-button
          center-active-tab
          default-value="1"
          style="max-width: 400px"
        >
          <n-tab-pane
            v-for="panel in panels"
            :key="panel"
            :name="String(panel)"
            :tab="`Tab ${panel}`"
          >
            Content {{ panel }}
          </n-tab-pane>
        </n-tabs>
      </n-space>
    </n-config-provider>
  </n-space>
</template>
