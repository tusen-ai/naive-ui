<template>
  <div class="demo">
    <n-nimbus-service-layout
      service-icon="md-contacts"
      name="NAIVE UI"
      :items="items"
    >
      123
    </n-nimbus-service-layout>
    <!-- <div class="section">
      <router-link to="/n-nimbus-home-layout">
        home / n-nimbus-home-layout
      </router-link>
      <br>
      <router-link to="/n-nimbus-service-layout">
        service / n-nimbus-service-layout
      </router-link>
      <br>
      <router-link to="/n-gradient-text">
        渐变文字 / n-gradient-text
      </router-link>
      <br>
      <router-link to="/n-icon">
        图标 / n-icon
      </router-link>
      <br>
      <router-link to="/n-checkbox">
        多选框 / n-checkbox
      </router-link>
      <br>
      <router-link to="/n-button">
        按钮 / n-button
      </router-link>
      <br>
      <router-link to="/n-switch">
        开关 / n-switch
      </router-link><br>
      <router-link to="/n-table">
        表格 / n-table
      </router-link><br>
      <router-link to="/n-input">
        输入 / n-input
      </router-link>
      <br>
      <router-link to="/n-select">
        选择 / n-select
      </router-link>
      <br>
      <router-link to="/n-modal">
        模态框 / n-modal
      </router-link>
      <br>
      <router-link to="/n-nimbus-form-card">
        Nimbus 弹出式表单 / n-nimbus-form-card
      </router-link>
      <br>
      <router-link to="/n-message">
        通知 / $NMessage
      </router-link>
      <br>
      <router-link to="/n-tooltip">
        帮助 / n-tooltip
      </router-link>
      <br>
      <router-link to="/n-notification">
        通知 / $NNotification
      </router-link>
      <br>
      <router-link
        to="/n-nimbus-confirm-card"
      >
        Nimbus 确认框 / n-nimbus-confirm-card
      </router-link>
      <br>
      <router-link
        to="/n-pagination"
      >
        分页 / n-pagination
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
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
              path: '/'
            },
            {
              name: 'Checkbox',
              path: '/'
            },
            {
              name: 'Gradient Text',
              path: '/'
            },
            {
              name: 'Icon',
              path: '/'
            },
            {
              name: 'Input',
              path: '/'
            },
            {
              name: 'Message',
              path: '/'
            },
            {
              name: 'Modal',
              path: '/'
            },
            {
              name: 'Notification',
              path: '/'
            },
            {
              name: 'Pagination',
              path: '/'
            },
            {
              name: 'Select',
              path: '/'
            },
            {
              name: 'Switch',
              path: '/'
            },
            {
              name: 'Table',
              path: '/'
            },
            {
              name: 'Tooltip',
              path: '/'
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
}
.CodeMirror-scroll {
  overflow-y: hidden;
  overflow-x: auto;
}
</style>
