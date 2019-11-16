<template>
  <div
    class="n-nimbus-form-card"
    :style="{width: width + 'px'}"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div
      ref="body"
      class="n-nimbus-form-card__body"
    >
      <div
        ref="header"
        class="n-nimbus-form-card__header"
        :class="{
          'n-nimbus-form-card__header--sticky': sticky
        }"
      >
        <slot name="header">
          <span class="n-nimbus-form-card__title">{{ title }}</span>
        </slot>
        <div class="n-nimbus-form-card__right-header">
          <div
            v-if="closable"
            class="n-nimbus-form-card__deactivator"
            @click="deactivate"
          />
        </div>
        <div class="n-nimbus-form-card__divider" />
      </div>
      <div class="n-nimbus-form-card__content">
        <slot name="content" />
      </div>
      <div
        v-if="$slots.footer"
        ref="footer"
        class="n-nimbus-form-card__footer"
        :class="{
          'n-nimbus-form-card__footer--sticky': sticky
        }"
      >
        <div class="n-nimbus-form-card__divider" />
        <div class="nimbus-form-card__footer nimbus-form-card__actions">
          <slot name="footer" />
        </div>
      </div>
      <div
        v-else
        style="padding-bottom: 26px;"
      />
    </div>
  </div>
</template>

<script>
import withapp from '../mixins/withapp'
import themeable from '../mixins/themeable'

export default {
  name: 'NForm',
  mixins: [withapp, themeable],
  props: {
    width: {
      type: [Number, String],
      default: 900
    },
    title: {
      type: String,
      default: 'Form'
    },
    sticky: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (this.sticky) {
      this.patchOverflow(300)
    }
  },
  beforeDestroy () {
    if (this.sticky) {
      this.patchOverflow()
    }
  },
  methods: {
    patchOverflow (timeout = null) {
      const body = this.$refs.body
      const bodyHeight = body.offsetHeight
      const footer = this.$refs.footer
      if (footer) {
        const footerTop = footer.offsetTop
        const footerHeight = footer.offsetHeight
        const footerPatchTop = footerTop + footerHeight
        const footerPatchHeight = bodyHeight - footerPatchTop
        const footerPatch = document.createElement('div')
        footerPatch.style.width = '100%'
        footerPatch.style.position = 'absolute'
        footerPatch.style.height = footerPatchHeight + 'px'
        footerPatch.style.top = footerPatchTop + 'px'
        footerPatch.style.backgroundColor = '#5c657e'
        footerPatch.style.borderRadius = '9px'
        body.appendChild(footerPatch)
        if (timeout) {
          window.setTimeout(() => {
            const body = this.$refs.body
            if (body) {
              body.removeChild(footerPatch)
            }
          }, timeout)
        }
      }
      const header = this.$refs.header
      if (header) {
        const headerTop = header.offsetTop
        const headerPatchHeight = headerTop
        const headerPatch = document.createElement('div')
        headerPatch.style.width = '100%'
        headerPatch.style.position = 'absolute'
        headerPatch.style.height = headerPatchHeight + 'px'
        headerPatch.style.top = '0px'
        headerPatch.style.backgroundColor = '#5c657e'
        headerPatch.style.borderRadius = '9px'
        body.appendChild(headerPatch)
        if (timeout) {
          window.setTimeout(() => {
            const body = this.$refs.body
            if (body) {
              body.removeChild(headerPatch)
            }
          }, timeout)
        }
      }
    },
    deactivate () {
      this.$emit('deactivate')
    }
  }
}
</script>
