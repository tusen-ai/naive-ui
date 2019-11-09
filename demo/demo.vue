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
      <template v-slot:nav>
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
    // console.log(i18n)
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
          name: 'Naive UI',
          path: `/${this.lang}/${this.theme}` + '/intro'
        },
        {
          name: 'Getting Started',
          path: `/${this.lang}/${this.theme}` + '/start'
        },
        {
          name: 'Develop Guidelines',
          path: `/${this.lang}/${this.theme}` + '/dev-guildlines'
        },
        {
          name: 'Develop Status',
          path: `/${this.lang}/${this.theme}` + '/status'
        },
        {
          name: 'Nimbus Components',
          path: `/${this.lang}/${this.theme}` + '/',
          childItems: [
            {
              name: 'Nimbus Service Layout',
              path: `/${this.lang}/${this.theme}` + '/n-nimbus-service-layout'
            },
            {
              name: 'Nimbus Form Card',
              path: `/${this.lang}/${this.theme}` + '/n-nimbus-form-card'
            },
            {
              name: 'Nimbus Confirm Card',
              path: `/${this.lang}/${this.theme}` + '/n-nimbus-confirm-card'
            }
          ]
        },
        {
          name: 'Config Components',
          childItems: [
            {
              name: 'App',
              path: `/${this.lang}/${this.theme}` + '/n-app'
            },
            {
              name: 'ThemeConsumer',
              path: `/${this.lang}/${this.theme}` + '/n-theme-consumer'
            }
          ]
        },
        {
          name: 'Layout Components',
          childItems: [
            {
              name: 'Layout (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-layout'
            },
            {
              name: 'Grid',
              path: `/${this.lang}/${this.theme}` + '/n-grid'
            }
          ]
        },
        {
          name: 'Common Components',
          childItems: [
            {
              name: 'Avator (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-avator'
            },
            {
              name: 'Button',
              path: `/${this.lang}/${this.theme}` + '/n-button'
            },
            {
              name: 'Card (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-card'
            },
            {
              name: 'Collapse',
              path: `/${this.lang}/${this.theme}` + '/n-collapse'
            },
            {
              name: 'Divider',
              path: `/${this.lang}/${this.theme}` + '/n-divider'
            },
            {
              name: 'Dropdown',
              path: `/${this.lang}/${this.theme}` + '/n-dropdown'
            },
            {
              name: 'GradientText',
              path: `/${this.lang}/${this.theme}` + '/n-gradient-text'
            },
            {
              name: 'Icon',
              path: `/${this.lang}/${this.theme}` + '/n-icon'
            },
            {
              name: 'Tag',
              path: `/${this.lang}/${this.theme}` + '/n-tag'
            }
          ]
        },
        {
          name: 'Data Input Components',
          childItems: [
            {
              name: 'AutoComplete (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-auto-complete'
            },
            {
              name: 'Cascader',
              path: `/${this.lang}/${this.theme}` + '/n-cascader'
            },
            {
              name: 'Checkbox',
              path: `/${this.lang}/${this.theme}` + '/n-checkbox'
            },
            {
              name: 'CustomInput (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-custom-input'
            },
            {
              name: 'DatePicker',
              path: `/${this.lang}/${this.theme}` + '/n-date-picker'
            },
            {
              name: 'Form',
              path: `/${this.lang}/${this.theme}` + '/n-form'
            },
            {
              name: 'Input',
              path: `/${this.lang}/${this.theme}` + '/n-input'
            },
            {
              name: 'InputNumber',
              path: `/${this.lang}/${this.theme}` + '/n-input-number'
            },
            {
              name: 'Radio',
              path: `/${this.lang}/${this.theme}` + '/n-radio'
            },
            {
              name: 'Select',
              path: `/${this.lang}/${this.theme}` + '/n-select'
            },
            {
              name: 'Slider',
              path: `/${this.lang}/${this.theme}` + '/n-slider'
            },
            {
              name: 'Switch',
              path: `/${this.lang}/${this.theme}` + '/n-switch'
            },
            {
              name: 'TimePicker',
              path: `/${this.lang}/${this.theme}` + '/n-time-picker'
            },
            {
              name: 'Transfer',
              path: `/${this.lang}/${this.theme}` + '/n-transfer'
            }
          ]
        },
        {
          name: 'Data Display Components',
          childItems: [
            {
              name: 'AdvanceTable (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-advance-table'
            },
            {
              name: 'Descriptions (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-descriptions'
            },
            {
              name: 'Empty (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-empty'
            },
            {
              name: 'List (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-list'
            },
            {
              name: 'Statistic',
              path: `/${this.lang}/${this.theme}` + '/n-statistic'
            },
            {
              name: 'Time',
              path: `/${this.lang}/${this.theme}` + '/n-time'
            },
            {
              name: 'Timeline',
              path: `/${this.lang}/${this.theme}` + '/n-timeline'
            },
            {
              name: 'Tree (in progress)',
              path: `/${this.lang}/${this.theme}` + '/n-tree'
            }
          ]
        },
        {
          name: 'Navigation Components',
          childItems: [
            {
              name: 'Affix',
              path: `/${this.lang}/${this.theme}` + '/n-affix'
            },
            {
              name: 'Anchor',
              path: `/${this.lang}/${this.theme}` + '/n-anchor'
            },
            {
              name: 'BackTop',
              path: `/${this.lang}/${this.theme}` + '/n-back-top'
            },
            {
              name: 'Breadcrumb',
              path: `/${this.lang}/${this.theme}` + '/n-breadcrumb'
            },
            {
              name: 'LoadingBar',
              path: `/${this.lang}/${this.theme}` + '/n-loading-bar'
            },
            {
              name: 'Menu',
              path: `/${this.lang}/${this.theme}` + '/n-menu'
            },
            {
              name: 'Pagination',
              path: `/${this.lang}/${this.theme}` + '/n-pagination'
            },
            {
              name: 'Steps',
              path: `/${this.lang}/${this.theme}` + '/n-steps'
            },
            {
              name: 'Tabs',
              path: `/${this.lang}/${this.theme}` + '/n-tabs'
            }
          ]
        },
        {
          name: 'Feedback Components',
          childItems: [
            {
              name: 'Alert',
              path: `/${this.lang}/${this.theme}` + '/n-alert'
            },
            {
              name: 'Badge',
              path: `/${this.lang}/${this.theme}` + '/n-badge'
            },
            {
              name: 'Confirm',
              path: `/${this.lang}/${this.theme}` + '/n-confirm'
            },
            {
              name: 'Drawer',
              path: `/${this.lang}/${this.theme}` + '/n-drawer'
            },
            {
              name: 'Message',
              path: `/${this.lang}/${this.theme}` + '/n-message'
            },
            {
              name: 'Modal',
              path: `/${this.lang}/${this.theme}` + '/n-modal'
            },
            {
              name: 'Notification',
              path: `/${this.lang}/${this.theme}` + '/n-notification'
            },
            {
              name: 'Popover',
              path: `/${this.lang}/${this.theme}` + '/n-popover'
            },
            {
              name: 'Popconfirm',
              path: `/${this.lang}/${this.theme}` + '/n-popconfirm'
            },
            {
              name: 'Popselect',
              path: `/${this.lang}/${this.theme}` + '/n-popselect'
            },
            {
              name: 'Progress',
              path: `/${this.lang}/${this.theme}` + '/n-progress'
            },
            {
              name: 'Result',
              path: `/${this.lang}/${this.theme}` + '/n-result'
            },
            {
              name: 'Spin',
              path: `/${this.lang}/${this.theme}` + '/n-spin'
            },
            {
              name: 'Tooltip',
              path: `/${this.lang}/${this.theme}` + '/n-tooltip'
            }
          ]
        },
        {
          name: 'Debug',
          childItems: [
            {
              name: 'CancelMarkDebug',
              path: `/${this.lang}/${this.theme}` + '/n-cancel-mark-debug'
            },
            {
              name: 'PopoverDebug',
              path: `/${this.lang}/${this.theme}` + '/n-popover-debug'
            },
            {
              name: 'RouterDebug',
              path: `/${this.lang}/${this.theme}` + '/n-router-debug'
            },
            {
              name: 'ModalDebug',
              path: `/${this.lang}/${this.theme}` + '/n-modal-debug'
            },
            {
              name: 'ScrollbarDebug',
              path: `/${this.lang}/${this.theme}` + '/n-scrollbar-debug'
            },
            {
              name: 'ScrollbarDebug2',
              path: `/${this.lang}/${this.theme}` + '/n-scrollbar-debug2'
            },
            {
              name: 'DatePickerDebug',
              path: `/${this.lang}/${this.theme}` + '/n-date-picker-debug'
            },
            {
              name: 'BackTopDebug',
              path: `/${this.lang}/${this.theme}` + '/n-back-top-debug'
            },
            {
              name: 'CascaderDebug',
              path: `/${this.lang}/${this.theme}` + '/n-cascader-debug'
            },
            {
              name: 'VerticalAlignDebug',
              path: `/${this.lang}/${this.theme}` + '/n-vertical-align-debug'
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
        return this.$route.params.theme === 'light' ? 'light' : 'dark'
      },
      set (theme) {
        this.$router.push(changeThemeInPath(
          this.$route.fullPath,
          theme
        ))
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

function changeThemeInPath (path, theme) {
  const themeReg = /(^\/[^/]+\/)([^/]+)/
  return path.replace(themeReg, '$1' + theme)
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
  .n-doc-section {
    .n-doc-section__header {
      font-size: 16px;
      font-weight: 700;
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
