<template>
  <fade-in-height-expand-transition @after-leave="handleAfterLeave">
    <div
      v-if="visible"
      class="n-alert"
      :class="{
        [`n-alert--${type}-type`]: true,
        'n-alert--no-icon': showIcon === false,
        [`n-${syntheticTheme}-theme`]: syntheticTheme
      }"
      :style="{
        ...syntheticStyle
      }"
    >
      <div v-if="closable" class="n-alert__close" @click="handleCloseClick">
        <n-icon>
          <md-close />
        </n-icon>
      </div>
      <div
        v-if="showIcon"
        class="n-alert__icon"
      >
        <n-icon v-if="$slots.icon">
          <slot
            name="icon"
          />
        </n-icon>
        <n-icon
          v-else-if="type==='success'"
        >
          <md-checkmark-circle />
        </n-icon>
        <n-icon
          v-else-if="type==='info'"
        >
          <md-information-circle />
        </n-icon>
        <n-icon
          v-else-if="type==='warning'"
        >
          <md-alert />
        </n-icon>
        <n-icon
          v-else-if="type==='error'"
        >
          <md-close-circle />
        </n-icon>
      </div>
      <div class="n-alert-body">
        <div
          v-if="title !== null"
          class="n-alert-body__title"
        >
          <slot name="header">
            {{ title }}
          </slot>
        </div>
        <div
          v-if="$slots.default"
          class="n-alert-body__content"
        >
          <slot />
        </div>
      </div>
    </div>
  </fade-in-height-expand-transition>
</template>

<script>
import NIcon from '../../icon'
import FadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

// icons
import mdCheckmarkCircle from '../../_icons/md-checkmark-circle'
import mdAlert from '../../_icons/md-alert'
import mdInformationCircle from '../../_icons/md-information-circle'
import mdCloseCircle from '../../_icons/md-close-circle'
import mdClose from '../../_icons/md-close'

export default {
  name: 'Alert',
  emits: [
    'leave',
    'after-leave',
    // legacy
    'close',
    'after-hide'
  ],
  components: {
    NIcon,
    mdCheckmarkCircle,
    mdAlert,
    mdInformationCircle,
    mdCloseCircle,
    FadeInHeightExpandTransition,
    mdClose
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    title: {
      type: String,
      default: null
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    type: {
      validator (type) {
        return ['info', 'warning', 'error', 'success', 'default'].includes(type)
      },
      default: 'default'
    },
    closable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => true
    },
    onAfterHide: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.$emit('leave')
      this.visible = false
      // legacy
      this.$emit('close')
    },
    handleCloseClick () {
      Promise
        .resolve(this.onClose())
        .then(result => {
          if (result === false) return
          this.close()
        })
    },
    handleAfterLeave () {
      this.$emit('after-leave')
      // legacy
      this.$emit('after-hide')
    }
  }
}
</script>
