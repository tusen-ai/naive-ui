<i18n>
{
  "zh-CN": {
    "show": "显示代码",
    "hide": "收起代码",
    "editOnGithub": "在 Github 上编辑"
  },
  "en-US": {
    "show": "Show Code",
    "hide": "Hide Code",
    "editOnGithub": "Edit on Github"
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
      <n-button-group size="tiny">
        <n-tooltip
          :delay="300"
          :placement="'top'"
          :show-arrow="true"
        >
          <template v-slot:activator>
            <n-button
              style="padding: 0 2px 0 8px"
              ghost
              round
              @click="handleEditOnGithubClick"
            >
              <template v-slot:icon>
                <create-outline />
              </template>
            </n-button>
          </template>
          {{ $t('editOnGithub') }}
        </n-tooltip>
        <n-tooltip
          :delay="300"
          :placement="'top'"
          :show-arrow="true"
          :controller="controller"
        >
          <template v-slot:activator>
            <n-button
              style="padding: 0 6px 0 4px"
              ghost
              round
              @click="toggleCodeDisplay"
            >
              <template v-slot:icon>
                <code-outline />
              </template>
            </n-button>
          </template>
          {{ !showCode ? $t('show') : $t('hide') }}
        </n-tooltip>
      </n-button-group>
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
import codeOutline from '../../src/_icons/code-outline'
import createOutline from '../../src/_icons/create-outline'
import { state } from '../store'

export default {
  components: {
    codeOutline,
    createOutline
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
      isDebug: false,
      state: state
    }
  },
  computed: {
    mode () {
      return this.state.mode
    },
    url () {
      const relativePath = this.NDocumentation.url
      return 'https://***REMOVED***/tree/develop/' + relativePath
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
    handleEditOnGithubClick () {
      window.open(this.url, '_blank')
    },
    toggleCodeDisplay () {
      this.showCode = !this.showCode
    },
    init () {
      console.log('this', this.NDocumentation.url)
      const map = this.NDocumentation.anchorLinkMap
      this.isDebug = this.name && (~this.name.indexOf('debug') || ~this.name.indexOf('Debug'))
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
