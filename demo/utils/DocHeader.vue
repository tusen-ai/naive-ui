<script setup lang="ts">
import { computed } from 'vue'
import { i18n } from '../utils/composables'
import CopyDocActions from './CopyDocActions.vue'
import EditOnGithubButton from './EditOnGithubButton.vue'

const props = defineProps<{
  relativeUrl: string
  text: string
}>()

const { t } = i18n({
  'zh-CN': {
    editOnGithub: '在 GitHub 上编辑'
  },
  'en-US': {
    editOnGithub: 'Edit on GitHub'
  }
})

const id = computed(() => props.text.replace(/ /g, '-'))
</script>

<template>
  <n-h1 :id="id" class="naive-doc-title">
    <span>{{ text }}</span>
    <span class="edit-button">
      <CopyDocActions />
      <n-tooltip placement="right" :show-arrow="false">
        <template #trigger>
          <EditOnGithubButton
            text
            class="edit-button"
            quaternary
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnGithub') }}
      </n-tooltip>
    </span>
  </n-h1>
</template>

<style scoped>
.naive-doc-title {
  display: flex;
}

.naive-doc-title .edit-button {
  margin-left: 2px;
  display: inline-flex;
  align-items: center;
}
</style>
