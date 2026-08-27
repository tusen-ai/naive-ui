<markdown>
# Theme

You can use `n-config-provider`'s `theme-overrides` to customize every scrollbar theme variable.
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
        And as I sat there, brooding on the old unknown world, I thought of
        Gatsby’s wonder when he first picked out the green light at the end of
        Daisy’s dock. He had come a long way to this blue lawn and his dream
        must have seemed so close that he could hardly fail to grasp it. He did
        not know that it was already behind him, somewhere back in that vast
        obscurity beyond the city, where the dark fields of the republic rolled
        on under the night.<br><br>

        Gatsby believed in the green light, the orgastic future that year by
        year recedes before us. It eluded us then, but that’s no matter—tomorrow
        we will run faster, stretch out our arms farther. . . . And one fine
        morning——<br><br>

        So we beat on, boats against the current, borne back ceaselessly into
        the past.
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
