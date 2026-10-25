<script lang="ts">
import type { DropdownOption } from 'naive-ui'
import CopyIcon from '@vicons/fluent/Copy16Regular.js'
import LinkIcon from '@vicons/fluent/Link16Regular.js'
import OpenIcon from '@vicons/fluent/Open16Regular.js'
import { NIcon, useMessage } from 'naive-ui'
import { computed, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { i18n } from './composables'

// The page as Markdown, built by build/vite-plugin-llms.ts
export default defineComponent({
  name: 'CopyMarkdownButton',
  components: {
    CopyIcon
  },
  setup() {
    const route = useRoute()
    const message = useMessage()
    const { t } = i18n({
      'zh-CN': {
        copyPage: '复制为 Markdown',
        copyLink: '复制 Markdown 链接',
        open: '查看 Markdown',
        copied: '已复制',
        failed: '复制失败'
      },
      'en-US': {
        copyPage: 'Copy page as Markdown',
        copyLink: 'Copy Markdown link',
        open: 'View as Markdown',
        copied: 'Copied',
        failed: 'Copy failed'
      }
    })
    const markdownUrlRef = computed(
      () => new URL(`${route.path}.md`, window.location.origin).href
    )
    const renderIcon = (icon: typeof CopyIcon) => () =>
      h(NIcon, null, { default: () => h(icon) })
    const optionsRef = computed<DropdownOption[]>(() => [
      { key: 'copy-page', label: t('copyPage'), icon: renderIcon(CopyIcon) },
      { key: 'copy-link', label: t('copyLink'), icon: renderIcon(LinkIcon) },
      { key: 'open', label: t('open'), icon: renderIcon(OpenIcon) }
    ])
    async function copy(getText: () => Promise<string> | string) {
      try {
        await navigator.clipboard.writeText(await getText())
        message.success(t('copied'))
      }
      catch {
        message.error(t('failed'))
      }
    }
    function handleSelect(key: string) {
      const url = markdownUrlRef.value
      if (key === 'copy-page') {
        copy(async () => {
          const response = await fetch(url)
          if (!response.ok)
            throw new Error(response.statusText)
          return response.text()
        })
      }
      else if (key === 'copy-link') {
        copy(() => url)
      }
      else {
        window.open(url, '_blank')
      }
    }
    return {
      t,
      options: optionsRef,
      handleSelect
    }
  }
})
</script>

<template>
  <n-dropdown
    trigger="click"
    placement="bottom-start"
    :options="options"
    @select="handleSelect"
  >
    <n-button
      class="edit-button"
      quaternary
      size="tiny"
      :aria-label="t('copyPage')"
      :theme-overrides="{ paddingTiny: '4px', heightTiny: '14px' }"
    >
      <template #icon>
        <n-icon>
          <CopyIcon />
        </n-icon>
      </template>
    </n-button>
  </n-dropdown>
</template>
