<i18n>
{
  "zh-cn": {
    "show": "显示代码",
    "hide": "收起代码"
  },
  "en-us": {
    "show": "Show Code",
    "hide": "Hide Code"
  }
}
</i18n>

<template>
  <div
    class="n-code-box"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    n-dark-theme-background-color-hint="#1e2437"
    n-light-theme-background-color-hint="white"
  >
    <div class="n-code-box__title">
      <slot name="title" />
      <n-tooltip
        :delay="300"
        :placement="'top'"
        :arrow="true"
        :controller="controller"
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
        {{ !showCode ? $t('show') : $t('hide') }}
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
      <n-scrollbar>
        <slot name="code" />
      </n-scrollbar>
    </div>
  </div>
</template>

<script>
import withapp from '../../packages/mixins/withapp'
import themeable from '../../packages/mixins/themeable'

export default {
  mixins: [withapp, themeable],
  inject: {
    NDocumentation: {
      default: null
    }
  },
  data () {
    return {
      showCode: false,
      lightThemeCSSRef: null,
      defaultThemeCSSRef: null,
      controller: {}
    }
  },
  watch: {
    synthesizedTheme (value) {

    },
    showCode () {
      this.$nextTick().then(() => {
        this.controller.updatePosition()
      })
    }
  },
  mounted () {
    const map = this.NDocumentation.anchorLinkMap
    map.set(this.$el.id, String(this.$scopedSlots.title()[0].text).trim())
    this.NDocumentation.anchorLinkMap = new Map(map, this.$scopedSlots.title()[0].text.trim())
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
