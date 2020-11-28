<template>
  <n-h1 :id="id" class="naive-doc-title">
    <span>{{ text }}</span>
    <span class="edit-button">
      <n-tooltip
        trigger="hover"
        placement="right"
        :show-arrow="true"
      >
        <template #activator>
          <edit-on-github-button
            text
            class="edit-button"
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnGithub') }}
      </n-tooltip>
    </span>
  </n-h1>
</template>

<script>
import { i18n } from '../util-composables'

export default {
  name: 'EditOnGithubHeader',
  props: {
    relativeUrl: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup () {
    return {
      ...(i18n({
        'zh-CN': {
          editOnGithub: '在 Github 上编辑'
        },
        'en-US': {
          editOnGithub: 'Edit on Github'
        }
      }))
    }
  },
  computed: {
    id () {
      return this.text.replace(/ /g, '-')
    }
  }
}
</script>

<style scoped>
.naive-doc-title {
  display: flex;
}

.naive-doc-title .edit-button {
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
}
</style>
