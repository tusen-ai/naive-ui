<template>
  <div
    class="n-nimbus-form-card"
    :style="{width: width + 'px'}"
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
        <span class="n-nimbus-form-card__title">{{ title }}</span>
        <div class="n-nimbus-form-card__right-header">
          <div>
            <slot name="header" />
          </div>
          <div
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
export default {
  name: 'NNimbusFormCard',
  props: {
    width: {
      type: [Number, String],
      default: 900
    },
    title: {
      type: String,
      required: true
    },
    deactivate: {
      type: Function,
      required: true
    },
    sticky: {
      type: Boolean,
      default: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.n-nimbus-form-card {
  // position: relative;
  min-width: 600px;
  width: 1032px;
  margin: auto;
  pointer-events: none;
  border-radius: 9px;
  .n-nimbus-form-card__body {
    position: relative;
    pointer-events: all;
    clip-path: border-box;
    margin-top: 24px;
    margin-bottom: 24px;
    background: #5c657e;
    border-radius: 9px;
    .n-nimbus-form-card__header {
      position: relative;
      &.n-nimbus-form-card__header--sticky {
        position: sticky;
        top: 0px;
      }
      top: 0;
      background-color: #5c657e;
      border-radius: 9px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      padding-top: 24px;
      padding-left: 30px;
      padding-right: 30px;
      margin-left: 15px;
      margin-right: 15px;
      height: 19px;
      .n-nimbus-form-card__title {
        line-height: 19px;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
      }
      .n-nimbus-form-card__right-header {
        display: flex;
        align-items: center;
        .n-nimbus-form-card__deactivator {
          position: relative;
          width: 14px;
          height: 14px;
          margin-left: 17px;
          cursor: pointer;
          &::before {
            position: absolute;
            transform: rotate(45deg);
            height: 7px;
            width: 7px;
            top: -3px;
            content: "";
            border-right: 3px solid #c5d0de;
            border-bottom: 3px solid #c5d0de;
          }
          &::after {
            position: absolute;
            height: 7px;
            width: 7px;
            content: "";
            transform: rotate(45deg);
            top: 7px;
            border-left: 3px solid #c5d0de;
            border-top: 3px solid #c5d0de;
          }
        }
      }
    }
    .n-nimbus-form-card__content {
      padding: 19px 45px;
    }
    .n-nimbus-form-card__divider {
      border-bottom: 1px solid #6f778d;
      position: absolute;
      left: 30px;
      right: 30px;
      bottom: 0;
    }
    .n-nimbus-form-card__footer {
      &.n-nimbus-form-card__footer--sticky {
        position: sticky;
      }
      position: relative;
      padding-top: 24px;
      padding-bottom: 24px;
      padding-left: 30px;
      padding-right: 30px;
      margin-left: 15px;
      margin-right: 15px;
      display: flex;
      flex-direction: row-reverse;
      background: #5c657e;
      border-radius: 9px;
      bottom: 0;
      .n-nimbus-form-card__divider {
        bottom: unset;
        top: 0;
      }
    }
  }
}
</style>
