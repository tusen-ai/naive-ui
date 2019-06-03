<template>
  <div class="layout">
    <div class="body"></div>
    <div class="menu" :class="{ collapse: collapse, active: !collapse }">
      <div class="header">Administration</div>
      <div class="item active"><span>Service Management</span></div>
      <div class="item"><span>Service Type Management</span></div>
      <div class="item"><span>User Management</span></div>
      <div class="toggle-button" @click="toggle"><img src="./toggleButton.svg"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "NvLayout",
  props: {},
  methods: {
    toggle () {
      this.collapse = !this.collapse
    }
  },
  data () {
    return {
      collapse: false
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  background: #1f263e;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.menu-container {
  display: inline-block;
  
  margin-right: 14px;
  
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
    background-color: #1f263e;
    width: 272px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, .2);
  }
  &.active {
    transform: translateX(0);
    transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
    .toggle-button {
      transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform: translateX(50%) translateY(-50%) rotate(0deg);
    }
  }
  &.collapse {
    transform: translateX(-224px);
    transition: transform .25s cubic-bezier(0.4, 0.0, 0.2, 1);
    .toggle-button {
      transition: transform .25s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform: translateX(50%) translateY(-50%) rotate(180deg);
    }
  }
  .header {
    color: #fff;
    font-weight: 700;
    padding-top: 21px;
    padding-bottom: 21px;
    padding-left: 48px;
    font-size: 16px;
    button {
      float: right;
    }
  }
  .toggle-button {
    cursor: pointer;
    width: 36px;
    height: 36px;
    opacity: 0.3;
    position: absolute;
    top: 50%;
    right: 0;
  }
  .item {
    cursor: pointer;
    position: relative;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 48px;
    font-size: 14px;
    color: #fff;
    opacity: 0.4;
    transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    &.active {
      opacity: 1;
      background-image:linear-gradient(47deg,rgba(232,232,235,.4) 0%,rgba(31,38,62,.4) 100%);
    }
    &:hover {
      opacity: 1;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
      transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      opacity: 0;
      // background-image:linear-gradient(47deg,rgba(232,232,235,.4) 0%,rgba(31,38,62,.4) 100%);
    }
    &:hover::before {
      opacity: 1;
    }
  }
}
.body {
  position: absolute;
  
  left: 272px;
  right: 0px;
  top: 0;
  bottom: 0;
}
</style>

