<template>
  <n-card
    v-if="isShow"
    class="demo-card"
    style="transform: translateZ(0);"
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
        trigger="hover"
        :placement="'top'"
        :show-arrow="true"
      >
        <template v-slot:activator>
          <edit-on-github-button
            style="padding: 0; margin-right: 6px;"
            size="tiny"
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnGithub') }}
      </n-tooltip>
      <n-tooltip
        ref="expandCodeButton"
        trigger="hover"
        :placement="'top'"
        :show-arrow="true"
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
        {{ !showCode ? t('show') : t('hide') }}
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
import { nextTick } from 'vue'
import codeOutline from '../../src/_icons/code-outline'
import { displayModeRef, i18n } from '../util-compositions'

export default {
  components: {
    codeOutline
  },
  props: {
    title: {
      type: String,
      required: true
    },
    demoFileName: {
      type: String,
      required: true
    },
    relativeUrl: {
      type: String,
      required: true
    }
  },
  inject: {
    NDocumentation: {
      default: null
    }
  },
  setup () {
    return {
      displayMode: displayModeRef,
      ...(i18n({
        'zh-CN': {
          'show': '显示代码',
          'hide': '收起代码',
          'editOnGithub': '在 Github 上编辑'
        },
        'en-US': {
          'show': 'Show Code',
          'hide': 'Hide Code',
          'editOnGithub': 'Edit on Github'
        }
      }))
    }
  },
  data () {
    return {
      showCode: false,
      contentStyle: null,
      isShow: true,
      isDebugDemo: false
    }
  },
  watch: {
    showCode () {
      this.contentStyle = {
        transition: 'none'
      }
      nextTick(() => {
        this.$refs.expandCodeButton.syncPosition()
        this.contentStyle = null
      })
    },
    displayMode () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    toggleCodeDisplay () {
      this.showCode = !this.showCode
    },
    init () {
      const map = this.NDocumentation.anchorLinkMap
      this.isDebugDemo = this.demoFileName && (~this.demoFileName.indexOf('debug') || ~this.demoFileName.indexOf('Debug'))
      if (this.isDebugDemo) {
        if (this.displayMode === 'debug') {
          this.isShow = true
          map.set(this.demoFileName, this.title)
        } else {
          this.isShow = false
          map.delete(this.demoFileName)
        }
      } else {
        map.set(this.demoFileName, this.title)
      }
      this.NDocumentation.anchorLinkMap = new Map(map)
    }
  }
}
</script>
