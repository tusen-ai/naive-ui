<template>
  <li
    class="n-menu-item"
    :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
    :class="{
      'n-menu-item--selected': selected,
      'n-menu-item--disabled': synthesizedDisabled
    }"
    @click="handleClick"
  >
    <template v-if="isFirstLevel">
      <n-tooltip
        placement="right"
        show-arrow
        :disabled="!rootMenuCollapsed"
      >
        <template v-slot:activator>
          <n-menu-item-header
            :max-icon-size="maxIconSize"
            :active-icon-size="activeIconSize"
            :title="title"
            @click="handleClick"
          >
            <template v-slot:icon>
              <slot name="icon" />
            </template>
            <slot />
          </n-menu-item-header>
        </template>
        {{ title }}
      </n-tooltip>
    </template>
    <n-menu-item-header
      v-else
      :max-icon-size="maxIconSize"
      :active-icon-size="activeIconSize"
      :title="title"
      @click="handleClick"
    >
      <template v-slot:icon>
        <slot name="icon" />
      </template>
      <slot />
    </n-menu-item-header>
  </li>
</template>

<script>
import collectable from '../../../mixins/collectable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import NMenuItemHeader from './MenuItemHeader'
import NTooltip from '../../Tooltip'

export default {
  name: 'NMenuItem',
  components: {
    NMenuItemHeader,
    NTooltip
  },
  mixins: [
    collectable('NSubmenu', 'menuItemNames', 'name', true, function (injection) {
      return this.NMenu !== injection.NMenu
    }),
    withapp,
    themeable
  ],
  inject: {
    NMenu: {
      default: null
    },
    NSubmenu: {
      default: null
    },
    NMenuItemGroup: {
      default: null
    }
  },
  props: {
    value: {
      type: Number,
      default: null
    },
    title: {
      type: [ String, Function ],
      default: null
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      delayedPaddingLeft: null
    }
  },
  computed: {
    rootMenuCollapsed () {
      return this.NMenu.collapsed
    },
    useCollapsedIconSize () {
      return this.NMenu.collapsed && this.isFirstLevel
    },
    maxIconSize () {
      return Math.max(this.collapsedIconSize, this.iconSize)
    },
    activeIconSize () {
      if (this.useCollapsedIconSize) {
        return this.collapsedIconSize
      } else {
        return this.iconSize
      }
    },
    collapsedIconSize () {
      return this.NMenu.collapsedIconSize || this.NMenu.iconSize
    },
    iconSize () {
      return this.NMenu.iconSize
    },
    isFirstLevel () {
      return !this.NSubmenu && !this.NMenuItemGroup
    },
    paddingLeft () {
      if (this.isFirstLevel && this.NMenu.collapsedWidth !== null && this.NMenu.collapsed) {
        return this.NMenu.collapsedWidth / 2 - this.collapsedIconSize / 2
      }
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubmenu) {
        return this.NMenu.indent + this.NSubmenu.paddingLeft
      } else {
        return this.NMenu.rootIndent || this.NMenu.indent
      }
    },
    synthesizedDisabled () {
      return ((this.NSubmenu && this.NSubmenu.synthesizedDisabled) || this.disabled)
    },
    selected () {
      if (this.NMenu.value === this.name) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    paddingLeft (value) {
      this.$nextTick().then(() => {
        this.delayedPaddingLeft = value
      })
    }
  },
  created () {
    this.delayedPaddingLeft = this.paddingLeft
  },
  methods: {
    handleClick () {
      if (!this.synthesizedDisabled) {
        this.NMenu.handleSelect(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
