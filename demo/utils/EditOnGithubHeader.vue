<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { zhComponentRoutes } from '../routes/routes'
import { i18n } from '../utils/composables'
import ChangeLogButton from './ChangeLogButton.vue'
import EditOnGithubButton from './EditOnGithubButton.vue'

export default defineComponent({
  name: 'EditOnGithubHeader',
  components: {
    ChangeLogButton,
    EditOnGithubButton
  },
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
  setup() {
    const route = useRoute()
    const components = zhComponentRoutes.map((route: any) => route.path)
    const isComponent = components.includes(route.fullPath.split('/').pop())
    return {
      ...i18n({
        'zh-CN': {
          editOnGithub: '在 GitHub 上编辑',
          changeLog: '更新日志'
        },
        'en-US': {
          editOnGithub: 'Edit on GitHub',
          changeLog: 'Change Log'
        }
      }),
      isComponent
    }
  },
  computed: {
    id() {
      return this.text.replace(/ /g, '-')
    }
  }
})
</script>

<template>
  <n-h1 :id="id" class="naive-doc-title">
    {{ text }}
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
    <span v-if="isComponent" class="edit-button">
      <n-tooltip placement="right" :show-arrow="false">
        <template #trigger>
          <ChangeLogButton quaternary />
        </template>
        {{ t('changeLog') }}
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
