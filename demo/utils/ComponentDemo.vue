<template>
  <n-card
    v-if="showDemo"
    :id="demoFileName"
    class="demo-card"
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
            :code="showTs ? sfcTsCode : sfcJsCode"
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
            :code="showTs ? sfcTsCode : sfcJsCode"
            :success-text="t('copySuccess')"
          />
        </template>
        {{ t('copyCode') }}
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
      <n-tabs
        v-if="languageType === 'ts'"
        size="small"
        type="segment"
        style="padding: 12px 24px 0 24px"
        :value="showTs ? 'ts' : 'js'"
        @update:value="($e) => (showTs = $e === 'ts')"
      >
        <n-tab name="ts">
          TypeScript
        </n-tab>
        <n-tab name="js">
          JavaScript
        </n-tab>
      </n-tabs>
      <n-scrollbar
        x-scrollable
        content-style="padding: 20px 24px;"
        style="height: auto"
      >
        <n-code v-if="showTs" language="html" :code="sfcTsCode" />
        <n-code v-else language="html" :code="sfcJsCode" />
      </n-scrollbar>
    </template>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick, ref, watch } from 'vue'
import { CodeOutline } from '@vicons/ionicons5'
import { useDisplayMode } from '../store'
import { i18n } from '../utils/composables'
import EditOnGithubButton from './EditOnGithubButton.vue'
import EditInCodeSandboxButton from './EditInCodeSandboxButton.vue'
import CopyCodeButton from './CopyCodeButton.vue'

export default defineComponent({
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
    tsCode: {
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
      required: true
    },
    languageType: {
      type: String,
      default: 'js'
    }
  },
  setup (props) {
    const displayModeRef = useDisplayMode()
    const isDebugDemo = /(d|D)ebug/.test(props.demoFileName)
    const showDemoRef = computed(() => {
      return !(isDebugDemo && displayModeRef.value !== 'debug')
    })
    const showCodeRef = ref(false)
    const showTsRef = ref(props.languageType === 'ts')
    const expandCodeButtonRef = ref(null)
    watch(showCodeRef, () => {
      nextTick(() => {
        expandCodeButtonRef.value.syncPosition()
      })
    })
    return {
      expandCodeButtonRef,
      showDemo: showDemoRef,
      showCode: showCodeRef,
      showTs: showTsRef,
      sfcTsCode: decodeURIComponent(props.tsCode),
      sfcJsCode: decodeURIComponent(props.jsCode),
      toggleCodeDisplay () {
        showCodeRef.value = !showCodeRef.value
      },
      handleTitleClick: () => {
        window.location.hash = `#${props.demoFileName}`
      },
      toggleLanguageChange () {
        showTsRef.value = !showTsRef.value
      },
      ...i18n({
        'zh-CN': {
          show: '显示代码',
          hide: '收起代码',
          editOnGithub: '在 GitHub 中编辑',
          editInCodeSandbox: '在 CodeSandbox 中编辑',
          copyCode: '复制代码',
          copySuccess: '复制成功'
        },
        'en-US': {
          show: 'Show Code',
          hide: 'Hide Code',
          editOnGithub: 'Edit on GitHub',
          editInCodeSandbox: 'Edit in CodeSandbox',
          copyCode: 'Copy Code',
          copySuccess: 'Successfully Copied'
        }
      })
    }
  }
})
</script>
