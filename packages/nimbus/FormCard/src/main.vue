<template>
  <div
    class="n-nimbus-form-card"
    :style="{width: width + 'px'}"
  >
    <div class="n-nimbus-form-card__header">
      <span class="n-nimbus-form-card__title">{{ title }}</span>
      <div class="n-nimbus-form-card__right-header">
        <div><slot name="header" /></div>
        <div
          class="n-nimbus-form-card__deactivator"
          @click="deactivate"
        />
      </div>
    </div>
    <div class="n-nimbus-form-card__divider" />
    <slot name="content" />
    <div class="n-nimbus-form-card__footer">
      <div class="nimbus-form-card__footer nimbus-form-card__actions">
        <slot name="footer" />
      </div>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.n-nimbus-form-card {
  min-width: 600px;
  width: 1032px;
  background: #5C657E;
  padding: 24px 45px;
  border-radius: 9px;
  .n-nimbus-form-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 19px;
    .n-nimbus-form-card__title {
      line-height: 19px;
      font-size: 16px;
      font-weight: 700;
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
          content: '';
          border-right: 3px solid #C5D0DE;
          border-bottom: 3px solid #C5D0DE;
        }
        &::after {
          position: absolute;
          height: 7px;
          width: 7px;
          content: '';
          transform: rotate(45deg);
          top: 7px;
          border-left: 3px solid #C5D0DE;
          border-top: 3px solid #C5D0DE;
        }
      }
    }
  }

  .n-nimbus-form-card__divider {
    border: 1px solid #6F778D;
    margin-bottom: 19px;
  }
  .n-nimbus-form-card__footer {
    margin-top: 24px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
