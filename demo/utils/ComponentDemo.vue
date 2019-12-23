<i18n>
{
  "zh-CN": {
    "show": "显示代码",
    "hide": "收起代码"
  },
  "en-US": {
    "show": "Show Code",
    "hide": "Hide Code"
  }
}
</i18n>

<template>
  <n-card
    class="demo-card"
    :segmented="{
      footer: true
    }"
    :content-style="contentStyle"
  >
    <template v-slot:header>
      <slot name="title" />
    </template>
    <template v-slot:header-extra>
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
            circle
            @click="toggleCodeDisplay"
          >
            <template v-slot:icon>
              <md-code />
            </template>
          </n-button>
        </template>
        {{ !showCode ? $t('show') : $t('hide') }}
      </n-tooltip>
    </template>
    <slot name="content" />
    <div
      class="demo-card__view"
    >
      <slot name="demo" />
    </div>
    <template v-if="showCode" v-slot:footer>
      <n-scrollbar>
        <slot name="code" />
      </n-scrollbar>
    </template>
  </n-card>
</template>

<script>
import mdCode from '../../packages/icons/md-code'

export default {
  components: {
    mdCode
  },
  inject: {
    NDocumentation: {
      default: null
    }
  },
  data () {
    return {
      showCode: false,
      contentStyle: null,
      controller: {}
    }
  },
  watch: {
    showCode () {
      this.contentStyle = {
        transition: 'none'
      }
      this.$nextTick().then(() => {
        this.controller.updatePosition()
        this.contentStyle = null
      })
    }
  },
  mounted () {
    const map = this.NDocumentation.anchorLinkMap
    map.set(this.$el.id, String(this.$scopedSlots.title()[0].text).trim())
    this.NDocumentation.anchorLinkMap = new Map(map, this.$scopedSlots.title()[0].text.trim())
  },
  methods: {
    toggleCodeDisplay () {
      this.showCode = !this.showCode
    }
  }
}
</script>
