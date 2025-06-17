<script setup>
import { format } from 'date-fns'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { i18n } from './composables'

const owner = 'tusen-ai'
const repo = 'naive-ui'
const route = useRoute()
const contributors = ref([])
const lastCommitTime = ref(0)

function filterData(data) {
  const arr = []
  data.forEach((item) => {
    if (
      !!item.author?.login
      || !!item.author?.html_url
      || !!item.author?.avatar_url
    ) {
      lastCommitTime.value = Math.max(
        lastCommitTime.value,
        +new Date(item.commit.author.date)
      )

      arr.push({
        login: item.author.login,
        url: item.author.html_url,
        avatar: item.author.avatar_url
      })
    }
  })
  contributors.value = [
    ...new Map(arr.map(item => [item.login, item])).values()
  ]
}

async function getContributors() {
  const path = route.path
  const parts = path.split('/')
  const componentName = parts[4]
  if (!componentName)
    return
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=/src/${componentName}`
  try {
    const req = await fetch(url)
    const res = await req.json()
    filterData(res)
  }
  catch {
    return null
  }
}

const locales = {
  'zh-CN': {
    title: '文档贡献者：',
    lastCommitTime: '最后更新',
    thanksMessage: '感谢所有贡献者的辛勤付出！'
  },
  'en-US': {
    title: 'Contributor: ',
    lastCommitTime: 'Last updated',
    thanksMessage: 'Thank you to all contributors for your hard work!'
  }
}
// i18n
const { t } = i18n(locales)

watchEffect(() => {
  getContributors()
})
</script>

<template>
  <n-card
    v-if="route.path.includes('/components/') && contributors.length > 0"
    class="contributors-container"
  >
    <div class="contributors-header">
      <h2 class="contributors-title">
        {{ t('title') }}
      </h2>
      <div class="contributors-meta">
        <span class="contributors-time">
          {{ t('lastCommitTime') }}:
          {{ format(lastCommitTime, 'yyyy-MM-dd HH:mm:ss') }}
        </span>
      </div>
    </div>
    <div class="contributors-thanks">
      <span>{{ t('thanksMessage') }}</span>
    </div>
    <div class="contributors-list">
      <n-tooltip
        v-for="item in contributors"
        :key="item.login"
        trigger="hover"
        placement="top"
        :show-arrow="true"
      >
        <template #trigger>
          <a :href="item.url" target="_blank" class="contributor-item">
            <n-avatar
              :src="item.avatar"
              size="small"
              border-radius="50%"
              :border="true"
              border-color="#e5e7eb"
            />
          </a>
        </template>
        {{ item.login }}
      </n-tooltip>
    </div>
  </n-card>
</template>

<style scoped>
.contributors-container {
  background-color: #ffffff;
  border-radius: 8px;
  margin-top: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.contributors-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.contributors-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.contributors-meta {
  font-size: 12px;
  color: #6b7280;
}

.contributors-time {
  display: flex;
  align-items: center;
}

.contributors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.contributor-item {
  display: block;
  transition: transform 0.2s ease;
}

.contributor-item:hover {
  transform: scale(1.1);
}

.contributors-thanks {
  padding-top: 12px;
  padding-bottom: 12px;
  border-top: 1px solid #f3f4f6;
}

.contributors-thanks span {
  font-size: 13px;
  color: #6b7280;
}
</style>
