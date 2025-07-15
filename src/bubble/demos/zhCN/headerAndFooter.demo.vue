<markdown>
# 头和尾

通过 `header` 和 `footer` 树形设置气泡的头部和底部。
</markdown>

<script lang="ts" setup>
import { DislikeOutlined, LikeOutlined } from '@vicons/antd'
import { CopyOutline, Sync } from '@vicons/ionicons5'
</script>

<template>
  <n-bubble
    content="两者在生产环境的最终产物差异较小，但开发体验的差距较大，选择时需根据团队需求和项目规模权衡。"
  >
    <template #avatar>
      <n-avatar
        round
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </template>
    <template #header>
      <span>07akioni</span>
    </template>
    <template #footer>
      <div style="display: flex; gap: 2px">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><Sync /></n-icon>
              </template>
            </n-button>
          </template>
          重新生成
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><CopyOutline /></n-icon>
              </template>
            </n-button>
          </template>
          复制
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><LikeOutlined /></n-icon>
              </template>
            </n-button>
          </template>
          喜欢
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><DislikeOutlined /></n-icon>
              </template>
            </n-button>
          </template>
          不喜欢
        </n-tooltip>
      </div>
    </template>
  </n-bubble>
</template>
