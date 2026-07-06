<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { lyla } from '@lylajs/web'
import {
  CopyOutline,
  LinkOutline,
  LogoMarkdown,
  OpenOutline
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { i18n } from './composables'

const route = useRoute()
const message = useMessage()

const { t } = i18n({
  'zh-CN': {
    copyMarkdown: '复制 Markdown',
    copyMarkdownLink: '复制 Markdown 链接',
    openInChatGPT: '在 ChatGPT 中打开',
    copySuccess: '已复制到剪贴板',
    copyFailed: '复制失败',
    fetchFailed: '获取 Markdown 内容失败'
  },
  'en-US': {
    copyMarkdown: 'Copy Markdown',
    copyMarkdownLink: 'Copy Markdown Link',
    openInChatGPT: 'Open in ChatGPT',
    copySuccess: 'Copied to clipboard',
    copyFailed: 'Failed to copy',
    fetchFailed: 'Failed to fetch Markdown content'
  }
})

const mdUrl = computed(() => {
  // route.path: /{locale}/{:theme}/{category}/{slug}
  // strip theme segment for canonical markdown URL
  return `${route.path.replace(/\/(os-theme|light|dark)\//, '/')}.md`
})

const fullMdUrl = computed(() => {
  if (!mdUrl.value)
    return null
  return `${window.location.origin}${mdUrl.value}`
})

const menuOptions = computed<MenuOption[]>(() => [
  {
    label: t('copyMarkdown'),
    key: 'copy-md',
    icon: () => h(LogoMarkdown)
  },
  {
    label: t('copyMarkdownLink'),
    key: 'copy-link',
    icon: () => h(LinkOutline)
  },
  {
    label: t('openInChatGPT'),
    key: 'open-chatgpt',
    icon: () => h(OpenOutline)
  }
])

async function fetchMarkdown(): Promise<string | null> {
  const { value: url } = mdUrl
  if (!url)
    return null
  try {
    const { body } = await lyla({ url, responseType: 'text' })
    return body
  }
  catch {
    return null
  }
}

async function handleSelect(key: string) {
  switch (key) {
    case 'copy-md': {
      const markdown = await fetchMarkdown()
      if (markdown) {
        await navigator.clipboard.writeText(markdown)
        message.success(t('copySuccess'))
      }
      else {
        message.error(t('fetchFailed'))
      }
      break
    }
    case 'copy-link': {
      await navigator.clipboard.writeText(fullMdUrl.value ?? '')
      message.success(t('copySuccess'))
      break
    }
    case 'open-chatgpt': {
      const prompt = encodeURIComponent(
        `Please read the following documentation and answer my questions:\n${fullMdUrl.value}`
      )
      window.open(`https://chatgpt.com/?q=${prompt}`, '_blank')
      break
    }
  }
}
</script>

<template>
  <n-popover trigger="click" placement="bottom" :show-arrow="false">
    <template #trigger>
      <n-button
        quaternary
        size="tiny"
        :theme-overrides="{ paddingTiny: '4px', heightTiny: '22px' }"
      >
        <template #icon>
          <n-icon>
            <CopyOutline />
          </n-icon>
        </template>
      </n-button>
    </template>
    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin: -8px -14px;
      "
    >
      <n-button
        v-for="option in menuOptions"
        :key="option.key"
        text
        size="small"
        style="justify-content: flex-start; padding: 6px 12px; width: 100%"
        @click="handleSelect(option.key as string)"
      >
        <template #icon>
          <n-icon :size="16">
            <component :is="option.icon" />
          </n-icon>
        </template>
        {{ option.label }}
      </n-button>
    </div>
  </n-popover>
</template>
