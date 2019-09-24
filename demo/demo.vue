<template>
  <n-app
    class="demo"
    namespace="naive-ui-doc"
    :theme="theme"
  >
    <n-nimbus-service-layout
      :padding-body="false"
      :items="items"
    >
      <template v-slot:header>
        <doc-header
          :lang="lang"
          @lang-change="handleLangChange"
        />
      </template>
      <router-view />
    </n-nimbus-service-layout>
  </n-app>
</template>

<script>
import DocHeader from './header.vue'
import { i18n } from './init'

export default {
  components: {
    DocHeader
  },
  beforeRouteEnter (to, from, next) {
    console.log(i18n)
    i18n.locale = to.params.lang
    next()
  },
  beforeRouteUpdate (to, from, next) {
    this.$i18n.locale = to.params.lang
    next()
  },
  computed: {
    items () {
      return [
        {
          name: 'Start',
          path: `/${this.lang}` + '/start'
        },
        {
          name: 'Nimbus',
          path: `/${this.lang}` + '/',
          childItems: [
            {
              name: 'Nimbus Service Layout',
              path: `/${this.lang}` + '/n-nimbus-service-layout'
            },
            {
              name: 'Nimbus Form Card',
              path: `/${this.lang}` + '/n-nimbus-form-card'
            },
            {
              name: 'Nimbus Confirm Card',
              path: `/${this.lang}` + '/n-nimbus-confirm-card'
            },
            {
              name: 'Nimbus Icon',
              path: `/${this.lang}` + '/n-nimbus-icon'
            }
          ]
        },
        {
          name: 'Common',
          childItems: [
            {
              name: 'AdvanceTable',
              path: `/${this.lang}` + '/n-advance-table'
            },
            {
              name: 'Alert',
              path: `/${this.lang}` + '/n-alert'
            },
            {
              name: 'Anchor',
              path: `/${this.lang}` + '/n-anchor'
            },
            {
              name: 'App',
              path: `/${this.lang}` + '/n-app'
            },
            {
              name: 'BackTop',
              path: `/${this.lang}` + '/n-back-top'
            },
            {
              name: 'Badge',
              path: `/${this.lang}` + '/n-badge'
            },
            {
              name: 'Button',
              path: `/${this.lang}` + '/n-button'
            },
            {
              name: 'Cascader',
              path: `/${this.lang}` + '/n-cascader'
            },
            {
              name: 'Checkbox',
              path: `/${this.lang}` + '/n-checkbox'
            },
            {
              name: 'Collapse',
              path: `/${this.lang}` + '/n-collapse'
            },
            {
              name: 'Confirm',
              path: `/${this.lang}` + '/n-confirm'
            },
            {
              name: 'DatePicker',
              path: `/${this.lang}` + '/n-date-picker'
            },
            {
              name: 'Divider',
              path: `/${this.lang}` + '/n-divider'

            },
            {
              name: 'Drawer',
              path: `/${this.lang}` + '/n-drawer'
            },
            {
              name: 'Dropdown',
              path: `/${this.lang}` + '/n-dropdown'
            },
            {
              name: 'Form',
              path: `/${this.lang}` + '/n-form'
            },
            {
              name: 'GradientText',
              path: `/${this.lang}` + '/n-gradient-text'
            },
            {
              name: 'Icon',
              path: `/${this.lang}` + '/n-icon'
            },
            {
              name: 'Input',
              path: `/${this.lang}` + '/n-input'
            },
            {
              name: 'InputNumber',
              path: `/${this.lang}` + '/n-input-number'
            },
            {
              name: 'InputKeyValuePairs',
              path: `/${this.lang}` + '/n-InputKeyValuePairs'
            },
            {
              name: 'LoadingBar',
              path: `/${this.lang}` + '/n-loading-bar'
            },
            {
              name: 'Message',
              path: `/${this.lang}` + '/n-message'
            },
            {
              name: 'Modal',
              path: `/${this.lang}` + '/n-modal'
            },
            {
              name: 'Notification',
              path: `/${this.lang}` + '/n-notification'
            },
            {
              name: 'Pagination',
              path: `/${this.lang}` + '/n-pagination'
            },
            {
              name: 'Popover',
              path: `/${this.lang}` + '/n-popover'
            },
            {
              name: 'Popconfirm',
              path: `/${this.lang}` + '/n-popconfirm'
            },
            {
              name: 'Popselect',
              path: `/${this.lang}` + '/n-popselect'
            },
            {
              name: 'Progress',
              path: `/${this.lang}` + '/n-progress'
            },
            {
              name: 'Radio',
              path: `/${this.lang}` + '/n-radio'
            },
            {
              name: 'Select',
              path: `/${this.lang}` + '/n-select'
            },
            {
              name: 'Slider',
              path: `/${this.lang}` + '/n-slider'
            },
            {
              name: 'Spin',
              path: `/${this.lang}` + '/n-spin'
            },
            {
              name: 'Steps',
              path: `/${this.lang}` + '/n-steps'
            },
            {
              name: 'Switch',
              path: `/${this.lang}` + '/n-switch'
            },
            {
              name: 'Tabs',
              path: `/${this.lang}` + '/n-tabs'
            },
            {
              name: 'Table',
              path: `/${this.lang}` + '/n-table'
            },
            {
              name: 'Tag',
              path: `/${this.lang}` + '/n-tag'
            },
            {
              name: 'Time',
              path: `/${this.lang}` + '/n-time'
            },
            {
              name: 'TimePicker',
              path: `/${this.lang}` + '/n-time-picker'
            },
            {
              name: 'Timeline',
              path: `/${this.lang}` + '/n-timeline'
            },
            {
              name: 'Tooltip',
              path: `/${this.lang}` + '/n-tooltip'
            },
            {
              name: 'Transfer',
              path: `/${this.lang}` + '/n-transfer'
            },
            {
              name: 'Tree',
              path: `/${this.lang}` + '/n-tree'
            }
          ]
        },
        {
          name: 'Debug',
          childItems: [
            {
              name: 'CancelMarkDebug',
              path: `/${this.lang}` + '/n-cancel-mark-debug'
            },
            {
              name: 'PopoverDebug',
              path: `/${this.lang}` + '/n-popover-debug'
            },
            {
              name: 'RouterDebug',
              path: `/${this.lang}` + '/n-router-debug'
            },
            {
              name: 'ModalDebug',
              path: `/${this.lang}` + '/n-modal-debug'
            },
            {
              name: 'ScrollbarDebug',
              path: `/${this.lang}` + '/n-scrollbar-debug'
            },
            {
              name: 'ScrollbarDebug2',
              path: `/${this.lang}` + '/n-scrollbar-debug2'
            },
            {
              name: 'DatePickerDebug',
              path: `/${this.lang}` + '/n-date-picker-debug'
            },
            {
              name: 'BackTopDebug',
              path: `/${this.lang}` + '/n-back-top-debug'
            },
            {
              name: 'CascaderDebug',
              path: `/${this.lang}` + '/n-cascader-debug'
            },
            {
              name: 'VerticalAlignDebug',
              path: `/${this.lang}` + '/n-vertical-align-debug'
            }
          ]
        }
      ]
    },
    lang: {
      get () {
        return this.$route.params.lang || 'en-us'
      },
      set (lang) {
        this.$router.push(changeLangInPath(
          this.$route.fullPath,
          lang
        ))
      }
    },
    theme: {
      get () {
        return this.$route.query.theme === 'light' ? 'light' : 'dark'
      },
      set (theme) {
        this.$router.push({
          query: {
            ...this.$route.query,
            theme
          }
        })
      }
    }
  },
  methods: {
    handleLangChange (lang) {
      this.lang = lang
    }
  }
}

function changeLangInPath (path, lang) {
  const langReg = /^\/(zh-cn|en-us)\//
  return path.replace(langReg, `/${lang}/`)
}
</script>

<style lang="scss" scoped>
.demo {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 1080px;
}
</style>

<style lang="scss">
body {
  -webkit-text-size-adjust: 100%;
}

.CodeMirror {
  border: 2px solid #5c657eff;
  height: auto !important;
  z-index: 0;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 18px;
}
.CodeMirror-scroll {
  overflow-y: hidden !important;
  overflow-x: auto !important;
}
.n-doc {
  width: 720px;
  margin: 0 auto;
  .n-doc-header {
    display: flex;
    // height: 60px;
    // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 16px;
    // align-items: center;
  }
  .n-doc-body {
    // padding-top: 14px;
  }
  .n-doc-section {
    .n-doc-section__header {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .n-doc-section__view {
      background: #5c657eff;
      padding: 18px;
      border-radius: 8px;
      justify-content: center;
      display: flex;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .n-doc-section__inspect {
      background: #5c657eff;
      padding: 18px;
      border-radius: 8px;
      display: flex;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .n-doc-section__text-content {
      font-size: 16px;
    }
    .n-doc-section__source {
      position: relative;
    }
  }
}
</style>
