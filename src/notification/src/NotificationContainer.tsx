/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  defineComponent,
  inject,
  type PropType,
  ref,
  watchEffect
} from 'vue'
import { NScrollbar } from '../../_internal'
import { notificationProviderInjectionKey } from './context'
import type { NotificationPlacement } from './NotificationProvider'

export const NotificationContainer = defineComponent({
  name: 'NotificationContainer',
  props: {
    scrollable: {
      type: Boolean,
      required: true
    },
    placement: {
      type: String as PropType<NotificationPlacement>,
      required: true
    }
  },
  setup () {
    const { mergedThemeRef, mergedClsPrefixRef, wipTransitionCountRef } =
      inject(notificationProviderInjectionKey)!
    const selfRef = ref<HTMLElement | null>(null)
    watchEffect(() => {
      if (wipTransitionCountRef.value > 0) {
        selfRef?.value?.classList.add('transitioning')
      } else {
        selfRef?.value?.classList.remove('transitioning')
      }
    })
    return {
      selfRef,
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      transitioning: wipTransitionCountRef
    }
  },
  render () {
    const { $slots, scrollable, mergedClsPrefix, mergedTheme, placement } = this
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-notification-container`,
          scrollable && `${mergedClsPrefix}-notification-container--scrollable`,
          `${mergedClsPrefix}-notification-container--${placement}`
        ]}
      >
        {scrollable ? (
          <NScrollbar
            theme={mergedTheme.peers.Scrollbar}
            themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            contentStyle={{ overflow: 'hidden' }}
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
