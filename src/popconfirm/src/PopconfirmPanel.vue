<template>
  <div
    class="n-popconfirm-content"
    :class="{
      'n-popconfirm-content--no-icon': !showIcon
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
          size="tiny"
          @click="handleNegativeClick"
        >
          {{ localizedNegativeText }}
        </n-button>
        <n-button
          size="tiny"
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
import NButton from '../../button'
import NIcon from '../../icon'
import WarningIcon from '../../_icons/md-alert.vue'
import locale from '../../_mixins/locale'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
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
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    positiveText: {
      type: String,
      default: null
    },
    negativeText: {
      type: String,
      default: null
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
      return this.positiveText || this.localeNamespace.positiveText
    },
    localizedNegativeText () {
      return this.negativeText || this.localeNamespace.negativeText
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
