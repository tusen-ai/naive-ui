<template>
  <div
    class="n-step"
    :class="{
      'n-step--finished': finished,
      'n-step--active': active
    }"
  >
    <div class="n-step__splitor n-step__splitor--left" />
    <div class="n-step-indicator">
      <div class="n-step-indicator__index">
        {{ index }}
      </div>
    </div>
    <div class="n-step-content">
      <div class="n-step-content__title">
        <div class="n-step-content__title-inner">
          {{ title }}
        </div><div class="n-step__splitor n-step__splitor--right" />
      </div>
      <div
        v-if="description !== null"
        class="n-step-content__description"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NStep',
  props: {
    finished: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    index: {
      type: [Number, String],
      default: null
    }
  }
}
</script>
