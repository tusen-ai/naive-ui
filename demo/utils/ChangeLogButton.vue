<script lang="ts">
import type { PropType } from 'vue'
import HistoryIcon from '@vicons/fluent/History16Regular.js'
import { marked } from 'marked'
import { type ButtonProps, useThemeVars } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import zhCN from '../../components-changelog-cn.json'
import enUS from '../../components-changelog-en.json'
import { push } from '../store'
import { i18n } from '../utils/composables'

export default defineComponent({
  name: 'ChangeLogButton',
  components: {
    HistoryIcon
  },
  props: {
    text: Boolean,
    quaternary: Boolean,
    size: {
      type: String as PropType<ButtonProps['size']>,
      default: 'small'
    }
  },
  setup() {
    const route = useRoute()
    const themeVars = useThemeVars()
    const miscMap: { [key: string]: string } = {
      discrete: 'createDiscreteApi'
    }
    const isCN = route.path.startsWith('/zh-CN')
    const name = route.fullPath.split('/').pop()
    const componentName = miscMap[name as string] || `n-${name}`
    const logs = isCN ? zhCN[componentName] : enUS[componentName]
    const drawerRef = ref(false)
    const renderer = new marked.Renderer()

    renderer.link = function (href, title, text) {
      return `<a href="${href}" target="_blank" ${title ? `title="${title}"` : ''} style="color: ${themeVars.value.primaryColor}">${text}</a>`
    }

    renderer.codespan = function (text) {
      return `<code style="background-color: ${themeVars.value.dividerColor};padding: 2px 4px;border-radius: ${themeVars.value.borderRadius}" >${text}</code>`
    }

    marked.setOptions({
      renderer
    })

    const renderMarkdown = (content: string) => marked.parse(content)
    return {
      logs,
      drawerRef,
      renderMarkdown,
      push,
      ...i18n({
        'zh-CN': {
          changeLog: '更新日志',
          fullLog: '完整日志'
        },
        'en-US': {
          changeLog: 'Change Log',
          fullLog: 'Full Log'
        }
      })
    }
  }
})
</script>

<template>
  <div>
    <n-button
      class="edit-button"
      :quaternary="quaternary"
      :text="!quaternary"
      :size="size"
      @click="drawerRef = true"
    >
      <template #icon>
        <n-icon :size="20">
          <HistoryIcon />
        </n-icon>
      </template>
    </n-button>
    <n-drawer v-model:show="drawerRef" style="width: 40vw" :auto-focus="false">
      <n-drawer-content :native-scrollbar="false">
        <template #header>
          <n-flex justify="space-between">
            {{ t('changeLog') }}
            <n-button type="primary" text @click="push('/docs/changelog')">
              {{ t('fullLog') }}
            </n-button>
          </n-flex>
        </template>
        <n-timeline>
          <n-timeline-item v-for="log in logs" :key="log.version" type="info">
            <template #header>
              <n-flex justify="space-between">
                <n-h3>
                  {{ log.version }}
                </n-h3>

                <n-tag
                  type="info"
                  size="small"
                  style="width: 86px; text-align: center"
                >
                  {{ log.date }}
                </n-tag>
              </n-flex>
            </template>
            <div
              v-for="item in log.changes"
              :key="item"
              v-html="renderMarkdown(item)"
            />
          </n-timeline-item>
        </n-timeline>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
