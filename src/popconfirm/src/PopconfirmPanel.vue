<template>
  <div
    class="n-popconfirm-content"
    :class="{
      'n-popconfirm-content--show-icon': showIcon
    }"
  >
    <div class="n-popconfirm-content__body">
      <slot
        v-if="showIcon"
        name="icon"
      >
        <n-icon>
          <warning-icon />
        </n-icon>
      </slot>
      <slot />
    </div>
    <div class="n-popconfirm-content__action">
      <slot name="action">
        <n-button
          size="small"
          @click="handleNegativeClick"
        >
          {{ localizedNegativeText }}
        </n-button>
        <n-button
          size="small"
          type="primary"
          @click="handlePositiveClick"
        >
          {{ localizedPositiveText }}
        </n-button>
      </slot>
    </div>
  </div>
</template>

<script>
import { NButton } from '../../button'
import { NIcon } from '../../icon'
import {
  WarningIcon
} from '../../_base/icons'
import {
  configurable,
  themeable,
  locale,
  withCssr
} from '../../_mixins'
import styles from './styles'

export default {
  name: 'NPopconfirmPanel',
  cssrName: 'Popconfirm',
  components: {
    NButton,
    NIcon,
    WarningIcon
  },
  mixins: [
    locale('Popconfirm'),
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    positiveText: {
      type: String,
      default: undefined
    },
    negativeText: {
      type: String,
      default: undefined
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    onPositiveClick: {
      type: Function,
      required: true
    },
    onNegativeClick: {
      type: Function,
      required: true
    }
  },
  computed: {
    localizedPositiveText () {
      return this.positiveText || this.localeNs.positiveText
    },
    localizedNegativeText () {
      return this.negativeText || this.localeNs.negativeText
    }
  },
  methods: {
    handlePositiveClick () {
      this.onPositiveClick()
    },
    handleNegativeClick () {
      this.onNegativeClick()
    }
  }
}
</script>
