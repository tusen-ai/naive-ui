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
    v-if="isShow"
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
        :show-arrow="true"
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
    <slot name="demo" />
    <template v-if="showCode" v-slot:footer>
      <n-scrollbar>
        <slot name="code" />
      </n-scrollbar>
    </template>
  </n-card>
</template>

<script>
import mdCode from '../../src/_icons/md-code'

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
      controller: {},
      isShow: true,
      name: '',
      isDebug: false
    }
  },
  computed: {
    mode () {
      return this.$route.params.mode
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
    },
    mode () {
      this.init()
    }
  },
  mounted () {
    this.name = this.$el.id
    this.init()
  },
  methods: {
    toggleCodeDisplay () {
      this.showCode = !this.showCode
    },
    init () {
      const map = this.NDocumentation.anchorLinkMap
      this.isDebug = this.name && (this.name.indexOf('debug') > -1 || this.name.indexOf('Debug') > -1)
      if (this.isDebug) {
        if (this.mode === 'debug') {
          this.isShow = true
          map.set(this.name, String(this.$scopedSlots.title()[0].text).trim())
        } else {
          this.isShow = false
          map.delete(this.name)
        }
      } else {
        map.set(this.name, String(this.$scopedSlots.title()[0].text).trim())
      }

      this.NDocumentation.anchorLinkMap = new Map(map, this.$scopedSlots.title()[0].text.trim())
    }
  }
}
</script>
