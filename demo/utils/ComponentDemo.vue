<template>
  <n-card
    v-if="isShow"
    class="demo-card"
    :segmented="{
      footer: true
    }"
  >
    <template #header>
      <slot name="title" />
    </template>
    <template #header-extra>
      <n-tooltip trigger="hover" :placement="'top'" :show-arrow="true">
        <template #trigger>
          <edit-on-github-button
            style="padding: 0; margin-right: 6px"
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
        <template #trigger>
          <n-button
            style="padding: 0"
            size="tiny"
            text
            @click="toggleCodeDisplay"
          >
            <template #icon>
              <n-icon>
                <code-outline />
              </n-icon>
            </template>
          </n-button>
        </template>
        {{ !showCode ? t('show') : t('hide') }}
      </n-tooltip>
    </template>
    <slot name="content" />
    <slot name="demo" />
    <template v-if="showCode" #footer>
      <n-scrollbar x-scrollable>
        <slot name="code" />
      </n-scrollbar>
    </template>
  </n-card>
</template>

<script>
import { nextTick } from 'vue'
import { CodeOutline } from '@vicons/ionicons-v5'
import { i18n, useSiteDisplayMode } from '../util-composables'

export default {
  components: {
    CodeOutline
  },
  inject: ['NDocumentation'],
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
  setup () {
    return {
      displayMode: useSiteDisplayMode(),
      ...i18n({
        'zh-CN': {
          show: '显示代码',
          hide: '收起代码',
          editOnGithub: '在 Github 上编辑'
        },
        'en-US': {
          show: 'Show Code',
          hide: 'Hide Code',
          editOnGithub: 'Edit on Github'
        }
      })
    }
  },
  data () {
    return {
      showCode: false
    }
  },
  computed: {
    isDebugDemo () {
      return (
        this.demoFileName &&
        (~this.demoFileName.indexOf('debug') ||
          ~this.demoFileName.indexOf('Debug'))
      )
    },
    isShow () {
      return !(this.isDebugDemo && this.displayMode !== 'debug')
    }
  },
  watch: {
    showCode () {
      nextTick(() => {
        this.$refs.expandCodeButton.syncPosition()
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
      if (this.isDebugDemo) {
        if (this.displayMode === 'debug') {
          map.set(this.demoFileName, this.title)
        } else {
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
