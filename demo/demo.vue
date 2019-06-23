<template>
  <div class="demo">
    <n-nimbus-service-layout
      service-icon="md-contacts"
      name="NAIVE UI (0.1.49)"
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
          name: 'Installation'
        },
        {
          name: 'Nimbus',
          path: '/',
          childItems: [
            {
              name: 'Nimbus Service Layout',
              path: '/'
            },
            {
              name: 'Nimbus Home Layout',
              path: '/'
            },
            {
              name: 'Nimbus Form Card',
              path: '/'
            },
            {
              name: 'Nimbus Confirm Card',
              path: '/'
            }
          ]
        },
        {
          name: 'Common',
          path: '/',
          childItems: [
            {
              name: 'Button',
              path: '/n-button'
            },
            {
              name: 'Checkbox',
              path: '/n-checkbox'
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
}
</style>

<style>
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
  z-index: 0;
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 18px;
}
.CodeMirror-scroll {
  overflow-y: hidden;
  overflow-x: auto;
}
.n-nimbus-service-layout__body {
  padding: 0!important;
}
</style>
