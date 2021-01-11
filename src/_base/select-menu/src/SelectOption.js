import { h, inject, toRef, defineComponent, Transition } from 'vue'
import { useMemo } from 'vooks'
import { CheckmarkIcon } from '../../icons'
import NBaseIcon from '../../icon'

const checkMark = h(NBaseIcon, null, {
  default: () => h(CheckmarkIcon)
})

function renderCheckMark (show) {
  return h(
    Transition,
    {
      name: 'n-fade-in-scale-up-transition',
      class: 'n-base-select-option__check'
    },
    {
      default: () => (show ? checkMark : null)
    }
  )
}

export default defineComponent({
  name: 'NBaseSelectOption',
  inject: {
    NBaseSelectMenu: {
      default: null
    }
  },
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const NBaseSelectMenu = inject('NBaseSelectMenu')
    const rawNodeRef = toRef(props.tmNode, 'rawNode')
    return {
      NBaseSelectMenu,
      rawNode: rawNodeRef,
      isGrouped: useMemo(() => {
        const { tmNode } = props
        const { parent } = tmNode
        return parent && parent.rawNode.type === 'group'
      }),
      isPending: useMemo(() => {
        const { pendingTmNode } = NBaseSelectMenu
        if (!pendingTmNode) return false
        return props.tmNode.key === pendingTmNode.key
      }),
      isSelected: useMemo(() => {
        const { multiple, value } = NBaseSelectMenu
        if (value === null) return false
        const optionValue = rawNodeRef.value.value
        if (multiple) {
          const { valueSet } = NBaseSelectMenu
          return valueSet.has(optionValue)
        } else {
          return value === optionValue
        }
      })
    }
  },
  methods: {
    handleClick (e) {
      const { tmNode } = this
      if (tmNode.disabled) return
      this.NBaseSelectMenu.handleOptionClick(e, tmNode)
    },
    handleMouseEnter (e) {
      const { tmNode } = this
      if (tmNode.disabled) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, tmNode)
    },
    handleMouseMove (e) {
      const { tmNode, isPending } = this
      if (tmNode.disabled || isPending) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, tmNode)
    }
  },
  render () {
    const {
      rawNode,
      isSelected,
      isPending,
      isGrouped,
      handleClick,
      handleMouseEnter,
      handleMouseMove,
      NBaseSelectMenu: { multiple }
    } = this
    const showCheckMark = multiple & isSelected
    const children = rawNode.render
      ? [rawNode.render(rawNode, isSelected), renderCheckMark(showCheckMark)]
      : [rawNode.label, renderCheckMark(showCheckMark)]
    return h(
      'div',
      {
        class: [
          'n-base-select-option',
          [
            rawNode.class,
            {
              'n-base-select-option--disabled': rawNode.disabled,
              'n-base-select-option--selected': isSelected,
              'n-base-select-option--grouped': isGrouped,
              'n-base-select-option--pending': isPending
            }
          ]
        ],
        style: rawNode.style,
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseMove: handleMouseMove
      },
      children
    )
  }
})
