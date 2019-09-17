<template>
  <div
    class="n-code-box"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div class="n-code-box__title">
      <slot name="title" />
    </div>
    <div class="n-code-box__content">
      <slot name="content" />
    </div>
    <n-divider />
    <div
      class="n-code-box__view"
    >
      <slot name="demo" />
    </div>
    <n-divider @click.native="handleDividerClick">
      {{ !showCode ? 'Show Code' : 'Hide Code' }}
    </n-divider>
    <div
      v-if="showCode"
      class="n-code-box__code"
    >
      <slot name="code" />
    </div>
  </div>
</template>

<script>
import withapp from '../packages/mixins/withapp'
import themeable from '../packages/mixins/themeable'

export default {
  mixins: [withapp, themeable],
  data () {
    return {
      showCode: false
    }
  },
  methods: {
    handleDividerClick () {
      this.showCode = !this.showCode
    }
  }
}
</script>
