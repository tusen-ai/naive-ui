<template>
  <div
    class="n-nimbus-confirm-card"
    :style="{width: width + 'px'}"
  >
    <div class="n-nimbus-confirm-card__body">
      <div class="n-nimbus-confirm-card__header">
        <span class="n-nimbus-confirm-card__title">{{ title }}</span>
        <div class="n-nimbus-confirm-card__right-header">
          <div
            class="n-nimbus-confirm-card__deactivator"
            @click="deactivate"
          />
        </div>
      </div>
      <slot name="content" />
      <div class="n-nimbus-confirm-card__footer">
        <div class="nimbus-confirm-card__footer nimbus-confirm-card__actions">
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NNimbusConfirmCard',
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
.n-nimbus-confirm-card {
  position: relative;
  width: 1032px;
  min-width: 300px;
  margin: auto;
  .n-nimbus-confirm-card__body {
    box-shadow:0px 2px 20px 0px rgba(0,0,0,0.16);
    margin-top: 24px;
    margin-bottom: 24px;
    background: #5c657e;
    padding: 16px 28px;
    border-radius: 9px;
    .n-nimbus-confirm-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      height: 19px;
      .n-nimbus-confirm-card__title {
        line-height: 19px;
        font-size: 18px;
        font-weight: 700;
        color: #E9E9ECFF;
      }
      .n-nimbus-confirm-card__right-header {
        display: flex;
        align-items: center;
        .n-nimbus-confirm-card__deactivator {
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
    .n-nimbus-confirm-card__footer {
      margin-top: 20px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
