<template>
  <n-card
    v-if="isShow"
    class="demo-card"
    :segmented="{
      footer: true
    }"
  >
    <template #header>
      <span
style="cursor: pointer"
@click="handleTitleClick"
        ><slot
name="title"
      /></span>
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
import { CodeOutline } from '@vicons/ionicons5'
import { useDisplayMode } from '../store'
import { i18n } from '../utils/composables'

export default {
  components: {
    CodeOutline
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
  setup (props) {
    return {
      handleTitleClick: () => {
        window.location.hash = `#${props.demoFileName}`
      },
      displayMode: useDisplayMode(),
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
    }
  },
  methods: {
    toggleCodeDisplay () {
      this.showCode = !this.showCode
    }
  }
}
</script>
