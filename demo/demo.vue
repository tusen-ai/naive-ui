<template>
  <div class="demo">
    <div class="section">
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
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.demo {
  width: 1080px;
  height: 100vh;
  margin: auto;
  display: flex;
  align-items: center;
}
</style>

<style>
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
  z-index: -1;
}
.CodeMirror-scroll {
  overflow-y: hidden;
  overflow-x: auto;
}
</style>
