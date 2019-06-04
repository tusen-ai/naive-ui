<template>
  <div
    class="menu-container"
    :class="{ collapse: collapse, active: !collapse }"
  >
    <div
      class="menu"
      :class="{ collapse: collapse, active: !collapse }"
    >
      <div class="header">
        Good Service<button @click="toggle">
          &lt;
        </button>
      </div>
      <div class="item">
        Service Management
      </div>
      <div class="item">
        Service Management
      </div>
      <div class="item">
        Service Management
      </div>
      <div class="toggle-button" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NvSidemenu',
  props: {},
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    toggle () {
      console.log('hello')
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  display: inline-block;
  position: relative;
  margin-right: 14px;
  top: 0;
  bottom: 0;
  width: 256px;
  &.active {
    max-width: 256px;
    transition: max-width .3s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  &.collapse {
    max-width: 32px;
    transition: max-width .25s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
}
.menu {
  & {
    background-color: #efefef;
    width: 256px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &.active {
    transform: translateX(0);
    transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  &.collapse {
    transform: translateX(-224px);
    transition: transform .25s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  .header {
    font-weight: 700;
    padding: 14px 4px 14px 21px;
    font-size: 16px;
    button {
      float: right;
    }
  }
  .item {
    padding: 14px 21px;
    font-size: 16px;
  }
}
</style>
