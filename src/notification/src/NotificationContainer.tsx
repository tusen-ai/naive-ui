import { h, defineComponent, inject, renderSlot } from 'vue'
import { NScrollbar } from '../../scrollbar'
import { NotificationProviderInjection } from './NotificationProvider'

export default defineComponent({
  name: 'NotificationContainer',
  props: {
    scrollable: {
      type: Boolean,
      required: true
    }
  },
  setup () {
    return {
      NNotificationProvider: inject<NotificationProviderInjection>(
        'NNotificationProvider'
      ) as NotificationProviderInjection
    }
  },
  render () {
    const { $slots, scrollable, NNotificationProvider } = this
    return (
      <div
        class={[
          'n-notification-container',
          {
            'n-notification-container--scrollable': scrollable
          }
        ]}
      >
        {scrollable ? (
          <NScrollbar
            unstableTheme={NNotificationProvider.mergedTheme.peers.Scrollbar}
            unstableThemeOverrides={
              NNotificationProvider.mergedTheme.overrides.Scrollbar
            }
          >
            {$slots}
          </NScrollbar>
        ) : (
          renderSlot($slots, 'default')
        )}
      </div>
    )
  }
})
