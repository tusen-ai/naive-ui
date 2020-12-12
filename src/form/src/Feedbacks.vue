<template>
  <template v-if="feedback !== undefined && feedback !== null">
    <div :key="feedback" class="n-form-item-feedback__line">
      {{ feedback }}
    </div>
  </template>
  <template v-else>
    <div
      v-for="explain in explains"
      :key="explain"
      class="n-form-item-feedback__line"
    >
      {{ explain }}
    </div>
  </template>
</template>

<script>
export default {
  name: 'FormItemFeedback',
  props: {
    explains: {
      type: Array,
      default: undefined
    },
    feedback: {
      type: [String, Array],
      default: undefined
    }
  }
}
</script>
