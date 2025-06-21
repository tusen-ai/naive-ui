import type { CSSProperties, SlotsType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { BubbleTheme } from '../styles/light'
import type { BubbleSlots } from './public-types'
import { computed, defineComponent, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { NAvatar } from '../../avatar'
import bubbleLight from '../styles/light'
import { BubbleProps } from './public-types'
import style from './styles/index.cssr'

export const bubbleProps = {
  ...(useTheme.props as ThemeProps<BubbleTheme>),
  ...BubbleProps
}

export default defineComponent({
  name: 'Bubble',
  props: bubbleProps,
  slots: Object as SlotsType<BubbleSlots>,
  setup(props, $slots) {
    const { inlineThemeDisabled, mergedClsPrefixRef }
            = useConfig(props)
    const themeRef = useTheme(
      'Bubble',
      '-bubble',
      style,
      bubbleLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      return {

      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('bubble', undefined, cssVarsRef, props)
      : undefined

    return {
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
    }
  },
  render() {
    const {
      mergedClsPrefix,
      mergedTheme,
      $slots
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-bubble`,
          this.themeClass,
          this.placement === 'start' && `${mergedClsPrefix}-bubble--start`,
          this.placement === 'end' && `${mergedClsPrefix}-bubble--end`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {/* avatar */}
        {
          !$slots.avatar && this.avatar && (
            <div
              class={[
                `${mergedClsPrefix}-bubble__avatar`,
              ]}
            >
              <NAvatar
                src={this.avatar}
                theme={mergedTheme.peers.Avatar}
                themeOverrides={mergedTheme.peerOverrides.Avatar}
              />
            </div>
          )
        }
        {/* {
                    !$slots.avatar && !this.avatar && (
                        <div class={[
                            `${mergedClsPrefix}-bubble__avatar`,
                            `${mergedClsPrefix}-bubble__avatar--placeholder`
                        ]}></div>
                    )
                } */}
        {
          $slots.avatar && ($slots.avatar())
        }

        {/* content */}
        <div
          class={[
            `${mergedClsPrefix}-bubble__content-wrapper`
          ]}
        >
          {
            $slots.header && (
              <div
                class={[
                  `${mergedClsPrefix}-bubble__header`
                ]}
              >
                {$slots.header()}
              </div>
            )
          }
          <div
            class={[
              `${mergedClsPrefix}-bubble__content`,
              `${mergedClsPrefix}-bubble__content--${this.variant}`,
              this.shape && `${mergedClsPrefix}-bubble__content--${this.shape}`
            ]}
          >
            {this.content}
          </div>
          {
            $slots.footer && (
              <div
                class={[
                  `${mergedClsPrefix}-bubble__footer`
                ]}
              >
                {$slots.footer()}
              </div>
            )
          }
        </div>
      </div>
    )
  }
})
