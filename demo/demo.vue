<template>
  <div class="demo">
    <n-nimbus-service-layout
      icon="md-contacts"
      name="NAIVE UI (0.1.96)"
      :padding-body="false"
      :items="items"
    >
      <router-view />
    </n-nimbus-service-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: 'Start',
          path: '/start'
        },
        {
          name: 'Nimbus',
          path: '/',
          childItems: [
            {
              name: 'Nimbus Service Layout',
              path: '/n-nimbus-service-layout'
            },
            // {
            //   name: 'Nimbus Home Layout',
            //   path: '/n-nimbus-home-layout'
            // },
            {
              name: 'Nimbus Form Card',
              path: '/n-nimbus-form-card'
            },
            {
              name: 'Nimbus Confirm Card',
              path: '/n-nimbus-confirm-card'
            }
          ]
        },
        {
          name: 'Common',
          path: '/',
          childItems: [
            {
              name: 'Alert',
              path: '/n-alert'
            },
            {
              name: 'Button',
              path: '/n-button'
            },
            {
              name: 'Checkbox',
              path: '/n-checkbox'
            },
            {
              name: 'DatePicker',
              path: '/n-date-picker'
            },
            {
              name: 'Gradient Text',
              path: '/n-gradient-text'
            },
            {
              name: 'Icon',
              path: '/n-icon'
            },
            {
              name: 'Input',
              path: '/n-input'
            },
            {
              name: 'Message',
              path: '/n-message'
            },
            {
              name: 'Modal',
              path: '/n-modal'
            },
            {
              name: 'Notification',
              path: '/n-notification'
            },
            {
              name: 'Pagination',
              path: '/n-pagination'
            },
            {
              name: 'Popup',
              path: '/n-popup'
            },
            {
              name: 'Select',
              path: '/n-select'
            },
            {
              name: 'Switch',
              path: '/n-switch'
            },
            {
              name: 'Table',
              path: '/n-table'
            },
            {
              name: 'AdvanceTable',
              path: '/n-advance-table'
            },
            {
              name: 'Tooltip',
              path: '/n-tooltip'
            }
          ]
        }
      ]
    }
  }
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
    height: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    align-items: center;
  }
  .n-doc-body {
    padding-top: 14px;
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
    .n-doc-section__text-content {
      font-size: 16px;
    }
    .n-doc-section__source {
      position: relative;
    }
  }
}
</style>
