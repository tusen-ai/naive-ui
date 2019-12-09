<template>
  <fade-in-height-expand-transition @after-leave="handleAfterLeave">
    <div
      v-if="visible"
      class="n-alert"
      :class="{
        [`n-alert--${type}-type`]: true,
        'n-alert--no-icon': showIcon === false,
        [`n-${synthesizedTheme}-theme`]: synthesizedTheme
      }"
      :style="synthesizedStyle"
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
          {{ title }}
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
import NIcon from '../../Icon'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import mdCheckmarkCircle from '../../../icons/md-checkmark-circle'
import mdAlert from '../../../icons/md-alert'
import mdInformationCircle from '../../../icons/md-information-circle'
import mdCloseCircle from '../../../icons/md-close-circle'
import mdClose from '../../../icons/md-close'
import FadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'

export default {
  name: 'NAlert',
  components: {
    NIcon,
    mdCheckmarkCircle,
    mdAlert,
    mdInformationCircle,
    mdCloseCircle,
    FadeInHeightExpandTransition,
    mdClose
  },
  mixins: [ withapp, themeable, asthemecontext ],
  props: {
    icon: {
      type: String,
      default: null
    },
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
      default: next => next()
    },
    onAfterClose: {
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
    close () {
      this.visible = false
    },
    handleCloseClick () {
      this.onClose(this.close)
    },
    handleAfterLeave () {
      console.log('after-leave')
      this.$emit('after-close')
    }
  }
}
</script>
