<template>
  <div
    :class="{
      [`n-${theme}-theme`]: theme,
      'n-notification--no-avatar': noAvatar,
      'n-notification--closable': closable,
      [`n-notification--${type}-type`]: type
    }"
    class="n-notification"
  >
    <div
      v-if="!noAvatar"
      class="n-notification__avatar"
    >
      <render v-if="avatar" :render="avatar" />
      <n-icon v-else>
        <md-information-circle v-if="type === 'info'" />
        <md-alert v-else-if="type === 'warning'" />
        <md-close-circle v-else-if="type === 'error'" />
        <md-checkmark-circle v-else-if="type === 'success'" />
      </n-icon>
    </div>
    <div
      v-if="closable"
      class="n-notification__close"
      @click="handleCloseClick"
    >
      <n-icon>
        <md-close />
      </n-icon>
    </div>
    <div
      ref="body"
      class="n-notification-main"
    >
      <div v-if="title" class="n-notification-main__header">
        <render :render="title" />
      </div>
      <div
        v-if="description"
        class="n-notification-main__description"
      >
        <render :render="description" />
      </div>
      <pre v-if="content" class="n-notification-main__content"><render :render="content" /></pre>
      <div v-if="meta || action" class="n-notification-main-footer">
        <div v-if="meta" class="n-notification-main-footer__meta">
          <render :render="meta" />
        </div>
        <div v-if="action" class="n-notification-main-footer__action">
          <render :render="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import NIcon from '../../Icon'
import mdClose from '../../../icons/md-close'
import mdCheckmarkCircle from '../../../icons/md-checkmark-circle'
import mdAlert from '../../../icons/md-alert'
import mdInformationCircle from '../../../icons/md-information-circle'
import mdCloseCircle from '../../../icons/md-close-circle'
import render from '../../../utils/render'

export default {
  components: {
    NIcon,
    mdClose,
    render,
    mdCheckmarkCircle,
    mdAlert,
    mdInformationCircle,
    mdCloseCircle
  },
  mixins: [ themeable, asthemecontext ],
  props: {
    closable: {
      type: Boolean,
      default: true
    },
    type: {
      validator (value) {
        return ['info', 'success', 'warning', 'error', 'default'].includes(value)
      },
      default: 'default'
    },
    avatar: {
      type: [Function],
      default: null
    },
    title: {
      type: [String, Function],
      default: null
    },
    description: {
      type: [String, Function],
      default: null
    },
    content: {
      type: [String, Function],
      default: null
    },
    meta: {
      type: [String, Function],
      default: null
    },
    action: {
      type: [Object, Function],
      default: null
    }
  },
  computed: {
    noAvatar () {
      return !(this.avatar || this.type !== 'default')
    }
  },
  methods: {
    handleCloseClick () {
      this.$emit('close')
    }
  }
}
</script>
