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
      <n-tooltip
        :delay="300"
        :placement="'top'"
        :show-arrow="true"
      >
        <template v-slot:activator>
          <edit-on-github-button
            style="padding: 0; margin-right: 6px;"
            size="tiny"
            :url="url"
          />
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
            style="padding: 0;"
            size="tiny"
            text
            icon-depth="tertiary"
            @click="toggleCodeDisplay"
          >
            <template v-slot:icon>
              <code-outline />
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
import codeOutline from '../../src/_icons/code-outline'
import { state } from '../store'
import camelCase from 'lodash/camelCase'

export default {
  components: {
    codeOutline
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
      const relativePath = this.NDocumentation.url.replace('index.md', camelCase(this.name) + '.md')
      return relativePath
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
