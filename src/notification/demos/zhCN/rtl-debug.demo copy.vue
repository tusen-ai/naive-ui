<markdown>
# Rtl Debug

</markdown>

<template>
  <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
    <n-notification-provider>
      <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
      <n-space>
        <n-space>
          <n-button @click="notify('info')">
            Info
          </n-button>
          <!-- <n-button @click="handleClick1">
            Wouldn't it be Nice
          </n-button>
          <n-button @click="handleClick2">
            Satisfaction
          </n-button> -->
        </n-space>
      </n-space>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useNotification, NotificationType, NAvatar, NButton } from 'naive-ui'
import { notificationRtl } from '../../styles'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      notify (type: NotificationType) {
        notification[type]({
          content: 'What to say?',
          meta: "I don't know"
        })
      },
      handleClick1 () {
        notification.create({
          title: "Wouldn't it be Nice",
          description: 'From the Beach Boys',
          content: `Wouldn't it be nice if we were older
Then we wouldn't have to wait so long
And wouldn't it be nice to live together
In the kind of world where we belong
You know its gonna make it that much better
When we can say goodnight and stay together
Wouldn't it be nice if we could wake up
In the morning when the day is new
And after having spent the day together
Hold each other close the whole night through`,
          meta: '2019-5-27 15:11',
          avatar: () =>
            h(NAvatar, {
              size: 'small',
              round: true,
              src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
            })
        })
      },
      handleClick2 () {
        const n = notification.create({
          title: 'Satisfaction',
          content: `I cant get no satisfaction
I cant get no satisfaction
Cause I try and I try and I try and I try
I cant get no, I cant get no`,
          meta: '2019-5-27 15:11',
          action: () =>
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: () => {
                  n.destroy()
                }
              },
              {
                default: () => '已读'
              }
            )
        })
      },
      rtlEnabled: ref(false),
      rtlStyles: [notificationRtl]
    }
  }
})
</script>
