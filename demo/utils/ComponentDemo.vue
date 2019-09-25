<template>
  <div
    class="n-code-box"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    n-dark-theme-background-color-hint="transparent"
    n-light-theme-background-color-hint="white"
  >
    <div class="n-code-box__title">
      <slot name="title" />
      <n-tooltip
        :placement="'top'"
        :arrow="true"
      >
        <template v-slot:activator>
          <n-button
            size="tiny"
            ghost
            icon="md-code"
            circle
            @click="toggleCodeDisplay"
          />
        </template>
        Show Code
      </n-tooltip>
    </div>
    <div class="n-code-box__content markdown">
      <slot name="content" />
    </div>
    <div
      class="n-code-box__view"
    >
      <slot name="demo" />
    </div>
    <div
      v-if="showCode"
      class="n-code-box__code"
    >
      <slot name="code" />
    </div>
  </div>
</template>

<script>
import withapp from '../../packages/mixins/withapp'
import themeable from '../../packages/mixins/themeable'

export default {
  mixins: [withapp, themeable],
  data () {
    return {
      showCode: false,
      lightThemeCSSRef: null,
      defaultThemeCSSRef: null
    }
  },
  watch: {
    synthesizedTheme (value) {

    }
  },
  mounted () {
    // document.querySelector('')
  },
  methods: {
    switchHighlightStyle () {

    },
    toggleCodeDisplay () {
      this.showCode = !this.showCode
    }
  }
}
</script>
