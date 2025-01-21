<script lang="ts">
import type { ButtonProps } from 'naive-ui'
import type { PropType } from 'vue'
import HistoryIcon from '@vicons/fluent/History16Regular.js'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import zhCN from '../../components-changelog-cn.json'
import enUS from '../../components-changelog-en.json'

export default defineComponent({
  name: 'ChangeLogButton',
  components: {
    HistoryIcon
  },
  props: {
    text: Boolean,
    id: String,
    quaternary: Boolean,
    size: {
      type: String as PropType<ButtonProps['size']>,
      default: 'tiny'
    }
  },
  setup(props) {
    const route = useRoute()
    const isCN = route.path.startsWith('/zh-CN')
    const componentName = `n-${props.id?.split('-')?.[1]}`.toLocaleLowerCase()
    const logs = isCN ? zhCN[componentName] : enUS[componentName]
    const drawerRef = ref(false)
    return { logs, drawerRef }
  }
})
</script>

<template>
  <div>
    <n-button
      class="edit-button"
      :theme-overrides="
        quaternary
          ? {
            paddingTiny: '4px',
            heightTiny: '14px',
          }
          : undefined
      "
      :quaternary="quaternary"
      :text="!quaternary"
      :size="size"
      @click="drawerRef = true"
    >
      <template #icon>
        <n-icon>
          <HistoryIcon />
        </n-icon>
      </template>
    </n-button>
    <n-drawer v-model:show="drawerRef" :style="{ width: '40vw' }" resizable>
      <n-drawer-content>
        <n-timeline>
          <n-timeline-item v-for="log in logs" :key="log.version" type="info">
            <template #header>
              <n-flex justify="space-between">
                <n-h3>
                  {{ log.version }}
                </n-h3>

                <n-tag type="info" size="small">
                  {{ log.date }}
                </n-tag>
              </n-flex>
            </template>
            <li
              v-for="item in log.changes"
              :key="item.version"
              style="list-style: circle"
            >
              {{ item }}
            </li>
          </n-timeline-item>
        </n-timeline>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
