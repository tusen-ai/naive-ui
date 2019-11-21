<template>
  <div
    class="n-result"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div class="n-result-icon">
      <img v-if="status === 404 || status === '404'" class="n-result-icon__status-image" src="./404.svg">
      <img v-else-if="status === 403 || status === '403'" class="n-result-icon__status-image" src="./403.svg">
      <img v-else-if="status === 500 || status === '500'" class="n-result-icon__status-image" src="./500.svg">
      <img v-else-if="status === 481 || status === '418'" class="n-result-icon__status-image" src="./418.svg">
    </div>
    <div class="n-result-header">
      <div class="n-result-header__title">
        {{ title }}
      </div>
      <div class="n-result-header__description">
        {{ description }}
      </div>
    </div>
    <div v-if="$slots.default" class="n-result-content">
      <slot />
    </div>
    <div class="n-result-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NResult',
  mixins: [ withapp, themeable ],
  props: {
    status: {
      type: String,
      default: 'info'
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    }
  }
}
</script>
