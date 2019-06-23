<template>
  <div class="n-nimbus-service-layout">
    <div><slot name="header" /></div>
    <div
      class="n-nimbus-service-layout__body"
      :class="{ 'n-nimbus-service-layout__body--collapsed': isCollapsed, 'n-nimbus-service-layout__body--active': !isCollapsed }"
    >
      <slot />
    </div>
    <div
      class="n-nimbus-service-layout__drawer"
      :class="{ 'n-nimbus-service-layout__drawer--collapsed': isCollapsed, 'n-nimbus-service-layout__drawer--active': !isCollapsed }"
    >
      <div class="n-nimbus-service-layout-drawer__item-wrapper">
        <div class="n-nimbus-service-layout-drawer__header">
          <div class="n-nimbus-service-layout-drawer-header__content">
            <div class="n-nimbus-service-layout-drawer-header__icon">
              <n-icon
                :type="serviceIcon"
                :size="22"
              />
            </div>
            {{ name }}
          </div>
        </div>
        <div class="n-nimbus-service-layout-drawer__divider" />
        <div
          v-for="item in itemsWithCollapseStatus"
          :key="item.name"
        >
          <div
            v-if="!item.childItems"
            class="n-nimbus-service-layout-drawer__item"
            :class="{ 'n-nimbus-service-layout-drawer__item--active': activeItemName === item.name }"
            @click="makeActive(item)"
          >
            <div class="n-nimbus-service-layout-drawer-item__icon" />
            <span>{{ item.name }}</span>
          </div>
          <div
            v-else
          >
            <div
              class="n-nimbus-service-layout-drawer__item n-nimbus-service-layout-drawer__item--is-group-header"
              :class="{
                'n-nimbus-service-layout-drawer__item--group-item-is-choosed': !!(1 + item.childItems.findIndex(item => item.name === activeItemName)),
                'n-nimbus-service-layout-drawer__item--collapsed': item.isCollapsed
              }"
              @click="toggleGroupHeaderCollapse(item.name)"
            >
              <div class="n-nimbus-service-layout-drawer-item__icon" />
              <span>{{ item.name }}</span>
            </div>
            <div
              :ref="item.name"
              class="n-nimbus-service-layout-drawer__group-items"
              :class="{
                'n-nimbus-service-layout-drawer__group-items--collapsed': item.isCollapsed
              }"
            >
              <div
                class="n-nimbus-service-layout-drawer-group-items__inner-wrapper"
              >
                <div
                  v-for="childItem in item.childItems"
                  :key="childItem.name"
                  class="n-nimbus-service-layout-drawer__item n-nimbus-service-layout-drawer__item--is-group-item"
                  :class="{ 'n-nimbus-service-layout-drawer__item--active': activeItemName === childItem.name }"
                  @click="makeActive(childItem)"
                >
                  <span>{{ childItem.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="n-nimbus-service-layout-drawer__toggle-button"
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
    serviceIcon: {
      type: String,
      default: 'md-settings'
    },
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
        isCollapsed: false
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
      const groupItems = this.$refs[headerName][0]
      if (headerIndex + 1) { // is collapsed
        const groupItemsInnerWrapper = groupItems.firstElementChild
        const maxHeight = groupItemsInnerWrapper.getBoundingClientRect().height
        const currentCollapseStatus = this.itemsWithCollapseStatus[headerIndex].isCollapsed
        if (currentCollapseStatus) {
          this.$nextTick().then(() => {
            groupItems.style.maxHeight = `${maxHeight}px`
          })
        } else {
          this.$nextTick().then(() => {
            groupItems.style.maxHeight = `${maxHeight}px`
            groupItems.getBoundingClientRect()
          }).then(() => {
            groupItems.style.maxHeight = null
          })
        }
        this.itemsWithCollapseStatus[headerIndex].isCollapsed = !currentCollapseStatus
      }
    }
  }
}
</script>

<style lang="scss">
.n-nimbus-service-layout{
  & {
    background: #171D33;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
  .n-nimbus-service-layout__body {
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
    & {
        /* width */
        &::-webkit-scrollbar {
          width: 5px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2.5px;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      }
    &.n-nimbus-service-layout__body--active {
      left: 272px;
    }
    &.n-nimbus-service-layout__body--collapsed {
      left: 48px;
    }
  }
  .n-nimbus-service-layout__drawer {
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
    &.n-nimbus-service-layout__drawer--active {
      transform: translateX(0);
      transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      .n-nimbus-service-layout-drawer__toggle-button {
        transform: translateX(50%) translateY(-50%) rotate(0deg);
      }
      .n-nimbus-service-layout-drawer__item-wrapper {
        opacity: 1;
      }
    }
    &.n-nimbus-service-layout__drawer--collapsed {
      transform: translateX(-224px);
      transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      .n-nimbus-service-layout-drawer__toggle-button {
        transform: translateX(50%) translateY(-50%) rotate(180deg);
      }
      .n-nimbus-service-layout-drawer__item-wrapper {
        opacity: 0;
      }
    }
    .n-nimbus-service-layout-drawer__toggle-button {
      transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      cursor: pointer;
      width: 36px;
      height: 36px;
      opacity: 0.3;
      position: absolute;
      top: 50%;
      right: 0;
    }
    .n-nimbus-service-layout-drawer__divider {
      margin: 0px 25px;
      border-bottom: 1px solid rgba(255, 255, 255, .08);
    }
    .n-nimbus-service-layout-drawer__item-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
      transition: opacity .3s cubic-bezier(0.4, 0.0, 0.2, 1);
      & {
        /* width */
        &::-webkit-scrollbar {
          width: 5px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2.5px;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      }
      .n-nimbus-service-layout-drawer__header {
        position: relative;
        font-weight: 700;
        height: 60px;
        padding-left: 48px;
        font-size: 16px;
        color: #E9E9EC;
        display: flex;
        align-items: center;
        .n-nimbus-service-layout-drawer-header__content {
          opacity: 1;
        }
        .n-nimbus-service-layout-drawer-header__icon {
          position: absolute;
          left: 22px;
          i::before {
            color: #626778FF;
          }
        }
      }
      .n-nimbus-service-layout-drawer__item {
        cursor: pointer;
        position: relative;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 48px;
        font-size: 14px;
        color: #E9E9EC;
        .n-nimbus-service-layout-drawer-item__icon {
          &::before {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            border-style: solid;
            border-color:#78CD68 transparent transparent transparent;
            border-width: 7px;
            transform: rotate(-45deg);
            top: 23px;
            left: 32px;
          }
        }
        span {
          transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          opacity: 1;
        }
        &.n-nimbus-service-layout-drawer__item--active span{
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
        &.n-nimbus-service-layout-drawer__item--active::before {
          opacity: .9;
        }
        &.n-nimbus-service-layout-drawer__item--is-group-header {
          &::after { // down arrow
            content: '';
            height: 6px;
            width: 6px;
            border-left: 2px solid #63E2B7;
            border-top: 2px solid #63E2B7;
            position: absolute;
            left: 240px;
            top: calc(50% - 1px);
            transform: rotate(45deg);
            transform-origin: 25% 25%;
            transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          }
          &.n-nimbus-service-layout-drawer__item--group-item-is-choosed {
            span {
              color: #63E2B7;
            }
          }
          &.n-nimbus-service-layout-drawer__item--collapsed::after {
            transform: rotate(225deg) ;
          }
          span {
            transition: color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
            color: #E9E9EC;
          }
        }
        &.n-nimbus-service-layout-drawer__item--is-group-item {
          padding-left: 64px;
        }
      }
      .n-nimbus-service-layout-drawer__group-items {
        overflow: hidden;
        transition: max-height .45s cubic-bezier(0.4, 0.0, 0.2, 1);
        &.n-nimbus-service-layout-drawer__group-items--collapsed {
          max-height: 0;
        }
      }
    }
  }
}
</style>
