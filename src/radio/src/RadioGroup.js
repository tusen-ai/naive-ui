import { h } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import hollowoutable from '../../_mixins/hollowoutable'
import asformitem from '../../_mixins/asformitem'
import { getSlot, flatten } from '../../_utils/vue'
import { warn } from '../../_utils/naive/warn'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/radio-group/index.js'

function mapSlot (h, defaultSlot, groupInstance) {
  const children = []
  let isButtonGroup = false
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i]
    const instanceOptions = wrappedInstance.type
    const name = instanceOptions.name
    if (
      __DEV__ && (
        !instanceOptions ||
        !['Radio', 'RadioButton'].includes(name)
      )
    ) {
      warn('radio-group', '`n-radio-group` only taks `n-radio` and `n-radio-button` as children.')
      continue
    }
    const instanceProps = wrappedInstance.props
    if (name === 'RadioButton') {
      isButtonGroup = true
    }
    if (i === 0 || name === 'Radio') {
      children.push(wrappedInstance)
    } else {
      const lastInstanceProps = children[children.length - 1].props
      const lastInstanceChecked = groupInstance.$props.value === lastInstanceProps.value
      const lastInstanceDisabled = lastInstanceProps.disabled
      const currentInstanceChecked = groupInstance.$props.value === instanceProps.value
      const currentInstanceDisabled = instanceProps.disabled
      let lastInstancePriority
      let currentInstancePriority
      if (groupInstance.syntheticTheme === 'dark') {
        /**
         * Priority of button splitor:
         * !disabled  checked >
         * !disabled !checked >
         *  disabled  checked >
         *  disabled !checked
         */
        lastInstancePriority = (!lastInstanceDisabled ? 2 : 0) + (lastInstanceChecked ? 1 : 0)
        currentInstancePriority = (!currentInstanceDisabled ? 2 : 0) + (currentInstanceChecked ? 1 : 0)
      } else {
        /**
         * Priority of button splitor:
         * !disabled  checked >
         *  disabled  checked >
         * !disabled !checked >
         *  disabled !checked
         */
        lastInstancePriority = (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0)
        currentInstancePriority = (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0)
      }
      const lastInstanceClass = {
        'n-radio-group__splitor--disabled': lastInstanceDisabled,
        'n-radio-group__splitor--checked': lastInstanceChecked
      }
      const currentInstanceClass = {
        'n-radio-group__splitor--disabled': currentInstanceDisabled,
        'n-radio-group__splitor--checked': currentInstanceChecked
      }
      const splitorClass = lastInstancePriority < currentInstancePriority
        ? currentInstanceClass
        : lastInstanceClass
      children.push(h('div', {
        class: [
          'n-radio-group__splitor',
          splitorClass
        ]
      }), wrappedInstance)
    }
  }
  return {
    children,
    isButtonGroup
  }
}

export default {
  name: 'RadioGroup',
  cssrName: 'Radio',
  cssrId: 'RadioGroup',
  mixins: [
    withapp,
    themeable,
    hollowoutable,
    usecssr(styles),
    asformitem()
  ],
  props: {
    name: {
      type: String,
      default: null
    },
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) warn('radio-group', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  data () {
    return {
      transitionDisabled: true
    }
  },
  mounted () {
    if (this.isButtonGroup) {
      this.$nextTick().then(() => {
        this.transitionDisabled = false
      })
    }
  },
  provide () {
    return {
      NRadioGroup: this
    }
  },
  render () {
    const {
      children,
      isButtonGroup
    } = mapSlot(h, flatten(getSlot(this)), this)
    this.isButtonGroup = isButtonGroup
    return h('div', {
      class: [
        'n-radio-group',
        {
          [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
          [`n-radio-group--${this.mergedSize}-size`]: this.mergedSize,
          [`n-radio-group--button-group`]: isButtonGroup,
          [`n-radio-group--transition-disabled`]: isButtonGroup && this.transitionDisabled
        }
      ]
    }, children)
  }
}
