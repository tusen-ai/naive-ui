import { h, defineComponent, inject } from 'vue'
import { NScrollbar } from '../../scrollbar'
import { notificationProviderInjectionKey } from './NotificationProvider'

export default defineComponent({
  name: 'NotificationContainer',
  props: {
    scrollable: {
      type: Boolean,
      required: true
    }
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedThemeRef, cPrefixRef } = inject(
      notificationProviderInjectionKey
    )!
    return {
      mergedTheme: mergedThemeRef,
      cPrefix: cPrefixRef
    }
  },
  render () {
    const { $slots, scrollable, cPrefix, mergedTheme } = this
    return (
      <div
        class={[
          `${cPrefix}-notification-container`,
          scrollable && `${cPrefix}-notification-container--scrollable`
        ]}
      >
        {scrollable ? (
          <NScrollbar
            theme={mergedTheme.peers.Scrollbar}
            themeOverrides={mergedTheme.peerOverrides.Scrollbar}
          >
            {$slots}
          </NScrollbar>
        ) : (
          $slots
        )}
      </div>
    )
  }
})
