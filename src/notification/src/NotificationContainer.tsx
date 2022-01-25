import { h, defineComponent, inject, PropType } from 'vue'
import { NScrollbar } from '../../_internal'
import { notificationProviderInjectionKey } from './NotificationProvider'

export default defineComponent({
  name: 'NotificationContainer',
  props: {
    scrollable: {
      type: Boolean,
      required: true
    },
    placement: {
      type: String as PropType<
      'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
      >,
      required: true
    },
    top: {
      type: String,
      required: true
    },
    bottom: {
      type: String,
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
    const {
      $slots,
      scrollable,
      mergedClsPrefix,
      mergedTheme,
      placement,
      top,
      bottom
    } = this
    const cssStyle = { top: `${parseInt(bottom) > 0 ? 'auto' : top}`, bottom }
    return (
      <div
        class={[
          `${mergedClsPrefix}-notification-container`,
          scrollable && `${mergedClsPrefix}-notification-container--scrollable`,
          `${mergedClsPrefix}-notification-container--${placement}`
        ]}
        style={cssStyle}
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
