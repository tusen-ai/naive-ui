<markdown>
# Basic
</markdown>

<template>
  <n-page-header subtitle="A podcast to improve designs" @back="handleBack">
    <n-grid :cols="5">
      <n-gi>
        <n-statistic label="Episodes" value="125" />
      </n-gi>
      <n-gi>
        <n-statistic label="Guests" value="22" />
      </n-gi>
      <n-gi>
        <n-statistic label="Apologies" value="36" />
      </n-gi>
      <n-gi>
        <n-statistic label="Topics" value="83" />
      </n-gi>
      <n-gi>
        <n-statistic label="Reference Links" value="2,346" />
      </n-gi>
    </n-grid>
    <template #title>
      <a
        href="https://anyway.fm/"
        style="text-decoration: none; color: inherit"
      >
        Anyway.FM
      </a>
    </template>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item>Podcast</n-breadcrumb-item>
        <n-breadcrumb-item>Best Collection</n-breadcrumb-item>
        <n-breadcrumb-item>Ultimate Best Collection</n-breadcrumb-item>
        <n-breadcrumb-item>Anyway.FM</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #avatar>
      <n-avatar
        src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
      />
    </template>
    <template #extra>
      <n-space>
        <n-button>Refresh</n-button>
        <n-dropdown :options="options" placement="bottom-start">
          <n-button :bordered="false" style="padding: 0 4px">
            ···
          </n-button>
        </n-dropdown>
      </n-space>
    </template>
    <template #footer>
      As of April 3, 2021
    </template>
  </n-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleBack () {
        message.info('[onBack]')
      },
      options: [
        {
          label: 'More episodes',
          key: '1'
        },
        {
          label: 'More episodes',
          key: '2'
        },
        {
          label: 'More episodes',
          key: '3'
        }
      ]
    }
  }
})
</script>
