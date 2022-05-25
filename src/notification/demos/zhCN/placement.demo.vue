<markdown>
# 弹出位置
</markdown>

<template>
  <n-notification-provider :placement="placement">
    <placement-buttons @placement-change="handlePlacementChange" />
  </n-notification-provider>
</template>

<script lang="ts">
import { defineComponent, h, ref, PropType } from 'vue'
import {
  useNotification,
  NButton,
  NSpace,
  NotificationPlacement
} from 'naive-ui'

const PlacementButtons = defineComponent({
  props: {
    onPlacementChange: Function as PropType<
      (placement: NotificationPlacement) => void
    >
  },
  setup () {
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
  render () {
    return h(NSpace, null, {
      default: () =>
        this.placementList.map((item) =>
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
  setup () {
    const placementRef = ref<NotificationPlacement>('top-right')
    return {
      placement: placementRef,
      handlePlacementChange (val: NotificationPlacement) {
        placementRef.value = val
      }
    }
  }
})
</script>
