<template>
  <n-h3> Contributors </n-h3>
  <n-space>
    <div v-for="author in contributors" :key="author.avatar">
      <n-tooltip>
        <template #trigger>
          <a
            style="display: block"
            target="_blank"
            :href="`https://github.com/${author.name}`"
          >
            <n-avatar size="small" round :src="author.avatar" />
          </a>
        </template>
        {{ author.name }}
      </n-tooltip>
    </div>
  </n-space>
</template>

<script lang="ts" setup>
// @ts-expect-error missing types
// eslint-disable-next-line import/no-absolute-path
import _contributors from '/virtual-contributors'
import { computed } from 'vue'

const props = defineProps<{ name: string }>()

const contributors = computed(
  () =>
    (_contributors[props.name] &&
      _contributors[props.name].map((c: any) => {
        return c
      })) ||
    ([] as any[])
)
</script>
