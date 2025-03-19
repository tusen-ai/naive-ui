import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { NBaseIcon } from '../../_internal'
import {
  ArrowDownIcon,
  ChevronLeftIcon as ArrowLeftIcon,
  ChevronRightIcon as ArrowRightIcon,
  ArrowUpIcon
} from '../../_internal/icons'
// import IconHover from '../_components/icon-hover.vue'

type ButtonTypes = 'prev' | 'next'

export default defineComponent({
  name: 'TabsButton',
  props: {
    type: {
      type: String as PropType<ButtonTypes>,
      default: 'next',
    },
    mergedClsPrefix: {
      type: String,
      required: true
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function as PropType<(type: ButtonTypes, ev: Event) => void>,
    },
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

    // const cls = computed(() => [
    //   prefixCls,
    //   {
    //     [`${prefixCls}-disabled`]: props.disabled,
    //     [`${prefixCls}-left`]:
    //       props.direction === 'horizontal' && props.type === 'previous',
    //     [`${prefixCls}-right`]:
    //       props.direction === 'horizontal' && props.type === 'next',
    //     [`${prefixCls}-up`]:
    //       props.direction === 'vertical' && props.type === 'previous',
    //     [`${prefixCls}-down`]:
    //       props.direction === 'vertical' && props.type === 'next',
    //   },
    // ])
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
      handleClick
    } = this

    return (
      <div
        class={[
          disabled && `${mergedClsPrefix}-tabs-nav-button--disabled`
        ]}
        onClick={handleClick}
      >
        <NBaseIcon clsPrefix={mergedClsPrefix}>
          {renderIcon()}
        </NBaseIcon>
      </div>
    )
  }
})
