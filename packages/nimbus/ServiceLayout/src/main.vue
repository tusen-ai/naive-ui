<template>
  <div class="layout">
    <div
      class="body"
      :class="{ collapse: collapse, active: !collapse }"
    >
      <div class="header">
        <span class="content">
          Service Management
        </span>
      </div>
      <nv-loader />
    </div>
    <div
      class="menu"
      :class="{ collapse: collapse, active: !collapse }"
    >
      <div class="header">
        <div class="content">
          <div class="icon">
            <nv-icon
              type="md-settings"
              :size="22"
            />
          </div>
          Administration
        </div>
      </div>
      <div
        v-for="item in items"
        :key="item.name"
        class="item"
        :class="{ active: activeItemName === item.name }"
        @click="setActive(item.name)"
      >
        <span>{{ item.name }}</span>
      </div>
      <div
        class="toggle-button"
        @click="toggle"
      >
        <img src="./toggleButton.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NvServiceLayout',
  props: {},
  data () {
    return {
      collapse: false,
      activeItemName: 'Service Management',
      items: [
        {
          name: 'Service Management'
        },
        {
          name: 'Service Type Management'
        },
        {
          name: 'User Management'
        }
      ]
    }
  },
  methods: {
    toggle () {
      this.collapse = !this.collapse
    },
    setActive (itemName) {
      this.activeItemName = itemName
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  background: #171D33;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.body {
  & {
    position: absolute;
    left: 272px;
    right: 0px;
    top: 0;
    bottom: 0;
    transition: left .3s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  &.active {
    left: 272px;
  }
  &.collapse {
    left: 48px;
  }
  .header {
    position: relative;
    color: #fff;
    font-weight: 700;
    padding-top: 21px;
    padding-bottom: 21px;
    padding-left: 48px;
    font-size: 16px;
    .content {
      background:linear-gradient(14deg, rgba(120,205,104,1) 0%, rgba(20,166,165,1) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    .icon {
      position: absolute;
      left: 22px;
      opacity: .4;
    }
  }
}

.menu {
  & {
    display: inline-block;
    background-color: #1f263e;
    width: 272px;
    height: 100%;
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
    transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
    .toggle-button {
      transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform: translateX(50%) translateY(-50%) rotate(180deg);
    }
    .item.active {
      span {
        opacity: .4;
      }
      &::before {
        content: "";
        opacity: 0;
      }
      &:hover::before {
        content: "";
        opacity: 0;
      }
    }
  }
  .header {
    position: relative;
    color: #fff;
    font-weight: 700;
    padding-top: 21px;
    padding-bottom: 21px;
    padding-left: 48px;
    font-size: 16px;
    .content {
      opacity: .9;
    }
    .icon {
      position: absolute;
      left: 22px;
      opacity: .4;
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
    span {
      transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      opacity: .4;
    }
    &.active span{
      opacity: .9;
    }
    &:hover span {
      opacity: .9;
    }
    &::before {
      content: "";
      background-image:linear-gradient(47deg,rgba(232,232,235,.4) 0%,rgba(31,38,62,.4) 100%);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
      transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      opacity: 0;
    }
    &.active::before {
      opacity: .9;
    }
  }
}
</style>
