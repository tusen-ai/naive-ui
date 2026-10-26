<script setup lang="ts">
import { i18n } from '../utils/composables'
import CopyMarkdownButton from './CopyMarkdownButton.vue'
import EditOnGithubButton from './EditOnGithubButton.vue'

defineOptions({ name: 'EditOnGithubHeader' })

defineProps<{
  relativeUrl: string
  text: string
  /** Anchor of the title, given by the Markdown loader */
  id: string
}>()

const { t } = i18n({
  'zh-CN': {
    editOnGithub: '在 GitHub 上编辑'
  },
  'en-US': {
    editOnGithub: 'Edit on GitHub'
  }
})
</script>

<template>
  <n-h1 :id="id" class="naive-doc-title">
    <span>{{ text }}</span>
    <span class="edit-button">
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
    <span class="edit-button">
      <CopyMarkdownButton />
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
