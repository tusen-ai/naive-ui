<script setup lang="ts">
import type { Component } from 'vue'
import {
  CopyOutline,
  LinkOutline,
  LogoMarkdown,
  OpenOutline
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { computed } from 'vue'
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
  // route.path: /{locale}/{theme}/{category}/{slug}
  const parts = route.path.split('/').filter(Boolean)
  if (parts.length < 4)
    return null
  const [locale, , category, slug] = parts
  return `/${locale}/${category}/${slug}.md`
})

const fullMdUrl = computed(() => {
  if (!mdUrl.value)
    return null
  return `${window.location.origin}${mdUrl.value}`
})

interface MenuOption {
  label: string
  key: string
  icon: Component
}

const menuOptions = computed<MenuOption[]>(() => [
  {
    label: t('copyMarkdown'),
    key: 'copy-md',
    icon: LogoMarkdown
  },
  {
    label: t('copyMarkdownLink'),
    key: 'copy-link',
    icon: LinkOutline
  },
  {
    label: t('openInChatGPT'),
    key: 'open-chatgpt',
    icon: OpenOutline
  }
])

async function fetchMarkdown(): Promise<string | null> {
  if (!mdUrl.value)
    return null
  try {
    const res = await fetch(mdUrl.value)
    if (!res.ok)
      return null
    return await res.text()
  }
  catch {
    return null
  }
}

async function handleSelect(key: string) {
  switch (key) {
    case 'copy-md': {
      const content = await fetchMarkdown()
      if (content) {
        await navigator.clipboard.writeText(content)
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
        @click="handleSelect(option.key)"
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
