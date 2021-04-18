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
    const { mergedThemeRef, mergedClsPrefixRef } = inject(
      notificationProviderInjectionKey
    )!
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { $slots, scrollable, mergedClsPrefix, mergedTheme } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-notification-container`,
          scrollable && `${mergedClsPrefix}-notification-container--scrollable`
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
