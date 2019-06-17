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
</style>
