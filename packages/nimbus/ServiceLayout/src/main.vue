<template>
  <div class="n-nimbus-service-layout">
    <div
      class="body"
      :class="{ 'is-collapsed': isCollapsed, active: !isCollapsed }"
    >
      <slot />
    </div>
    <div
      class="menu"
      :class="{ 'is-collapsed': isCollapsed, active: !isCollapsed }"
    >
      <div class="item-wrapper">
        <div class="header">
          <div class="content">
            <div class="icon">
              <n-icon
                type="md-settings"
                :size="22"
              />
            </div>
            {{ name }}
          </div>
        </div>
        <div class="n-nimbus-service-layout-menu__divider" />
        <div
          v-for="item in itemsWithCollapseStatus"
          :key="item.name"
        >
          <div
            v-if="!item.childItems"
            class="item"
            :class="{ active: activeItemName === item.name }"
            @click="makeActive(item)"
          >
            <div class="item-icon" />
            <span>{{ item.name }}</span>
          </div>
          <div
            v-else
          >
            <div
              class="item is-group-header"
              :class="{
                'group-item-is-choosed': !!(1 + item.childItems.findIndex(item => item.name === activeItemName)),
                'is-collapsed': item.isCollapsed
              }"
              @click="toggleGroupHeaderCollapse(item.name)"
            >
              <div class="item-icon" />
              <span>{{ item.name }}</span>
            </div>
            <div
              class="group-items"
              :class="{
                'is-collapsed': item.isCollapsed
              }"
            >
              <div
                v-for="childItem in item.childItems"
                :key="childItem.name"
                class="item is-group-item"
                :class="{ active: activeItemName === childItem.name }"
                @click="makeActive(childItem)"
              >
                <span>{{ childItem.name }}</span>
              </div>
            </div>
          </div>
        </div>
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
  name: 'NNimbusServiceLayout',
  props: {
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isCollapsed: false,
      activeItemName: 'Service Management',
      itemsWithCollapseStatus: this.items.map(item => ({
        ...item,
        isCollapsed: true
      }))
    }
  },
  methods: {
    toggle () {
      this.isCollapsed = !this.isCollapsed
    },
    makeActive (item) {
      this.activeItemName = item.name
      if (this.$router) {
        this.$router.push(item.path)
      }
    },
    toggleGroupHeaderCollapse (headerName) {
      const headerIndex = this.itemsWithCollapseStatus.findIndex(item => item.name === headerName && item.childItems)
      if (headerIndex + 1) {
        this.itemsWithCollapseStatus[headerIndex].isCollapsed = !this.itemsWithCollapseStatus[headerIndex].isCollapsed
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.n-nimbus-service-layout{
  & {
    background: #171D33;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .body {
    & {
      padding: 21px 48px;
      position: absolute;
      left: 272px;
      right: 0px;
      top: 0;
      bottom: 0;
      transition: left .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      overflow: auto;
    }
    &.active {
      left: 272px;
    }
    &.is-collapsed {
      left: 48px;
    }
  }

  .menu {
    & {
      display: inline-block;
      background-color: #1f263e;
      width: 272px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      box-shadow: 0 2px 10px 1px rgba(0, 0, 0, .2);
    }
    .n-nimbus-service-layout-menu__divider {
      margin: 0px 25px;
      border-bottom: 1px solid rgba(255, 255, 255, .08);
    }
    &.active {
      transform: translateX(0);
      transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      .toggle-button {
        transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
        transform: translateX(50%) translateY(-50%) rotate(0deg);
      }
    }
    &.is-collapsed {
      transform: translateX(-224px);
      transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      .toggle-button {
        transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
        transform: translateX(50%) translateY(-50%) rotate(180deg);
      }
      .item-wrapper {
        .header {
          opacity: 0;
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
        .item.is-group-header {
          &::after {
            opacity: 0;
          }
          &.is-collapsed::after {
            opacity: 0;
          }
        }
      }
    }
    .header {
      transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      position: relative;
      color: #E9E9EC;
      font-weight: 700;
      padding-top: 21px;
      padding-bottom: 21px;
      padding-left: 48px;
      font-size: 16px;
      .content {
        opacity: 1;
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
    .item-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
      .item {
        cursor: pointer;
        position: relative;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 48px;
        font-size: 14px;
        color: #E9E9EC;
        .item-icon {
          &::before {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            border-style: solid;
            border-color:#78CD68 transparent transparent transparent;
            border-width: 7px;
            transform: rotate(-45deg);
            top: 24px;
            left: 32px;
          }
        }
        span {
          transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          opacity: 1;
        }
        &.active span{
          opacity: 1;
        }
        &:hover span {
          opacity: 1;
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
        &.is-group-header {
          &::after {
            content: '';
            height: 6px;
            width: 6px;
            border-left: 2px solid #63E2B7;
            border-top: 2px solid #63E2B7;
            position: absolute;
            right: 24px;
            top: calc(50% - 1px);
            transform: rotate(45deg);
            transform-origin: 25% 25%;
            opacity: 1;
            transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          }
          &.is-collapsed::after {
            transform: rotate(225deg) ;
            opacity: 1;
          }
          &:hover span {
            // transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
            // background-clip: text;
            // -webkit-background-clip: text;
            // transform-origin: 50% 50%;
            // color: transparent;
            opacity: 1;
          }
          span {
            transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), color 0.3s cubic-bezier(.6, 0.2, 0.4, 1);
            background: linear-gradient(14deg, rgba(120,205,104,1) 0%, rgba(20,166,165,1) 100%);
            background-clip: text;
            -webkit-background-clip: text;
            color: #E9E9EC;
            opacity: 1;
          }
        }
        &.is-group-item {
          padding-left: 64px;
          span {
            opacity: .4;
          }
          &.active {
            span {
              opacity: 1;
            }
          }
        }
        &.is-group-header.group-item-is-choosed {
          span {
            transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            opacity: 1;
          }
        }
      }
      .group-items {
        overflow: hidden;
        max-height: 600px;
        transition: max-height .45s cubic-bezier(0.4, 0.0, 0.2, 1);
        &.is-collapsed {
          max-height: 0;
        }
      }
    }
  }
}
</style>
