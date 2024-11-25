<markdown>
# 弹出位置
</markdown>

<script lang="ts">
import type { NotificationPlacement } from 'naive-ui'
import type { PropType } from 'vue'
import { NButton, NSpace, useNotification } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

const PlacementButtons = defineComponent({
  props: {
    onPlacementChange: Function as PropType<
      (placement: NotificationPlacement) => void
    >
  },
  setup() {
    const notification = useNotification()
    const placementList = [
      { placement: 'top-left', text: '左上' },
      { placement: 'top-right', text: '右上' },
      { placement: 'bottom-left', text: '左下' },
      { placement: 'bottom-right', text: '右下' },
      { placement: 'bottom', text: '下' },
      { placement: 'top', text: '上' }
    ] as const
    return {
      notification,
      placementList
    }
  },
  render() {
    return h(NSpace, null, {
      default: () =>
        this.placementList.map(item =>
          h(
            NButton,
            {
              onClick: () => {
                this.onPlacementChange?.(item.placement)
                this.notification.info({
                  title: item.placement,
                  content: 'You can change the placement'
                })
              }
            },
            { default: () => item.text }
          )
        )
    })
  }
})

export default defineComponent({
  components: {
    PlacementButtons
  },
  setup() {
    const placementRef = ref<NotificationPlacement>('top-right')
    return {
      placement: placementRef,
      handlePlacementChange(val: NotificationPlacement) {
        placementRef.value = val
      }
    }
  }
})
</script>

<template>
  <n-notification-provider :placement="placement">
    <PlacementButtons @placement-change="handlePlacementChange" />
  </n-notification-provider>
</template>
