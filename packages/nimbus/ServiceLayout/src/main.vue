<template>
  <div class="nv-nimbus-service-layout">
    <div
      class="body"
      :class="{ 'is-collapsed': isCollapsed, active: !isCollapsed }"
    >
      <div class="header">
        <span class="content">
          Service Management
        </span>
      </div>
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
        >
          <div
            v-if="!item.childItems"
            class="item"
            :class="{ active: activeItemName === item.name }"
            @click="makeActive(item.name)"
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
                @click="makeActive(childItem.name)"
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
  name: 'NvServiceLayout',
  props: {},
  data () {
    return {
      isCollapsed: false,
      activeItemName: 'Service Management',
      items: [
        {
          name: 'Service Management'
        },
        {
          name: 'Service Type Management',
          isCollapsed: false,
          childItems: [
            {
              name: 'Clusters'
            },
            {
              name: 'Notes'
            },
            {
              name: 'Volume'
            },
            {
              name: 'Namespaces'
            },
            {
              name: 'Authorization'
            }
          ]
        },
        {
          name: 'User Management'
        }
      ]
    }
  },
  methods: {
    toggle () {
      this.isCollapsed = !this.isCollapsed
    },
    makeActive (itemName) {
      this.activeItemName = itemName
    },
    toggleGroupHeaderCollapse (headerName) {
      const headerIndex = this.items.findIndex(item => item.name === headerName && item.childItems)
      if (headerIndex + 1) {
        this.items[headerIndex].isCollapsed = !this.items[headerIndex].isCollapsed
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
