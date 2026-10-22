import type { PropType } from 'vue'
import type { ExtractThemeOverrides } from '../../_mixins/use-theme'
import type { ButtonTheme } from '../../button/styles'
import { defineComponent, h } from 'vue'
import { NBaseIcon } from '../../_internal'
import {
  ChevronLeftIcon as ArrowLeftIcon,
  ChevronRightIcon as ArrowRightIcon
} from '../../_internal/icons'
import { NButton } from '../../button'

type ButtonTypes = 'prev' | 'next'

export default defineComponent({
  name: 'TabsButton',
  props: {
    type: {
      type: String as PropType<ButtonTypes>,
      default: 'next'
    },
    mergedClsPrefix: {
      type: String,
      required: true
    },
    vertical: Boolean,
    disabled: Boolean,
    rtl: Boolean,
    theme: Object as PropType<ButtonTheme>,
    themeOverrides: Object as PropType<ExtractThemeOverrides<ButtonTheme>>,
    onClick: Function as PropType<(type: ButtonTypes) => void>
  },
  setup(props) {
    const handleClick = () => {
      if (!props.disabled) {
        props.onClick?.(props.type)
      }
    }

    return {
      handleClick
    }
  },
  render() {
    const {
      mergedClsPrefix,
      disabled,
      type,
      vertical,
      rtl,
      theme,
      themeOverrides,
      handleClick
    } = this

    const isNext = type === 'next'
    const showRightIcon = vertical ? isNext : rtl ? !isNext : isNext

    return (
      <NButton
        text
        disabled={disabled}
        size="small"
        theme={theme}
        themeOverrides={themeOverrides}
        onClick={handleClick}
        class={[
          `${mergedClsPrefix}-tabs-scroll-button`,
          !vertical
          && type === 'prev'
          && `${mergedClsPrefix}-tabs-scroll-button--start`,
          !vertical
          && type === 'next'
          && `${mergedClsPrefix}-tabs-scroll-button--end`,
          vertical
          && type === 'prev'
          && `${mergedClsPrefix}-tabs-scroll-button--up`,
          vertical
          && type === 'next'
          && `${mergedClsPrefix}-tabs-scroll-button--down`
        ]}
      >
        {{
          icon: () => (
            <NBaseIcon
              clsPrefix={mergedClsPrefix}
              style={vertical ? { transform: 'rotate(90deg)' } : undefined}
            >
              {{
                default: () =>
                  showRightIcon ? <ArrowRightIcon /> : <ArrowLeftIcon />
              }}
            </NBaseIcon>
          )
        }}
      </NButton>
    )
  }
})
