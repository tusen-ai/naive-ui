<template>
  <div
    class="n-nimbus-service-layout"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div
      class="n-nimbus-service-layout__body"
      :class="{
        'n-nimbus-service-layout__body--collapsed': isCollapsed,
        'n-nimbus-service-layout__body--active': !isCollapsed,
        'n-nimbus-service-layout__body--disable-menu': disableMenu,
        'n-nimbus-service-layout__body--with-header': $slots.nav
      }"
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
      class="n-nimbus-service-layout-drawer"
      :class="{
        'n-nimbus-service-layout-drawer--collapsed': isCollapsed,
        'n-nimbus-service-layout-drawer--active': !isCollapsed,
        'n-nimbus-service-layout-drawer--disabled': disableMenu,
        'n-nimbus-service-layout-drawer--with-header': $slots.nav
      }"
    >
      <div class="n-nimbus-service-layout-drawer-content">
        <scrollbar>
          <div
            v-if="name"
            class="n-nimbus-service-layout-drawer-header"
          >
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
          <div
            v-if="name"
            class="n-nimbus-service-layout-drawer-divider"
          />
          <div
            v-for="item in itemsWithCollapseStatus"
            :key="item.name"
          >
            <div
              v-if="!item.childItems"
              class="n-nimbus-service-layout-drawer-item"
              :class="{ 'n-nimbus-service-layout-drawer-item--active': activeItemPath === item.path }"
              @click="makeActive(item)"
            >
              <div class="n-nimbus-service-layout-drawer-item__icon" />
              <span>{{ item.name }}</span>
            </div>
            <div
              v-else
            >
              <div
                class="n-nimbus-service-layout-drawer-item n-nimbus-service-layout-drawer-item--is-group-header"
                :class="{
                  'n-nimbus-service-layout-drawer-item--group-item-is-choosed': !!(1 + item.childItems.findIndex(item => item.name === activeItemPath)),
                  'n-nimbus-service-layout-drawer-item--collapsed': item.isCollapsed
                }"
                @click="toggleGroupHeaderCollapse(item.name)"
              >
                <div class="n-nimbus-service-layout-drawer-item__icon" />
                <span>{{ item.name }}</span>
              </div>
              <div
                :ref="item.name"
                class="n-nimbus-service-layout-drawer-group-items"
                :class="{
                  'n-nimbus-service-layout-drawer-group-items--collapsed': item.isCollapsed
                }"
              >
                <div
                  class="n-nimbus-service-layout-drawer-group-items__inner-wrapper"
                >
                  <div
                    v-for="childItem in item.childItems"
                    :key="childItem.name"
                    class="n-nimbus-service-layout-drawer-item n-nimbus-service-layout-drawer-item--is-group-item"
                    :class="{ 'n-nimbus-service-layout-drawer-item--active': activeItemPath === childItem.path }"
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
        <toggle-button />
      </div>
    </div>
    <nav
      v-if="$slots.nav"
      class="n-nimbus-service-layout__nav"
    >
      <slot name="nav" />
    </nav>
  </div>
</template>

<script>
import Scrollbar from '../../../common/Scrollbar'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import toggleButton from './toggleButton'

export default {
  name: 'NNimbusServiceLayout',
  components: {
    Scrollbar,
    toggleButton
  },
  mixins: [withapp, themeable],
  props: {
    icon: {
      type: String,
      default: 'md-settings'
    },
    name: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      required: true
    },
    paddingBody: {
      type: Boolean,
      default: true
    },
    disableMenu: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollapsed: false,
      activeItemPath: null,
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
          this.activeItemPath = item.path
          return
        }
        if (item.childItems) {
          for (const childItem of item.childItems) {
            if (childItem.path === path) {
              this.activeItemPath = childItem.path
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
      this.activeItemPath = item.path
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
