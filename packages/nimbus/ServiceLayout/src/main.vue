<template>
  <div class="n-nimbus-service-layout">
    <div><slot name="header" /></div>
    <div
      class="n-nimbus-service-layout__body"
      :class="{ 'n-nimbus-service-layout__body--collapsed': isCollapsed, 'n-nimbus-service-layout__body--active': !isCollapsed }"
    >
      <scrollbar>
        <div
          :style="{
            padding: paddingBody ? '21px 48px' : 0
          }"
        >
          <slot />
        </div>
      </scrollbar>
    </div>
    <div
      class="n-nimbus-service-layout__drawer"
      :class="{ 'n-nimbus-service-layout__drawer--collapsed': isCollapsed, 'n-nimbus-service-layout__drawer--active': !isCollapsed }"
    >
      <div class="n-nimbus-service-layout-drawer__item-wrapper">
        <scrollbar>
          <div class="n-nimbus-service-layout-drawer__header">
            <div class="n-nimbus-service-layout-drawer-header__content">
              <div class="n-nimbus-service-layout-drawer-header__icon">
                <n-icon
                  :type="icon"
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
        </scrollbar>
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
import Scrollbar from '../../../common/Scrollbar'

export default {
  name: 'NNimbusServiceLayout',
  components: {
    Scrollbar
  },
  props: {
    icon: {
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
    },
    paddingBody: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isCollapsed: false,
      activeItemName: '',
      itemsWithCollapseStatus: this.items.map(item => ({
        ...item,
        isCollapsed: false
      }))
    }
  },
  watch: {
    $route (to, from) {
      this.syncActiveItemWithPath(to.path)
    },
    items (newItems) {
      this.itemsWithCollapseStatus = newItems.map(item => ({
        ...item,
        isCollapsed: false
      }))
    }
  },
  mounted () {
    const path = this.$route.path
    this.syncActiveItemWithPath(path)
  },
  methods: {
    syncActiveItemWithPath (path) {
      for (const item of this.items) {
        if (item.path === path) {
          this.activeItemName = item.name
          return
        }
        if (item.childItems) {
          for (const childItem of item.childItems) {
            if (childItem.path === path) {
              this.activeItemName = childItem.name
              return
            }
          }
        }
      }
    },
    toggle () {
      this.isCollapsed = !this.isCollapsed
    },
    makeActive (item) {
      this.activeItemName = item.name
      this.$emit('input', item.name)
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
