<markdown>
# 主题

你可以使用 `n-config-provider` 的 `theme-overrides` 调整滚动条的每一个主题变量。
</markdown>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

const scrollbar = reactive({
  width: '5px',
  height: '5px',
  borderRadius: '5px',
  color: 'rgba(0, 0, 0, 0.25)',
  colorHover: 'rgba(0, 0, 0, 0.4)',
  railColor: 'rgba(0, 0, 0, 0)',
  railInsetHorizontalBottom: 'auto 2px 4px 2px',
  railInsetHorizontalTop: '4px 2px auto 2px',
  railInsetVerticalRight: '2px 4px 2px auto',
  railInsetVerticalLeft: '2px auto 2px 4px'
})

const colorKeys = ['color', 'colorHover', 'railColor'] as const

const inputKeys = [
  'width',
  'height',
  'borderRadius',
  'railInsetHorizontalBottom',
  'railInsetHorizontalTop',
  'railInsetVerticalRight',
  'railInsetVerticalLeft'
] as const

const themeOverrides = computed(() => ({
  Scrollbar: { ...scrollbar }
}))
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-scrollbar trigger="none" x-scrollable style="max-height: 120px">
      <div style="min-width: 800px">
        我们在田野上面找猪<br>
        想象中已找到了三只<br>
        小鸟在白云上面追逐<br>
        它们在树底下跳舞<br>
        啦啦啦啦啦啦啦啦咧<br>
        啦啦啦啦咧<br>
        我们在想象中度过了许多年<br>
        想象中我们是如此的疯狂<br>
        我们在城市里面找猪<br>
        想象中已找到了几百万只<br>
        小鸟在公园里面唱歌<br>
        它们独自在想象里跳舞<br>
        啦啦啦啦啦啦啦啦咧<br>
        啦啦啦啦咧<br>
        我们在想象中度过了许多年<br>
        许多年之后我们又开始想象<br>
        啦啦啦啦啦啦啦啦咧
      </div>
    </n-scrollbar>
    <n-form size="small" :show-feedback="false" style="margin-top: 12px">
      <n-grid :cols="3" :x-gap="12" :y-gap="8">
        <n-form-item-gi v-for="key in colorKeys" :key="key" :label="key">
          <n-color-picker
            v-model:value="scrollbar[key]"
            size="small"
            :modes="['rgb', 'hex']"
          />
        </n-form-item-gi>
      </n-grid>
      <n-grid :cols="2" :x-gap="12" :y-gap="8">
        <n-form-item-gi v-for="key in inputKeys" :key="key" :label="key">
          <n-input v-model:value="scrollbar[key]" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-config-provider>
</template>
