import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { NBaseIcon } from '../../_internal'
import {
  ArrowDownIcon,
  ChevronLeftIcon as ArrowLeftIcon,
  ChevronRightIcon as ArrowRightIcon,
  ArrowUpIcon
} from '../../_internal/icons'

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
    vertical: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function as PropType<(type: ButtonTypes, ev: Event) => void>
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (ev: Event) => {
      if (!props.disabled) {
        emit('click', props.type, ev)
      }
    }

    const renderIcon = () => {
      if (props.vertical) {
        if (props.type === 'next') {
          return <ArrowDownIcon />
        }
        return <ArrowUpIcon />
      }
      if (props.type === 'next') {
        return <ArrowRightIcon />
      }
      else {
        return <ArrowLeftIcon />
      }
    }

    return {
      renderIcon,
      handleClick
    }
  },
  render() {
    const {
      mergedClsPrefix,
      renderIcon,
      disabled,
      type,
      vertical,
      handleClick
    } = this

    return (
      <div
        class={[
          `${mergedClsPrefix}-tabs-nav-button`,
          !vertical
          && type === 'prev'
          && `${mergedClsPrefix}-tabs-nav-button--left`,
          !vertical
          && type === 'next'
          && `${mergedClsPrefix}-tabs-nav-button--right`,
          vertical
          && type === 'prev'
          && `${mergedClsPrefix}-tabs-nav-button--up`,
          vertical
          && type === 'next'
          && `${mergedClsPrefix}-tabs-nav-button--down`,
          disabled && `${mergedClsPrefix}-tabs-nav-button--disabled`
        ]}
        onClick={handleClick}
      >
        <NBaseIcon clsPrefix={mergedClsPrefix}>{renderIcon()}</NBaseIcon>
      </div>
    )
  }
})
