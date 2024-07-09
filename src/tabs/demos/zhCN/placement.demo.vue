<markdown>
# 标签页的位置
</markdown>

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
      :key="type + placement"
      :type="type"
      animated
      :placement="placement"
      :style="
        placement === 'left' || placement === 'right'
          ? { height: '240px' }
          : undefined
      "
    >
      <n-tab-pane name="oasis" tab="Oasis">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Jay Chou">
        Qilixiang
      </n-tab-pane>
      <n-tab-pane name="oasis1" tab="Oasis1">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles1" tab="the Beatles1">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou1" tab="Jay Chou1">
        Qilixiang
      </n-tab-pane>
      <n-tab-pane name="oasis2" tab="Oasis2">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles2" tab="the Beatles2">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou2" tab="Jay Chou2">
        Qilixiang
      </n-tab-pane>
      <n-tab-pane name="oasis3" tab="Oasis3">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles3" tab="the Beatles3">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou3" tab="Jay Chou3">
        Qilixiang
      </n-tab-pane>
      <n-tab-pane name="oasis4" tab="Oasis4">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles4" tab="the Beatles4">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou4" tab="Jay Chou4">
        Qilixiang
      </n-tab-pane>
      <n-tab-pane name="oasis5" tab="Oasis5">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles5" tab="the Beatles5">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou5" tab="Jay Chou5">
        Qilixiang
      </n-tab-pane>
    </n-tabs>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'naive-ui'

const placement = ref<NonNullable<TabsProps['placement']>>('left')
const type = ref<TabsProps['type']>('card')
</script>
