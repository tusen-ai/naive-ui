<template>
  <n-card
    v-if="showDemo"
    class="demo-card"
    :id="demoFileName"
    :segmented="{
      footer: true
    }"
    footer-style="padding: 0;"
  >
    <template #header>
      <span style="cursor: pointer" @click="handleTitleClick">
        <slot name="title" />
      </span>
    </template>
    <template #header-extra>
      <n-tooltip>
        <template #trigger>
          <edit-in-code-sandbox-button
            style="padding: 0; margin-right: 6px"
            size="tiny"
            :code="showLanguage === 'TS' ? sfcTsCode : sfcJsCode"
          />
        </template>
        {{ t('editInCodeSandbox') }}
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <edit-on-github-button
            depth="3"
            style="padding: 0; margin-right: 6px"
            size="tiny"
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnGithub') }}
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <copy-code-button
            depth="3"
            style="padding: 0; margin-right: 6px"
            size="tiny"
            :code="showLanguage === 'TS' ? sfcTsCode : sfcJsCode"
            :success-text="t('copySuccess')"
          />
        </template>
        {{ t('copyCode') }}
      </n-tooltip>
      <n-tooltip v-if="sfcCodeIsTsType">
        <template #trigger>
          <n-button
            style="padding: 0; margin-right: 6px"
            size="tiny"
            text
            depth="3"
            @click="toggleLanguageChange"
          >
          {{showLanguage}}
          </n-button>
        </template>
        {{ t(showLanguage) }}
      </n-tooltip>
      <n-tooltip ref="expandCodeButtonRef">
        <template #trigger>
          <n-button
            style="padding: 0"
            size="tiny"
            text
            depth="3"
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
      <n-scrollbar x-scrollable content-style="padding: 20px 24px;">
        <n-code v-if='showLanguage === "TS"' language="html" :code="sfcTsCode" />
        <n-code v-else language="html" :code="sfcJsCode" />
      </n-scrollbar>
    </template>
  </n-card>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { CodeOutline } from '@vicons/ionicons5'
import { useDisplayMode } from '../store'
import { i18n } from '../utils/composables'
import EditOnGithubButton from './EditOnGithubButton.vue'
import EditInCodeSandboxButton from './EditInCodeSandboxButton.vue'
import CopyCodeButton from './CopyCodeButton.vue'

export default {
  components: {
    CodeOutline,
    EditOnGithubButton,
    EditInCodeSandboxButton,
    CopyCodeButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    code: {
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
    },
    jsCode: {
      type: String,
      required: false
    }
  },
  setup (props) {
    const displayModeRef = useDisplayMode()
    const isDebugDemo = /(d|D)ebug/.test(props.demoFileName)
    const showDemoRef = computed(() => {
      return !(isDebugDemo && displayModeRef.value !== 'debug')
    })
    const showCodeRef = ref(false)
    const showLanguageRef = ref('JS')
    const expandCodeButtonRef = ref(null)
    watch(showCodeRef, () => {
      nextTick(() => {
        expandCodeButtonRef.value.syncPosition()
      })
    })
    const sfcCodeIsTsType = decodeURIComponent(props.code).includes('<script lang="ts">')
    return {
      expandCodeButtonRef,
      showDemo: showDemoRef,
      showCode: showCodeRef,
      showLanguage: showLanguageRef,
      sfcTsCode: decodeURIComponent(props.code),
      sfcJsCode: decodeURIComponent(props.jsCode),
      sfcCodeIsTsType,
      toggleCodeDisplay () {
        showCodeRef.value = !showCodeRef.value
      },
      handleTitleClick: () => {
        window.location.hash = `#${props.demoFileName}`
      },
      toggleLanguageChange () {
        showLanguageRef.value = showLanguageRef.value === 'JS' ? 'TS' : 'JS'
      },
      ...i18n({
        'zh-CN': {
          show: '显示代码',
          hide: '收起代码',
          editOnGithub: '在 GitHub 中编辑',
          editInCodeSandbox: '在 CodeSandbox 中编辑',
          copyCode: '复制代码',
          copySuccess: '复制成功',
          JS: '切换到 TypeScript',
          TS: '切换到 JavaScript'
        },
        'en-US': {
          show: 'Show Code',
          hide: 'Hide Code',
          editOnGithub: 'Edit on GitHub',
          editInCodeSandbox: 'Edit in CodeSandbox',
          copyCode: 'Copy Code',
          copySuccess: 'Successfully Copied',
          JS: 'Switch to TypeScript',
          TS: 'Switch to JavaScript'
        }
      })
    }
  }
}
</script>
