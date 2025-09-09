<markdown>
# Header and Footer

Set the header and footer of the bubble through the `header` and `footer` tree structure.
</markdown>

<script lang="ts" setup>
import { DislikeOutlined, LikeOutlined } from '@vicons/antd'
import { CopyOutline, Sync } from '@vicons/ionicons5'
</script>

<template>
  <n-bubble content="Hello, I'm the 07akioni. Basically... run!">
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
          Reload
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><CopyOutline /></n-icon>
              </template>
            </n-button>
          </template>
          Copy
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><LikeOutlined /></n-icon>
              </template>
            </n-button>
          </template>
          Like
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><DislikeOutlined /></n-icon>
              </template>
            </n-button>
          </template>
          UnLike
        </n-tooltip>
      </div>
    </template>
  </n-bubble>
</template>
